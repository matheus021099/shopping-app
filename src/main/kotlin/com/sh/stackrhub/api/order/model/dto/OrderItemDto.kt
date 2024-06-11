package com.sh.stackrhub.api.order.model.dto

import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

data class OrderItemDto(
	@field:NotNull(message = "Product ID is mandatory")
	val productId: Long,

	@field:NotBlank(message = "SKU is mandatory")
	val sku: String,

	@field:NotNull(message = "Quantity is mandatory")
	val qty: Int,

	@field:NotNull(message = "Price is mandatory")
	val price: Double
)