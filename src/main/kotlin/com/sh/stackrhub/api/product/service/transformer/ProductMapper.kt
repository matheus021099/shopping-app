package com.sh.stackrhub.api.product.service.transformer

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.sh.stackrhub.api.company.model.Company
import com.sh.stackrhub.api.product.model.Product
import com.sh.stackrhub.api.product.model.dto.ProductDto
import com.fasterxml.jackson.module.kotlin.readValue

fun Product.toDTO(): ProductDto {
	val objectMapper = jacksonObjectMapper()
	val imagesMap: List<Map<String, Any>> = objectMapper.readValue(this.images)
	val defaultImage = imagesMap.getOrNull(0)?.get("url") as? String

	return ProductDto(
		id = this.id,
		sku = this.sku,
		name = this.name,
		price = this.price,
		sellableQty = this.qty,
		companyId = this.company.id,
		defaultImage = defaultImage
	)
}
fun ProductDto.toEntity(company: Company): Product {
	val objectMapper = jacksonObjectMapper()
	val imagesMap = listOf(mapOf("url" to this.defaultImage, "index" to 0))

	return Product(
		id = this.id ?: 0,
		sku = this.sku,
		name = this.name,
		price = this.price,
		company = company,
		qty = this.sellableQty,
		images = objectMapper.writeValueAsString(imagesMap)
	)
}