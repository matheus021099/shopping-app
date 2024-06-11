package com.sh.stackrhub

import com.sh.stackrhub.api.integration.model.EbayConfig
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan


@SpringBootApplication
@ComponentScan(basePackages = ["com.sh.stackrhub.api.integration", "com.sh.stackrhub", "com.sh.stackrhub.api.company", "com.sh.stackrhub.config"])
@EnableConfigurationProperties(EbayConfig::class)
class StackrhubApplication

fun main(args: Array<String>) {
	println("*** STACKRHUB STARTED ***")
	runApplication<StackrhubApplication>(*args)
}