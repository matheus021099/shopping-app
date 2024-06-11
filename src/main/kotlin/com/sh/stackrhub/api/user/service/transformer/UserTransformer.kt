package com.sh.stackrhub.api.user.service.transformer

import com.sh.stackrhub.api.company.model.Company
import com.sh.stackrhub.api.user.model.User
import com.sh.stackrhub.api.user.model.dto.UserDto

fun User.toDTO() = UserDto(
	id = this.id,
	firstName = this.firstName,
	lastName = this.lastName,
	password = this.password,
	email = this.email,
	companyId = this.company.id
)

fun UserDto.toEntity(company: Company) = User(
	id = this.id ?: 0,
	firstName = this.firstName,
	lastName = this.lastName,
	password = this.password,
	email = this.email,
	company = company
)
