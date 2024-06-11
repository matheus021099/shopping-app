package com.sh.stackrhub.api.user.repository

import com.sh.stackrhub.api.user.model.User
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<User, Long> {
	fun findByEmail(email: String): User?
}
