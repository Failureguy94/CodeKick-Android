package com.codekick.app.ui.screens.learn

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.codekick.app.data.model.LearningTopic
import com.codekick.app.data.remote.supabase
import com.codekick.app.data.repository.LearningRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.jan.supabase.auth.auth
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class LearnState(
    val isGenerating: Boolean = false,
    val generatedNotes: String = "",
    val currentTopic: String = "",
    val error: String? = null,
    val savedTopics: List<LearningTopic> = emptyList(),
    val isSaved: Boolean = false
)

@HiltViewModel
class LearnViewModel @Inject constructor(
    private val learningRepository: LearningRepository
) : ViewModel() {

    private val _state = MutableStateFlow(LearnState())
    val state: StateFlow<LearnState> = _state.asStateFlow()

    fun generateNotes(topic: String, focusArea: String? = null) {
        if (topic.isBlank()) return
        viewModelScope.launch {
            _state.value = _state.value.copy(
                isGenerating = true, error = null, generatedNotes = "", isSaved = false, currentTopic = topic
            )
            try {
                val notes = learningRepository.generateNotes(topic, focusArea)
                _state.value = _state.value.copy(isGenerating = false, generatedNotes = notes)
            } catch (e: Exception) {
                _state.value = _state.value.copy(
                    isGenerating = false,
                    error = "Failed to generate notes. Please try again."
                )
            }
        }
    }

    fun saveCurrentTopic() {
        val userId = supabase.auth.currentUserOrNull()?.id ?: return
        val topic = _state.value.currentTopic
        val notes = _state.value.generatedNotes
        if (topic.isBlank() || notes.isBlank()) return
        viewModelScope.launch {
            try {
                learningRepository.saveTopic(userId, topic, notes)
                _state.value = _state.value.copy(isSaved = true)
            } catch (_: Exception) {}
        }
    }

    fun clearNotes() {
        _state.value = LearnState()
    }
}
