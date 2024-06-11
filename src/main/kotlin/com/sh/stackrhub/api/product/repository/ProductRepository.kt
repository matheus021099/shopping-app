package com.sh.stackrhub.api.product.repository

import com.sh.stackrhub.api.product.model.Product
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor

interface ProductRepository : JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
	fun findByCompanyId(companyId: Long, pageable: Pageable): Page<Product>

	fun findByCompanyAndSku(companyId: Long, sku: String): Product?
}
