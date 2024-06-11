package com.sh.stackrhub.api.user.model

import com.sh.stackrhub.api.company.model.Company
import javax.persistence.*

@Entity
@Table(name = "users")
data class User(
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)   
	val id: Long = 0,

	@Column(nullable = false)
	val firstName: String,

	@Column(nullable = false)
	val lastName: String,

	@Column(nullable = false)
	val password: String,

	@Column(nullable = false, unique = true)   
	val email: String,

	@ManyToOne   
	@JoinColumn(name = "company_id", nullable = false)   
	val company: Company
)
