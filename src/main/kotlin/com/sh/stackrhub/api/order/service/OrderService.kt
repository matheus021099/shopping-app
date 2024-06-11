package com.sh.stackrhub.api.order.service

import com.sh.stackrhub.api.company.repository.CompanyRepository
import com.sh.stackrhub.api.market.repository.MarketRepository
import com.sh.stackrhub.api.order.model.dto.OrderDto
import com.sh.stackrhub.api.order.repository.OrderRepository
import com.sh.stackrhub.api.order.service.mapper.toDTO
import com.sh.stackrhub.api.order.service.mapper.toEntity
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class OrderService(
	private val orderRepository: OrderRepository,
	private val companyRepository: CompanyRepository
) {
	fun createOrder(orderDTO: OrderDto): OrderDto {
		val company = companyRepository.findById(orderDTO.companyId)
			.orElseThrow { RuntimeException("Company not found") }
		val order = orderDTO.toEntity(company)
		return orderRepository.save(order).toDTO()
	}

	fun getAllOrders(): List<OrderDto> = orderRepository.findAll().map { it.toDTO() }

	fun getAllOrdersByCompanyId(companyId: Long): List<OrderDto> = orderRepository.findByCompanyId(companyId).map { it.toDTO() }

	fun getOrderById(id: Long): OrderDto = orderRepository.findById(id)
		.orElseThrow { RuntimeException("Order not found") }
		.toDTO()

	fun updateOrder(id: Long, orderDTO: OrderDto): OrderDto {
		val existingOrder = orderRepository.findById(id)
			.orElseThrow { RuntimeException("Order not found") }
		val company = companyRepository.findById(orderDTO.companyId)
			.orElseThrow { RuntimeException("Company not found") }

		val updatedOrder = orderDTO.copy(id = existingOrder.id).toEntity(company)
		return orderRepository.save(updatedOrder).toDTO()
	}

	fun deleteOrder(id: Long) {
		if (!orderRepository.existsById(id)) {
			throw RuntimeException("Order not found")
		}
		orderRepository.deleteById(id)
	}
}
