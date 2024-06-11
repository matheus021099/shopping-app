package com.sh.stackrhub.api.order.model

import javax.persistence.Embeddable

@Embeddable
data class OrderItem(
	val productId: Long,
	val sku: String,
	val qty: Int,
	val price: Double
)
