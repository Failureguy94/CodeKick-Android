package com.codekick.app.data.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class LearningTopic(
    val id: String = "",
    @SerialName("user_id") val userId: String = "",
    val topic: String = "",
    val notes: String? = null,
    @SerialName("created_at") val createdAt: String = ""
)

@Serializable
data class LearningActivity(
    val id: String? = null,
    @SerialName("user_id") val userId: String = "",
    @SerialName("activity_date") val activityDate: String = "",
    @SerialName("topics_count") val topicsCount: Int = 0,
    @SerialName("notes_generated") val notesGenerated: Int = 0
)

@Serializable
data class GeneratedNotes(
    val notes: String,
    val videos: List<VideoResource> = emptyList()
)

@Serializable
data class VideoResource(
    val title: String,
    val url: String,
    val thumbnail: String? = null
)
