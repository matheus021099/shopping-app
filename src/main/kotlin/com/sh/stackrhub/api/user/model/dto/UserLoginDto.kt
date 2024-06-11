package com.sh.stackrhub.api.user.model.dto

import javax.validation.constraints.NotBlank

data class UserLoginDTO(
	@field:NotBlank(message = "Email is mandatory")
	val email: String,

	@field:NotBlank(message = "Password is mandatory")
	val password: String
)

