package com.sh.stackrhub.api.order.controller

import com.sh.stackrhub.api.order.model.dto.OrderDto
import com.sh.stackrhub.api.order.service.OrderService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/orders")
class OrderController(private val orderService: OrderService) {

	@GetMapping
	fun getAllOrders(): ResponseEntity<List<OrderDto>> = ResponseEntity.ok(orderService.getAllOrders())

	@GetMapping("/company/{companyId}")
	fun getAllOrdersByCompanyId(@PathVariable companyId: Long): ResponseEntity<List<OrderDto>> =
		ResponseEntity.ok(orderService.getAllOrdersByCompanyId(companyId))

	@GetMapping("/{id}")
	fun getOrderById(@PathVariable id: Long): ResponseEntity<OrderDto>? =
		orderService.getOrderById(id).let { ResponseEntity.ok(it) }

	@PostMapping
	fun createOrder(@RequestBody orderDTO: OrderDto): ResponseEntity<OrderDto> =
		ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(orderDTO))

	@PutMapping("/{id}")
	fun updateOrder(@PathVariable id: Long, @RequestBody orderDTO: OrderDto): ResponseEntity<OrderDto> =
		ResponseEntity.ok(orderService.updateOrder(id, orderDTO))

	@DeleteMapping("/{id}")
	fun deleteOrder(@PathVariable id: Long): ResponseEntity<Void> {
		orderService.deleteOrder(id)
		return ResponseEntity.noContent().build()
	}
}
