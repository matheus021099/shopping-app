package com.sh.stackrhub.api.product.model.dto

import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

data class ProductDto(
	val id: Long?,

	@field:NotBlank(message = "SKU is mandatory")
	@field:Size(min = 1, max = 100, message = "SKU must be between 1 and 100 characters")
	val sku: String,

	@field:NotBlank(message = "Name is mandatory")
	@field:Size(min = 1, max = 255, message = "Name must be between 1 and 255 characters")
	val name: String,

	@field:NotNull(message = "Price is mandatory")
	val price: Double,

	@field:NotNull(message = "Quantity is mandatory")
	val sellableQty: Int,

	@field:NotNull(message = "Company ID is mandatory")
	val companyId: Long,

	val bundle: Boolean = false,

	val variationParent: Boolean = false,

	val variationChild: Boolean = false,

	val defaultImage: String?

)
