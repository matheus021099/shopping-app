package com.sh.stackrhub.api.help.model.dto

import java.time.LocalDateTime

data class HelpTopicDto(
	val id: Long,
	val title: String,
	val shortDescription: String,
	val lastUpdated: LocalDateTime,
	val hasImageAttachments: Boolean = false,
	val hasVideoAttachments: Boolean = false
)
data class HelpTopicDetailDto(
	val id: Long,
	val title: String,
	val shortDescription: String,
	val content: String,
	val lastUpdated: LocalDateTime,
	val hasImageAttachments: Boolean = false,
	val hasVideoAttachments: Boolean = false,
	val attachments: String
)
