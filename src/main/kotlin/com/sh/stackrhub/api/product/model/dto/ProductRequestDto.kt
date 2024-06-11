package com.sh.stackrhub.api.product.model.dto

data class ProductRequestDto(
	val page: Int,
	val size: Int,
	val filters: ProductFilterDto?,
	val sortField: String?,
	val sortOrder: String?
)
