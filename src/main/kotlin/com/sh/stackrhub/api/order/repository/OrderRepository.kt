package com.sh.stackrhub.api.order.repository

import com.sh.stackrhub.api.order.model.Order
import org.springframework.data.jpa.repository.JpaRepository

interface OrderRepository : JpaRepository<Order, Long> {
	fun findByCompanyId(companyId: Long): List<Order>
}
