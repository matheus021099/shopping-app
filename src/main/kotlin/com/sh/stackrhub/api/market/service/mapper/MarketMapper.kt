package com.sh.stackrhub.api.market.service.mapper

import com.sh.stackrhub.api.company.model.Company
import com.sh.stackrhub.api.market.model.Market
import com.sh.stackrhub.api.market.model.dto.MarketDto

fun Market.toDTO() = MarketDto(
	id = this.id,
	name = this.name,
	companyId = company.id
)

fun MarketDto.toEntity(company: Company) = Market(
	id = this.id ?: 0,
	name = this.name,
	company = company
)
