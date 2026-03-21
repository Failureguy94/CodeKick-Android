package com.codekick.app.ui.screens.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.codekick.app.data.remote.supabase
import com.codekick.app.data.repository.AuthRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.jan.supabase.auth.auth
import io.github.jan.supabase.auth.status.SessionStatus
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import kotlinx.coroutines.launch
import javax.inject.Inject

data class AuthUiState(
    val isLoading: Boolean = false,
    val error: String? = null,
    val success: Boolean = false,
    val phoneVerified: Boolean = false
)

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val authRepository: AuthRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(AuthUiState())
    val uiState: StateFlow<AuthUiState> = _uiState.asStateFlow()

    private val _isLoggedIn = MutableStateFlow(false)
    val isLoggedIn: StateFlow<Boolean> = _isLoggedIn.asStateFlow()

    init {
        // Observe session status — mirrors useAuth hook
        supabase.auth.sessionStatus.onEach { status ->
            _isLoggedIn.value = status is SessionStatus.Authenticated
        }.launchIn(viewModelScope)
    }

    fun signIn(username: String, password: String) {
        if (!validateUsername(username)) {
            _uiState.value = _uiState.value.copy(error = "Username must be 3+ chars, letters/numbers/underscores only")
            return
        }
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            try {
                authRepository.signIn(username.trim(), password)
                val profile = authRepository.getProfile(supabase.auth.currentUserOrNull()?.id ?: "")
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    success = true,
                    phoneVerified = profile?.phoneVerified ?: false
                )
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = "Invalid credentials. Please try again."
                )
            }
        }
    }

    fun signUp(username: String, fullName: String, password: String) {
        if (!validateUsername(username)) {
            _uiState.value = _uiState.value.copy(error = "Username must be 3+ chars, letters/numbers/underscores only")
            return
        }
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            try {
                authRepository.signUp(username.trim(), fullName, password)
                val profile = authRepository.getProfile(supabase.auth.currentUserOrNull()?.id ?: "")
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    success = true,
                    phoneVerified = profile?.phoneVerified ?: false
                )
            } catch (e: Exception) {
                val msg = e.message ?: ""
                val errorMessage = when {
                    "already registered" in msg || "duplicate" in msg || "unique" in msg ->
                        "Username is already taken. Please choose another."
                    else -> "Registration failed. Please try again."
                }
                _uiState.value = _uiState.value.copy(isLoading = false, error = errorMessage)
            }
        }
    }

    fun signOut() {
        viewModelScope.launch {
            authRepository.signOut()
        }
    }

    fun clearState() {
        _uiState.value = AuthUiState()
    }

    // Mirror of web's validateUsername() helper
    private fun validateUsername(username: String): Boolean {
        if (username.trim().length < 3) return false
        if (!username.trim().matches(Regex("^[a-zA-Z0-9_]+$"))) return false
        return true
    }
}
