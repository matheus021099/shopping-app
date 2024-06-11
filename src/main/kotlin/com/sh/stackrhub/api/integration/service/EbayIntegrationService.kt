package com.sh.stackrhub.api.integration.service

import com.sh.stackrhub.api.company.model.Company
import com.sh.stackrhub.api.integration.model.EbayConfig
import com.sh.stackrhub.api.integration.model.EbayIntegration
import com.sh.stackrhub.api.integration.repository.EbayIntegrationRepository
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.stereotype.Service
import org.springframework.util.LinkedMultiValueMap
import org.springframework.web.client.RestTemplate
import java.net.URLEncoder
import java.time.LocalDateTime

@Service
class EbayIntegrationService(
	private val ebayIntegrationRepository: EbayIntegrationRepository,
	private val restTemplate: RestTemplate,
	private val ebayConfig: EbayConfig
) {
	val clientId = ebayConfig.clientId
	val redirectUri = ebayConfig.redirectUri
	val clientSecret = ebayConfig.clientSecret

	fun getAuthorizationUrl(): String {
		return "https://auth.ebay.com/oauth2/authorize?client_id=$clientId&redirect_uri=$redirectUri&response_type=code&scope=${URLEncoder.encode("https://api.ebay.com/oauth/api_scope", "UTF-8")}"
	}

	fun handleCallback(code: String, company: Company, nickname: String) {
		val headers = HttpHeaders().apply {
			contentType = MediaType.APPLICATION_FORM_URLENCODED
			setBasicAuth(clientId, clientSecret)
		}

		val requestBody = LinkedMultiValueMap<String, String>().apply {
			add("grant_type", "authorization_code")
			add("code", code)
			add("redirect_uri", redirectUri)
		}

		val requestEntity = HttpEntity(requestBody, headers)
		val responseEntity = restTemplate.exchange(
			"https://api.ebay.com/identity/v1/oauth2/token",
			HttpMethod.POST,
			requestEntity,
			object : ParameterizedTypeReference<Map<String, Any>>() {}
		)

		if (responseEntity.statusCode == HttpStatus.OK) {
			val responseBody = responseEntity.body!!
			val accessToken = responseBody["access_token"] as String
			val refreshToken = responseBody["refresh_token"] as String
			val expiresIn = (responseBody["expires_in"] as Number).toLong()

			ebayIntegrationRepository.save(
				EbayIntegration(
					company = company,
					nickname = nickname,
					accessToken = accessToken,
					refreshToken = refreshToken,
					tokenExpiry = LocalDateTime.now().plusSeconds(expiresIn),
					createdAt = LocalDateTime.now(),
					updatedAt = LocalDateTime.now()
				)
			)
		} else {
			throw RuntimeException("Failed to integrate with eBay")
		}
	}

	fun getEbayListings(company: Company): String {
		val integration = ebayIntegrationRepository.findByCompany(company)
			?: throw RuntimeException("eBay integration not found")

		val headers = HttpHeaders().apply {
			set("Authorization", "Bearer ${integration.accessToken}")
		}

		val entity = HttpEntity<String>(headers)
		val response = restTemplate.exchange(
			"https://api.ebay.com/sell/inventory/v1/inventory_item",
			HttpMethod.GET,
			entity,
			String::class.java
		)

		return response.body!!
	}

	fun refreshEbayToken(company: Company) {
		val integration = ebayIntegrationRepository.findByCompany(company)
			?: throw RuntimeException("eBay integration not found")

		val headers = HttpHeaders().apply {
			contentType = MediaType.APPLICATION_FORM_URLENCODED
			setBasicAuth(clientId, clientSecret)
		}

		val requestBody = LinkedMultiValueMap<String, String>().apply {
			add("grant_type", "refresh_token")
			add("refresh_token", integration.refreshToken)
		}

		val requestEntity = HttpEntity(requestBody, headers)
		val responseEntity = restTemplate.exchange(
			"https://api.ebay.com/identity/v1/oauth2/token",
			HttpMethod.POST,
			requestEntity,
			object : ParameterizedTypeReference<Map<String, Any>>() {}
		)

		if (responseEntity.statusCode == HttpStatus.OK) {
			val responseBody = responseEntity.body!!
			val accessToken = responseBody["access_token"] as String
			val expiresIn = (responseBody["expires_in"] as Number).toLong()

			ebayIntegrationRepository.save(
				integration.copy(
					accessToken = accessToken,
					tokenExpiry = LocalDateTime.now().plusSeconds(expiresIn),
					updatedAt = LocalDateTime.now()
				)
			)
		} else {
			throw RuntimeException("Failed to refresh eBay token")
		}
	}
}
