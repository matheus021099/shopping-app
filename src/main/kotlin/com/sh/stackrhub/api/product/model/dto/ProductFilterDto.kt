package com.sh.stackrhub.api.product.model.dto

import java.time.LocalDate

data class ProductFilterDto(
	val sku: String?,
	val name: String?,
	val priceMin: Double?,
	val priceMax: Double?,
	val quantityMin: Int?,
	val quantityMax: Int?,
	val createdDateStart: LocalDate?,
	val createdDateEnd: LocalDate?
)