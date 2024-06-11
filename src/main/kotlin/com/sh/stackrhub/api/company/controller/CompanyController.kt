package com.sh.stackrhub.api.company.controller

import com.sh.stackrhub.api.company.model.dto.CompanyDto
import com.sh.stackrhub.api.company.service.CompanyService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/companies")
class CompanyController(private val companyService: CompanyService) {

	@GetMapping
	fun getAllCompanies(): ResponseEntity<List<CompanyDto>> = ResponseEntity.ok(companyService.getAllCompanies())

	@GetMapping("/{id}")
	fun getCompanyById(@PathVariable id: Long): ResponseEntity<CompanyDto> =
		companyService.getCompanyById(id)?.let { ResponseEntity.ok(it) } ?: ResponseEntity.notFound().build()

	@PostMapping
	fun createCompany(@RequestBody companyDTO: CompanyDto): ResponseEntity<CompanyDto> =
		ResponseEntity.status(HttpStatus.CREATED).body(companyService.createCompany(companyDTO))

	@PutMapping("/{id}")
	fun updateCompany(@PathVariable id: Long, @RequestBody companyDTO: CompanyDto): ResponseEntity<CompanyDto> =
		ResponseEntity.ok(companyService.updateCompany(id, companyDTO))

	@DeleteMapping("/{id}")
	fun deleteCompany(@PathVariable id: Long): ResponseEntity<Void> {
		companyService.deleteCompany(id)
		return ResponseEntity.noContent().build()
	}
}
