package com.sh.stackrhub.api.integration.model

import com.sh.stackrhub.api.company.model.Company
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "ebay_integration")
data class EbayIntegration(
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	val id: Long = 0,

	@Column(nullable = false, unique = true)
	val nickname: String,

	@Column(nullable = false)
	val accessToken: String,

	@Column
	val refreshToken: String? = null,

	@Column
	val tokenExpiry: LocalDateTime,

	@Column
	val createdAt: LocalDateTime,

	@Column
	val updatedAt: LocalDateTime,

	@ManyToOne
	@JoinColumn(name = "company_id", nullable = false)
	val company: Company
)
