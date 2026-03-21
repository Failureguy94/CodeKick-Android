package com.codekick.app.data.model

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class Profile(
    val id: String = "",
    val username: String = "",
    @SerialName("full_name") val fullName: String = "",
    @SerialName("phone_verified") val phoneVerified: Boolean = false,
    @SerialName("created_at") val createdAt: String = "",
    val avatar: String? = null
)
