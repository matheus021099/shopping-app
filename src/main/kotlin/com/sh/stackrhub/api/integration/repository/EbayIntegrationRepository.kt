package com.sh.stackrhub.api.integration.repository

import com.sh.stackrhub.api.company.model.Company
import com.sh.stackrhub.api.integration.model.EbayIntegration
import org.springframework.data.jpa.repository.JpaRepository

interface EbayIntegrationRepository : JpaRepository<EbayIntegration, Long> {
	fun findByCompany(company: Company): EbayIntegration?
}
