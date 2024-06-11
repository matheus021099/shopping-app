package com.sh.stackrhub.api.help.model

import com.fasterxml.jackson.databind.ObjectMapper
import java.time.LocalDateTime
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "help_topic")
data class HelpTopic(
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	val id: Long = 0,

	@Column
	val title: String,

	@Column
	val shortDescription: String,

	@Column
	val content: String,

	@Column
	val hasImageAttachments: Boolean,

	@Column
	val hasVideoAttachments: Boolean,

	@Column
	val lastUpdated: LocalDateTime,

	@Column
	var attachments: String
	)
