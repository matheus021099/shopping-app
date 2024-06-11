package com.sh.stackrhub.api.product.service

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.sh.stackrhub.api.company.repository.CompanyRepository
import com.sh.stackrhub.api.product.model.Product
import com.sh.stackrhub.api.product.model.dto.ProductDto
import com.sh.stackrhub.api.product.model.dto.ProductFilterDto
import com.sh.stackrhub.api.product.repository.ProductRepository
import com.sh.stackrhub.api.product.service.transformer.toDTO
import com.sh.stackrhub.api.product.service.transformer.toEntity
import com.sh.stackrhub.api.user.service.UserService
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Sort
import org.springframework.data.jpa.domain.Specification
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import javax.persistence.criteria.Predicate

@Service
@Transactional
class ProductService(
	private val productRepository: ProductRepository,
	private val userService: UserService,
	private val companyRepository: CompanyRepository
) {

	fun getAllProducts(): List<ProductDto> = productRepository.findAll().map { it.toDTO() }

	fun getProductById(productId: Long): ProductDto? = productRepository.findById(productId).orElse(null)?.toDTO()

	fun createProduct(productDto: ProductDto): ProductDto {
		println("PRODUCT: service: $productDto")

		try {
			val company = companyRepository.findById(productDto.companyId)
				.orElseThrow { RuntimeException("Company not found") }
			val product = productDto.toEntity(company)
			val savedProduct = productRepository.save(product)
			return savedProduct.toDTO()
		} catch (e: Exception) {
			e.printStackTrace()
			throw e
		}
	}

	fun addProductImages(productId: Long, images: List<MultipartFile>) {
		try {
			val product = productRepository.findById(productId)
				.orElseThrow { RuntimeException("Product not found") }

			val imageUrls = images.mapIndexed { index, image ->
				val imageUrl = saveImageToStorage(image) // Implement this function to save the image and return its URL
				mapOf("url" to imageUrl, "index" to index)
			}

			product.images = jacksonObjectMapper().writeValueAsString(imageUrls)
			productRepository.save(product)
		} catch (e: Exception) {
			e.printStackTrace()
			throw e
		}
	}

	private fun saveImageToStorage(image: MultipartFile): String {
		// Save the image to your storage and return the URL
		return "http://example.com/image/${image.originalFilename}"
	}

	fun updateProduct(productId: Long, productDTO: ProductDto): ProductDto {
		val company = companyRepository.findById(productDTO.companyId).orElseThrow { RuntimeException("Company not found") }
		val product = productRepository.findById(productId).orElseThrow { RuntimeException("Product not found") }
		val updatedProduct = productDTO.toEntity(company).copy(id = product.id)
		return productRepository.save(updatedProduct).toDTO()
	}

	fun deleteProduct(productId: Long) {
		productRepository.deleteById(productId)
	}

	fun getProductsByUserId(userId: Long, page: Int, size: Int, filters: ProductFilterDto?): Page<ProductDto> {
		val user = userService.getUserById(userId) ?: throw RuntimeException("No User with ID: $userId")

		if (user.companyId == null) {
			throw RuntimeException("Problem with companyId of user: ${user.id}")
		}

		val pageable = PageRequest.of(page, size)

		return if (filters == null) {
			val pageable = PageRequest.of(page, size)
			val productsPage: Page<Product> = productRepository.findByCompanyId(user.companyId, pageable)
			productsPage.map { it.toDTO() }
		}else {
			val specifications = createProductSpecifications(user.companyId, filters)
			productRepository.findAll(specifications, pageable).map { it.toDTO() }
		}
	}

	fun getProductsByCompanyId(companyId: Long, page: Int, size: Int, filters: ProductFilterDto?, sortField: String?, sortOrder: String?): Page<ProductDto> {
		val mappedSortField = mapSortFieldToEntityField(sortField)
		val sort = if (mappedSortField != null && sortOrder != null) {
			Sort.by(Sort.Order(Sort.Direction.fromString(sortOrder), mappedSortField))
		} else {
			Sort.unsorted()
		}
		val pageable = PageRequest.of(page, size, sort)

		return if (filters == null) {
			val productsPage: Page<Product> = productRepository.findByCompanyId(companyId, pageable)
			productsPage.map { it.toDTO() }
		} else {
			val specifications = createProductSpecifications(companyId, filters)
			productRepository.findAll(specifications, pageable).map { it.toDTO() }
		}
	}
	fun mapSortFieldToEntityField(sortField: String?): String? {
		return when (sortField) {
			"quantity" -> "qty"
			"sellingQty" -> "qty"
			"sellable" -> "qty"
			"price" -> "price"
			"createdDate" -> "createdDate"
			// Add more mappings as needed
			else -> null
		}
	}
	fun createProductSpecifications(companyId: Long, filters: ProductFilterDto?): Specification<Product> {
		return Specification { root, query, criteriaBuilder ->
			val predicates = mutableListOf<Predicate>()

			predicates.add(criteriaBuilder.equal(root.get<Long>("company").get<Long>("id"), companyId))

			filters?.let {
				if (!it.sku.isNullOrEmpty()) {
					predicates.add(criteriaBuilder.like(root.get("sku"), "%${it.sku}%"))
				}
				if (!it.name.isNullOrEmpty()) {
					predicates.add(criteriaBuilder.like(root.get("name"), "%${it.name}%"))
				}
				it.priceMin?.let { min -> predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), min)) }
				it.priceMax?.let { max -> predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), max)) }
				it.quantityMin?.let { min -> predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("quantity"), min)) }
				it.quantityMax?.let { max -> predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("quantity"), max)) }
				it.createdDateStart?.let { start -> predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("createdDate"), start)) }
				it.createdDateEnd?.let { end -> predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("createdDate"), end)) }
			}

			criteriaBuilder.and(*predicates.toTypedArray())
		}
	}
}
