package com.codekick.app.data.repository

import com.codekick.app.data.model.LearningActivity
import com.codekick.app.data.model.LearningTopic
import com.codekick.app.data.remote.supabase
import io.github.jan.supabase.functions.functions
import io.github.jan.supabase.postgrest.from
import io.github.jan.supabase.postgrest.query.Order
import io.ktor.client.statement.bodyAsText
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class LearningRepository @Inject constructor() {

    suspend fun getRecentTopics(userId: String): List<LearningTopic> {
        return try {
            supabase.from("learning_topics")
                .select {
                    filter { eq("user_id", userId) }
                    order("created_at", Order.DESCENDING)
                    limit(5)
                }
                .decodeList<LearningTopic>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getAllTopics(userId: String): List<LearningTopic> {
        return try {
            supabase.from("learning_topics")
                .select {
                    filter { eq("user_id", userId) }
                    order("created_at", Order.DESCENDING)
                }
                .decodeList<LearningTopic>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun deleteTopic(topicId: String) {
        supabase.from("learning_topics")
            .delete { filter { eq("id", topicId) } }
    }

    suspend fun getTodayActivity(userId: String): LearningActivity {
        val today = SimpleDateFormat("yyyy-MM-dd", Locale.US).format(Date())
        return try {
            supabase.from("learning_activity")
                .select {
                    filter {
                        eq("user_id", userId)
                        eq("activity_date", today)
                    }
                }
                .decodeSingleOrNull<LearningActivity>()
                ?: LearningActivity(userId = userId, activityDate = today)
        } catch (e: Exception) {
            LearningActivity(userId = userId, activityDate = today)
        }
    }

    suspend fun getActivityHistory(userId: String): List<LearningActivity> {
        return try {
            supabase.from("learning_activity")
                .select {
                    filter { eq("user_id", userId) }
                    order("activity_date", Order.DESCENDING)
                    limit(365)
                }
                .decodeList<LearningActivity>()
        } catch (e: Exception) {
            emptyList()
        }
    }

    suspend fun getTotalTopicsCount(userId: String): Int {
        return try {
            supabase.from("learning_topics")
                .select { filter { eq("user_id", userId) } }
                .decodeList<LearningTopic>().size
        } catch (e: Exception) {
            0
        }
    }

    /** Calls the Supabase Edge Function `generate-notes` — same function as web app */
    suspend fun generateNotes(topic: String, focusArea: String? = null): String {
        val body = buildJsonObject {
            put("topic", topic)
            if (focusArea != null) put("focus_area", focusArea)
        }
        val response = supabase.functions.invoke("generate-notes", body = body)
        return response.bodyAsText()
    }

    suspend fun saveTopic(userId: String, topic: String, notes: String) {
        supabase.from("learning_topics").insert(
            buildJsonObject {
                put("user_id", userId)
                put("topic", topic)
                put("notes", notes)
            }
        )
    }
}
