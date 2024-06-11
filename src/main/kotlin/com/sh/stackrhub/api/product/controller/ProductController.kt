package com.sh.stackrhub.api.product.controller

import com.sh.stackrhub.api.product.model.dto.ProductDto
import com.sh.stackrhub.api.product.model.dto.ProductFilterDto
import com.sh.stackrhub.api.product.model.dto.ProductRequestDto
import com.sh.stackrhub.api.product.service.ProductService
import org.springframework.data.domain.Page
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/products")
class ProductController(private val productService: ProductService) {

	@GetMapping
	fun getAllProducts(): ResponseEntity<List<ProductDto>> = ResponseEntity.ok(productService.getAllProducts())

	@GetMapping("/{productId}")
	fun getProductById(@PathVariable productId: Long): ResponseEntity<ProductDto> =
		productService.getProductById(productId)?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()

	@GetMapping("/user/{userId}")
	fun getProductsByUserId(
		@PathVariable userId: Long,
		@RequestParam page: Int,
		@RequestParam size: Int,
		@RequestBody(required = false) filters: ProductFilterDto?
	): Page<ProductDto> {
		return productService.getProductsByUserId(userId, page, size, filters)
	}

	@PostMapping("/comp/{companyId}")
	fun getProductsByCompanyId(
		@PathVariable companyId: Long,
		@RequestBody productRequest: ProductRequestDto
	): Page<ProductDto> {
		return productService.getProductsByCompanyId(
			companyId,
			productRequest.page,
			productRequest.size,
			productRequest.filters,
		productRequest.sortField,
		productRequest.sortOrder)
	}

	@PostMapping("/{companyId}")
	fun createProduct(
		@RequestBody productDto: ProductDto, @PathVariable companyId: Long): ResponseEntity<ProductDto> {
		val product = productDto.copy(companyId = companyId)
		val createdProduct = productService.createProduct(product)
		return ResponseEntity.ok(createdProduct)
	}

	@PostMapping("/{productId}/images", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
	fun uploadProductImages(
		@PathVariable productId: Long,
		@RequestPart("images") images: List<MultipartFile>
	): ResponseEntity<Void> {
		productService.addProductImages(productId, images)
		return ResponseEntity.ok().build()
	}

	@PutMapping("/{id}")
	fun updateProduct(@PathVariable id: Long, @RequestBody productDTO: ProductDto): ResponseEntity<ProductDto> =
		ResponseEntity.ok(productService.updateProduct(id, productDTO))

	@DeleteMapping("/{id}")
	fun deleteProduct(@PathVariable id: Long): ResponseEntity<Void> {
		productService.deleteProduct(id)
		return ResponseEntity.noContent().build()
	}
}
