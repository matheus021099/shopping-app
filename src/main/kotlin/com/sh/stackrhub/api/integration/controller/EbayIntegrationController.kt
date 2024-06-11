package com.sh.stackrhub.api.integration.controller

import com.sh.stackrhub.api.company.repository.CompanyRepository
import com.sh.stackrhub.api.integration.service.EbayIntegrationService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/ebay")
class EbayIntegrationController(
	private val ebayService: EbayIntegrationService,
	private val companyRepository: CompanyRepository
) {

	@GetMapping("/authorize")
	fun getEbayAuthorizationUrl(): ResponseEntity<String> {
		val authorizationUrl = ebayService.getAuthorizationUrl()
		return ResponseEntity.ok(authorizationUrl)
	}

	@PostMapping("/callback")
	fun handleEbayCallback(@RequestParam code: String, @RequestParam companyId: Long, @RequestParam nickname: String): ResponseEntity<String> {
		val company = companyRepository.findById(companyId).orElseThrow { RuntimeException("Company not found") }
		return try {
			ebayService.handleCallback(code, company, nickname)
			ResponseEntity.ok("eBay integration successful")
		} catch (e: Exception) {
			ResponseEntity.badRequest().body("Failed to integrate with eBay")
		}
	}
}
