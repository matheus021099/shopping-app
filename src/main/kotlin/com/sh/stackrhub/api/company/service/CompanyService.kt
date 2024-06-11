package com.sh.stackrhub.api.company.service

import com.sh.stackrhub.api.company.model.Company
import com.sh.stackrhub.api.company.model.dto.CompanyDto
import com.sh.stackrhub.api.company.model.dto.RegistrationDto
import com.sh.stackrhub.api.company.repository.CompanyRepository
import com.sh.stackrhub.api.company.service.transformer.toDTO
import com.sh.stackrhub.api.company.service.transformer.toEntity
import com.sh.stackrhub.api.user.model.User
import com.sh.stackrhub.api.user.model.dto.UserDto
import com.sh.stackrhub.api.user.service.UserService
import com.sh.stackrhub.api.user.service.transformer.toDTO
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class CompanyService(
	private val companyRepository: CompanyRepository,
	private val passwordEncoder: PasswordEncoder,
	private val userService: UserService
) {
	fun getAllCompanies(): List<CompanyDto> = companyRepository.findAll().map { it.toDTO() }

	fun getCompanyById(id: Long): CompanyDto? = companyRepository.findById(id).orElse(null)?.toDTO()

	fun createCompany(companyDTO: CompanyDto): CompanyDto {
		val company = companyDTO.toEntity()
		return companyRepository.save(company).toDTO()
	}

	fun updateCompany(id: Long, companyDTO: CompanyDto): CompanyDto {
		val company = companyRepository.findById(id).orElseThrow { RuntimeException("Company not found") }
		val updatedCompany = companyDTO.toEntity().copy(id = company.id)
		return companyRepository.save(updatedCompany).toDTO()
	}

	fun deleteCompany(id: Long) {
		companyRepository.deleteById(id)
	}

	fun registerCompany(registrationDTO: RegistrationDto): UserDto {
		val company = Company(
			name = registrationDTO.companyInfo.companyName,
			streetAddress1 = registrationDTO.companyInfo.street1,
			streetAddress2 = registrationDTO.companyInfo.street2,
			state = registrationDTO.companyInfo.state,
			city = registrationDTO.companyInfo.city,
			zipCode = registrationDTO.companyInfo.zipCode,
			phoneNumber = registrationDTO.companyInfo.phoneNumber
		)
		val savedCompany = companyRepository.save(company)

		val user = User(
			firstName = registrationDTO.userInfo.firstName,
			lastName = registrationDTO.userInfo.lastName,
			email = registrationDTO.userInfo.email,
			password = passwordEncoder.encode(registrationDTO.userInfo.password),
			company = savedCompany
		).toDTO()
		val savedUser = userService.createUser(user)

		// Save subscription info, if needed, in the appropriate repository

		return savedUser

	}
}
