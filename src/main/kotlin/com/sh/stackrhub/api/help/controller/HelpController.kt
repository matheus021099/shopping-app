package com.sh.stackrhub.api.help.controller

import com.sh.stackrhub.api.help.model.dto.HelpTopicDetailDto
import com.sh.stackrhub.api.help.model.dto.HelpTopicDto
import com.sh.stackrhub.api.help.service.HelpService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/help/topics")
class HelpController(private val helpService: HelpService) {

	@GetMapping
	fun fetchHelpTopics(): ResponseEntity<List<HelpTopicDto>> = ResponseEntity.ok(helpService.getAllTopics())

	@GetMapping("/{id}")
	fun fetchHelpTopicDetails(@PathVariable id: Long): ResponseEntity<HelpTopicDetailDto> =
		helpService.getTopicDetails(id).let { ResponseEntity.ok(it) }

	@PostMapping()
	fun createHelpTopic(@RequestBody topicDetailDto: HelpTopicDetailDto): ResponseEntity<HelpTopicDetailDto> =
		helpService.createHelpTopic(topicDetailDto).let { ResponseEntity.ok(it) }
}