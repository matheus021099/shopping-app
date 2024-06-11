package com.sh.stackrhub.api.company.repository

import com.sh.stackrhub.api.company.model.Company
import org.springframework.data.jpa.repository.JpaRepository

interface CompanyRepository : JpaRepository<Company, Long>
