package com.sh.stackrhub.api.integration.service

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

@Service
class EbayOAuthClient(
	private val restTemplate: RestTemplate
) {

	fun getAuthorizationUrl(clientId: String, redirectUri: String): String {
		return "https://auth.ebay.com/oauth2/authorize?client_id=$clientId&redirect_uri=$redirectUri&response_type=code&scope=${URLEncoder.encode("https://api.ebay.com/oauth/api_scope", "UTF-8")}"
	}

	fun exchangeAuthorizationCode(clientId: String, clientSecret: String, code: String, redirectUri: String): Map<String, Any> {
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
			return responseEntity.body!!
		} else {
			throw RuntimeException("Failed to exchange authorization code for tokens")
		}
	}

	fun refreshToken(clientId: String, clientSecret: String, refreshToken: String): Map<String, Any> {
		val headers = HttpHeaders().apply {
			contentType = MediaType.APPLICATION_FORM_URLENCODED
			setBasicAuth(clientId, clientSecret)
		}

		val requestBody = LinkedMultiValueMap<String, String>().apply {
			add("grant_type", "refresh_token")
			add("refresh_token", refreshToken)
		}

		val requestEntity = HttpEntity(requestBody, headers)
		val responseEntity = restTemplate.exchange(
			"https://api.ebay.com/identity/v1/oauth2/token",
			HttpMethod.POST,
			requestEntity,
			object : ParameterizedTypeReference<Map<String, Any>>() {}
		)

		if (responseEntity.statusCode == HttpStatus.OK) {
			return responseEntity.body!!
		} else {
			throw RuntimeException("Failed to refresh token")
		}
	}
}
