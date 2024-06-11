package com.sh.stackrhub.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
class CorsConfig {
	@Bean
	fun corsConfigurer(): WebMvcConfigurer {
		return object : WebMvcConfigurer {
			override fun addCorsMappings(registry: CorsRegistry) {
				registry.addMapping("/api/**")
					.allowedOrigins("http://192.168.1.161:3000", "http://localhost:3000")
					.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
					.allowedHeaders("Authorization", "Content-Type", "Origin", "Accept", "X-Requested-With")
					.allowCredentials(true)
			}
		}
	}
}
