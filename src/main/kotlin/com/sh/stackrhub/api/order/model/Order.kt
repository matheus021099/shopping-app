package com.sh.stackrhub.api.order.model

import com.sh.stackrhub.api.company.model.Company
import com.sh.stackrhub.api.integration.enum.MarketEnum
import com.sh.stackrhub.api.order.enum.OrderStatus
import com.sh.stackrhub.api.order.enum.PaymentStatus
import com.sh.stackrhub.api.order.enum.ShippingStatus
import javax.persistence.*
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotNull

@Entity
@Table(name = "orders")
data class Order(
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	val id: Long? = null,

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "company_id")
	val company: Company,

	@Enumerated(EnumType.STRING)
	@field:NotBlank
	val market: MarketEnum = MarketEnum.LOCAL,

	@field:NotBlank
	val marketIntegrationId: Long = 0,

	@field:NotBlank
	val orderNumber: String,

	val marketOrderNumber: String?,

	@ElementCollection
	val orderItems: List<OrderItem>,

	@field:NotNull
	val totalQty: Int = 0,

	@field:NotNull
	val totalPrice: Double = 0.00,

	@Enumerated(EnumType.STRING)
	@field:NotNull
	val shippingStatus: ShippingStatus = ShippingStatus.UNSHIPPED,

	@Enumerated(EnumType.STRING)
	@field:NotNull
	val paymentStatus: PaymentStatus = PaymentStatus.UNPAID,

	@Enumerated(EnumType.STRING)
	@field:NotNull
	val orderStatus: OrderStatus = OrderStatus.OPEN,

	@field:NotNull
	val customerName: String,

	val addressInformation: String
)
