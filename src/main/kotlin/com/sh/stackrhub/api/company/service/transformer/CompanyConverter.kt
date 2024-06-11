package com.sh.stackrhub.api.company.service.transformer

import com.sh.stackrhub.api.company.model.Company
import com.sh.stackrhub.api.company.model.dto.CompanyDto

fun Company.toDTO() = CompanyDto(
	id = this.id,
	name = this.name,
	address1 = this.streetAddress1,
	address2 = this.streetAddress2,
	zipcode = this.zipCode,
	city = this.city,
	state = this.state,
	phone = this.phoneNumber
)

fun CompanyDto.toEntity() = Company(
	id = this.id ?: 0,
	name = this.name,
	city = this.city,
	state = this.state,
	streetAddress1 = this.address1,
	streetAddress2 = this.address2,
	zipCode = this.zipcode,
	phoneNumber = this.phone
)
