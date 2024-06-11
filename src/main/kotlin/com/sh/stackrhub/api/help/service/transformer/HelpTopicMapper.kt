package com.sh.stackrhub.api.help.service.transformer

import com.sh.stackrhub.api.help.model.HelpTopic
import com.sh.stackrhub.api.help.model.dto.HelpTopicDetailDto
import com.sh.stackrhub.api.help.model.dto.HelpTopicDto

fun HelpTopic.toHelpTopicDto(): HelpTopicDto {
	return HelpTopicDto(
		id = this.id,
		title = this.title,
		lastUpdated = this.lastUpdated,
		shortDescription = this.shortDescription,
		hasImageAttachments = this.hasImageAttachments,
		hasVideoAttachments = this.hasVideoAttachments
	)
}

fun HelpTopic.toHelpTopicDetailDto(): HelpTopicDetailDto {
	return HelpTopicDetailDto(
		id = this.id,
		title = this.title,
		lastUpdated = this.lastUpdated,
		shortDescription = this.shortDescription,
		hasImageAttachments = this.hasImageAttachments,
		hasVideoAttachments = this.hasVideoAttachments,
		content = this.content,
		attachments = this.attachments
	)
}
fun HelpTopicDetailDto.toHelpTopic(): HelpTopic {
	return HelpTopic(
		id = this.id,
		title = this.title,
		lastUpdated = this.lastUpdated,
		shortDescription = this.shortDescription,
		hasImageAttachments = this.hasImageAttachments,
		hasVideoAttachments = this.hasVideoAttachments,
		content = this.content,
		attachments = this.attachments
	)
}