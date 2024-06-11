package com.sh.stackrhub.api.user.model.dto

import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

data class UserDto(
	val id: Long?,

	@field:NotBlank(message = "firstName is mandatory")
	val firstName: String,

	@field:NotBlank(message = "lastName is mandatory")
	val lastName: String,

	@field:NotBlank(message = "Email is mandatory")
	@field:Email(message = "Email should be valid")
	val email: String,

	@field:NotBlank(message = "Password is mandatory")
	@field:Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")   
	val password: String,

	val companyId: Long?
)
