package com.sh.stackrhub.api.order.service.mapper

import com.sh.stackrhub.api.company.model.Company
import com.sh.stackrhub.api.market.model.Market
import com.sh.stackrhub.api.order.model.Order
import com.sh.stackrhub.api.order.model.OrderItem
import com.sh.stackrhub.api.order.model.dto.OrderDto
import com.sh.stackrhub.api.order.model.dto.OrderItemDto

fun Order.toDTO(): OrderDto = OrderDto(
	id = id,
	companyId = company.id,
	market = market,
	orderNumber = orderNumber,
	marketOrderNumber = marketOrderNumber ?: "",
	orderItems = orderItems.map { it.toDTO() },
	totalQty = totalQty,
	totalPrice = totalPrice,
	shippingStatus = shippingStatus,
	paymentStatus = paymentStatus,
	orderStatus = orderStatus,
	customerName = customerName,
	marketIntegrationId = marketIntegrationId
)

fun OrderDto.toEntity(company: Company): Order = Order(
	id = id,
	company = company,
	marketIntegrationId = marketIntegrationId,
	market = market,
	orderNumber = orderNumber,
	marketOrderNumber = marketOrderNumber,
	orderItems = orderItems.map { it.toEntity() },
	totalQty = totalQty,
	totalPrice = totalPrice,
	shippingStatus = shippingStatus,
	paymentStatus = paymentStatus,
	orderStatus = orderStatus ,
	customerName = customerName,
	addressInformation = ""
)

fun OrderItem.toDTO(): OrderItemDto = OrderItemDto(
	productId = productId,
	sku = sku,
	qty = qty,
	price = price
)

fun OrderItemDto.toEntity(): OrderItem = OrderItem(
	productId = productId,
	sku = sku,
	qty = qty,
	price = price
)
