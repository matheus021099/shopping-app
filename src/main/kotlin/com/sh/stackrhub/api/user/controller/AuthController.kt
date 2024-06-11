package com.sh.stackrhub.api.user.controller

import com.sh.stackrhub.api.company.model.dto.RegistrationDto
import com.sh.stackrhub.api.company.service.CompanyService
import com.sh.stackrhub.api.user.model.dto.UserDto
import com.sh.stackrhub.api.user.model.dto.UserLoginDTO
import com.sh.stackrhub.api.user.service.UserService
import com.sh.stackrhub.api.utils.JwtUtil
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import javax.validation.Valid

@RestController
@RequestMapping("/api/auth")
class AuthController(
	private val authenticationManager: AuthenticationManager,
	private val jwtUtil: JwtUtil,
	private val userDetailsService: UserDetailsService,
	private val userService: UserService,
	private val companyService: CompanyService
) {

	@PostMapping("/register")
	fun registerCompany(@Valid @RequestBody registrationDTO: RegistrationDto): ResponseEntity<UserDto> {
		val userDto = companyService.registerCompany(registrationDTO)
		return ResponseEntity.ok(userDto)
	}

	@PostMapping("/login")
	fun loginUser(@Valid @RequestBody userLoginDTO: UserLoginDTO): ResponseEntity<*> {
		return try {
			authenticationManager.authenticate(UsernamePasswordAuthenticationToken(userLoginDTO.email, userLoginDTO.password))
			val userDetails: UserDetails = userDetailsService.loadUserByUsername(userLoginDTO.email)
			val jwt: String = jwtUtil.generateToken(userDetails)
			val user = userService.getUserByEmail(userLoginDTO.email)

			if (user != null) {
				val responseMap = mapOf(
					"token" to jwt,
					"id" to user.id,
					"companyId" to user.company.id
				)
				ResponseEntity.ok(responseMap)
			} else {
				ResponseEntity.badRequest().body("User not found")
			}
		} catch (e: Exception) {
			ResponseEntity.badRequest().body("Invalid email or password")
		}
	}
}
