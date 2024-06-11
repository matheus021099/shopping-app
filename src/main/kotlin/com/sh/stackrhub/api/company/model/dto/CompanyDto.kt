package com.sh.stackrhub.api.company.model.dto

import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

data class CompanyDto(
	val id: Long?,

	@field:NotBlank(message = "Name is mandatory")
	@field:Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")   
	val name: String,

	@field:NotBlank(message = "Address is mandatory")
	@field:Size(min = 1, max = 255, message = "Address must be between 1 and 255 characters")   
	val address1: String,

	val address2: String? = null,

	@field:NotBlank(message = "City is mandatory")
	val city: String,

	@field:NotBlank(message = "State is mandatory")
	val state: String,

	@field:NotBlank(message = "Zipcode is mandatory")
	@field:Size(min = 5, max = 6, message = "Zipcode must be between 5 and 6 characters")
	val zipcode: Int,

	@field:NotBlank(message = "Phone number is mandatory")
	val phone: Int,
)
