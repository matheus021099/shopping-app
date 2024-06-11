package com.sh.stackrhub.api.order.model.dto

import com.sh.stackrhub.api.integration.enum.MarketEnum
import com.sh.stackrhub.api.order.enum.OrderStatus
import com.sh.stackrhub.api.order.enum.PaymentStatus
import com.sh.stackrhub.api.order.enum.ShippingStatus
import javax.validation.constraints.NotNull
import javax.validation.constraints.NotBlank

data class OrderDto(
	val id: Long?,

	@field:NotNull(message = "Company ID is mandatory")
	val companyId: Long,

	@field:NotNull(message = "Market value is mandatory")
	val market: MarketEnum = MarketEnum.LOCAL,

	@field:NotNull(message = "Market integration ID is mandatory")
	val marketIntegrationId: Long,

	@field:NotBlank(message = "Order Number is mandatory")
	val orderNumber: String,

	@field:NotBlank(message = "Market Order Number is mandatory")
	val marketOrderNumber: String,

	@field:NotNull(message = "Order Items are mandatory")
	val orderItems: List<OrderItemDto>,

	@field:NotNull(message = "Total Quantity is mandatory")
	val totalQty: Int,

	@field:NotNull(message = "Total Price is mandatory")
	val totalPrice: Double,

	@field:NotNull(message = "Shipping Status is mandatory")
	val shippingStatus: ShippingStatus,

	@field:NotNull(message = "Payment Status is mandatory")
	val paymentStatus: PaymentStatus,

	@field:NotNull(message = "Order Status is mandatory")
	val orderStatus: OrderStatus,

	@field:NotNull(message = "Customer name is mandatory")
	val customerName: String
)

