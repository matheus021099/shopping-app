package com.sh.stackrhub.api.user.service.jwt

import com.sh.stackrhub.api.user.model.User
import com.sh.stackrhub.api.user.repository.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl(private val userRepository: UserRepository) : UserDetailsService {

	override fun loadUserByUsername(username: String): UserDetails {
		val user: User = userRepository.findByEmail(username) ?: throw UsernameNotFoundException("User not found")
		return org.springframework.security.core.userdetails.User(user.email, user.password, emptyList())
	}
}
