package com.sh.stackrhub.api.company.model

import com.sh.stackrhub.api.user.model.User
import javax.persistence.*

@Entity
data class Company(
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)   
	val id: Long = 0,

	@Column(nullable = false, unique = true)   
	val name: String,

	@Column(nullable = false)
	val streetAddress1: String,

	@Column
	val streetAddress2: String? = null,

	@Column(nullable = false)
	val city: String,

	@Column(nullable = false)
	val state: String,

	@Column(nullable = false)
	val zipCode: Int,

	@Column(nullable = false)
	val phoneNumber: Int,

	@OneToMany(mappedBy = "company")
	val users: List<User> = emptyList()
)
