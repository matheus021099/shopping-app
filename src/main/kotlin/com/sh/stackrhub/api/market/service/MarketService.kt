package com.sh.stackrhub.api.market.service

import com.sh.stackrhub.api.company.repository.CompanyRepository
import com.sh.stackrhub.api.market.model.dto.MarketDto
import com.sh.stackrhub.api.market.repository.MarketRepository
import com.sh.stackrhub.api.market.service.mapper.toDTO
import com.sh.stackrhub.api.market.service.mapper.toEntity
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.stream.Collectors

@Service
@Transactional
class MarketService(
	private val marketRepository: MarketRepository,
	private val companyRepository: CompanyRepository
) {
	fun getAllMarkets(): List<MarketDto> = marketRepository.findAll().map { it.toDTO() }

	fun getMarketById(id: Long): MarketDto? = marketRepository.findById(id).orElse(null)?.toDTO()

	fun getMarketByCompanyId(companyId: Long): List<MarketDto>? {
		return marketRepository.findByCompanyId(companyId)
			?.stream()
			?.map { it.toDTO() }
			?.collect(Collectors.toList())
	}

	fun createMarket(marketDTO: MarketDto): MarketDto {
		val company = companyRepository.findById(marketDTO.companyId).get()
		val market = marketDTO.toEntity(company)
		return marketRepository.save(market).toDTO()
	}

	fun updateMarket(id: Long, marketDTO: MarketDto): MarketDto {
		val company = companyRepository.findById(marketDTO.companyId).get()

		val market = marketRepository.findById(id).orElseThrow { RuntimeException("Market not found") }
		val updatedMarket = marketDTO.toEntity(company).copy(id = market.id)
		return marketRepository.save(updatedMarket).toDTO()
	}

	fun deleteMarket(id: Long) {
		marketRepository.deleteById(id)
	}
}
