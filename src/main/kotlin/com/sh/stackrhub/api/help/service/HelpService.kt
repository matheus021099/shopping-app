package com.sh.stackrhub.api.help.service

import com.sh.stackrhub.api.help.model.HelpTopic
import com.sh.stackrhub.api.help.model.dto.HelpTopicDetailDto
import com.sh.stackrhub.api.help.model.dto.HelpTopicDto
import com.sh.stackrhub.api.help.repository.HelpRepository
import com.sh.stackrhub.api.help.service.transformer.toHelpTopic
import com.sh.stackrhub.api.help.service.transformer.toHelpTopicDetailDto
import com.sh.stackrhub.api.help.service.transformer.toHelpTopicDto
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class HelpService(
	private val helpRepository: HelpRepository
) {
	fun getAllTopics(): List<HelpTopicDto>? {
		val topics = helpRepository.findAll()
		return topics.map { it.toHelpTopicDto() }
	}

	fun getTopicDetails(id: Long): HelpTopicDetailDto {
		val topic = helpRepository.findById(id).get()
		return topic.toHelpTopicDetailDto()
	}

	fun createHelpTopic(topicDto: HelpTopicDetailDto): HelpTopicDetailDto {
		return helpRepository.save<HelpTopic?>(topicDto.toHelpTopic()).toHelpTopicDetailDto()
	}
}