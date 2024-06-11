package com.sh.stackrhub.api.market.model

import com.sh.stackrhub.api.company.model.Company
import javax.persistence.*

@Entity
data class Market(
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)   
	val id: Long = 0,

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "company_id", nullable = false)
	val company: Company,

	@Column(nullable = false, unique = true)
	val name: String
)
