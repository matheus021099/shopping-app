package com.sh.stackrhub.api.user.service

import com.sh.stackrhub.api.company.repository.CompanyRepository
import com.sh.stackrhub.api.user.model.User
import com.sh.stackrhub.api.user.model.dto.UserDto
import com.sh.stackrhub.api.user.model.dto.UserLoginDTO
import com.sh.stackrhub.api.user.repository.UserRepository
import com.sh.stackrhub.api.user.service.transformer.toDTO
import com.sh.stackrhub.api.user.service.transformer.toEntity
import org.springframework.http.HttpStatus
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ResponseStatusException

@Service
@Transactional
class UserService(
	private val userRepository: UserRepository,
	private val companyRepository: CompanyRepository,
	private val passwordEncoder: PasswordEncoder
) {
	fun getAllUsers(): List<UserDto> = userRepository.findAll().map { it.toDTO() }

	fun getUserById(id: Long): UserDto? = userRepository.findById(id).orElse(null)?.toDTO()

	fun createUser(userDTO: UserDto): UserDto {
		val company = companyRepository.findById(userDTO.companyId!!).orElseThrow { RuntimeException("Company not found") }
		val user = userDTO.toEntity(company)
		return userRepository.save(user).toDTO()
	}

	fun getUserByEmail(email: String): User? {
		return userRepository.findByEmail(email)
	}

	fun updateUser(id: Long, userDTO: UserDto): UserDto {
		val company = companyRepository.findById(userDTO.companyId!!).orElseThrow { RuntimeException("Company not found") }
		val user = userRepository.findById(id).orElseThrow { RuntimeException("User not found") }
		val updatedUser = userDTO.toEntity(company).copy(id = user.id)
		return userRepository.save(updatedUser).toDTO()
	}

	fun deleteUser(id: Long) {
		userRepository.deleteById(id)
	}
}
