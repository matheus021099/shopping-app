package com.sh.stackrhub.api.market.model.dto

import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

data class MarketDto(
	val id: Long?,

	@field:NotBlank(message = "Name is mandatory")
	@field:Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")   
	val name: String,

	val companyId: Long
)
