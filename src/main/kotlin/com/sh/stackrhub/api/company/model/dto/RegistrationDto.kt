package com.sh.stackrhub.api.company.model.dto
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

data class RegistrationDto(
	val companyInfo: CompanyInfoDto,
	val userInfo: UserInfoDto,
	val subscriptionInfo: SubscriptionInfoDto
)

data class CompanyInfoDto(
	@field:NotBlank(message = "Company name is mandatory")
	val companyName: String,

	@field:NotBlank(message = "Phone number is mandatory")
	val phoneNumber: Int,

	@field:NotBlank(message = "Street address is mandatory")
	val street1: String,

	val street2: String?,

	@field:NotBlank(message = "City is mandatory")
	val city: String,

	@field:NotBlank(message = "State is mandatory")
	val state: String,

	@field:NotBlank(message = "Zipcode is mandatory")
	val zipCode: Int
)


data class UserInfoDto(
	@field:NotBlank(message = "First name is mandatory")
	val firstName: String,

	@field:NotBlank(message = "Last name is mandatory")
	val lastName: String,

	@field:NotBlank(message = "Email is mandatory")
	val email: String,

	@field:NotBlank(message = "Password is mandatory")
	val password: String
)

data class SubscriptionInfoDto(
	@field:NotNull(message = "Subscription plan is mandatory")
	val plan: String
)