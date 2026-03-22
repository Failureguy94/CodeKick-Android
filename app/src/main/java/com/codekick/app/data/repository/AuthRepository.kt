package com.codekick.app.data.repository

import com.codekick.app.data.model.Profile
import com.codekick.app.data.remote.supabase
import io.github.jan.supabase.auth.auth
import io.github.jan.supabase.auth.providers.builtin.Email
import io.github.jan.supabase.auth.user.UserInfo
import io.github.jan.supabase.postgrest.from
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AuthRepository @Inject constructor() {

    // Mirror of web: creates username@codekick.local email
    private fun buildEmail(username: String) = "${username.trim()}@codekick.local"

    fun currentUserFlow(): Flow<UserInfo?> =
        supabase.auth.sessionStatus.map { supabase.auth.currentUserOrNull() }

    fun currentUser(): UserInfo? = supabase.auth.currentUserOrNull()

    suspend fun signUp(username: String, fullName: String, password: String) {
        supabase.auth.signUpWith(Email) {
            email = buildEmail(username)
            this.password = password
            data = buildJsonObject {
                put("username", username.trim())
                put("full_name", fullName)
            }
        }
    }

    suspend fun signIn(username: String, password: String) {
        supabase.auth.signInWith(Email) {
            email = buildEmail(username)
            this.password = password
        }
    }

    suspend fun signOut() {
        supabase.auth.signOut()
    }

    suspend fun getProfile(userId: String): Profile? {
        return try {
            supabase.from("profiles")
                .select { filter { eq("id", userId) } }
                .decodeSingleOrNull<Profile>()
        } catch (e: Exception) {
            null
        }
    }
}
