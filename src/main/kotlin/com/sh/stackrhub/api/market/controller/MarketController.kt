package com.sh.stackrhub.api.market.controller

import com.sh.stackrhub.api.market.model.dto.MarketDto
import com.sh.stackrhub.api.market.service.MarketService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/markets")
class MarketController(private val marketService: MarketService) {

	@GetMapping
	fun getAllMarkets(): ResponseEntity<List<MarketDto>> = ResponseEntity.ok(marketService.getAllMarkets())

	@GetMapping("/{id}")
	fun getMarketById(@PathVariable id: Long): ResponseEntity<MarketDto> =
		marketService.getMarketById(id)?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()

	@GetMapping("/comp/{companyId}")
	fun getMarketByCompanyId(@PathVariable companyId: Long): ResponseEntity<List<MarketDto>> =
		marketService.getMarketByCompanyId(companyId)?.let { ResponseEntity.ok(it) } ?: ResponseEntity.ok(emptyList())

	@PostMapping
	fun createMarket(@RequestBody marketDTO: MarketDto): ResponseEntity<MarketDto> =
		ResponseEntity.status(HttpStatus.CREATED).body(marketService.createMarket(marketDTO))

	@PutMapping("/{id}")
	fun updateMarket(@PathVariable id: Long, @RequestBody marketDTO: MarketDto): ResponseEntity<MarketDto> =
		ResponseEntity.ok(marketService.updateMarket(id, marketDTO))

	@DeleteMapping("/{id}")
	fun deleteMarket(@PathVariable id: Long): ResponseEntity<Void> {
		marketService.deleteMarket(id)
		return ResponseEntity.noContent().build()
	}
}
