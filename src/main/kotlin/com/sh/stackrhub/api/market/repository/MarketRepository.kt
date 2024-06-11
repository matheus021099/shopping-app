package com.sh.stackrhub.api.market.repository

import com.sh.stackrhub.api.market.model.Market
import org.springframework.data.jpa.repository.JpaRepository

interface MarketRepository : JpaRepository<Market, Long> {
    fun findByCompanyId(companyId: Long): List<Market>?
}
