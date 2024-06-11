package com.sh.stackrhub.api.product.model

import com.sh.stackrhub.api.company.model.Company
import javax.persistence.*

@Entity
data class Product(
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)   
	val id: Long = 0,

	@Column(nullable = false)   
	val sku: String,

	@Column(nullable = false)
	val qty: Int,

	@Column(nullable = false)
	val name: String,

	@Column(nullable = false)   
	val price: Double,

	@Column(nullable = false)
	val bundle: Boolean = false,

	@Column(nullable = false)
	val variationParent: Boolean = false,

	@Column(nullable = false)
	val variationChild: Boolean = false,

	@Column()
	var images: String = "",

	@ManyToOne
	@JoinColumn(name = "company_id", nullable = false)   
	val company: Company
)
