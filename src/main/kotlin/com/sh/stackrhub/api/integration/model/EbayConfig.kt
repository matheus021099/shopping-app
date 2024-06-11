package com.sh.stackrhub.api.integration.model

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "ebay")
class EbayConfig {
	lateinit var clientId: String
	lateinit var clientSecret: String
	lateinit var redirectUri: String
}