package com.sh.stackrhub.api.help.repository

import com.sh.stackrhub.api.help.model.HelpTopic
import org.springframework.data.jpa.repository.JpaRepository

interface HelpRepository : JpaRepository<HelpTopic, Long> {
}