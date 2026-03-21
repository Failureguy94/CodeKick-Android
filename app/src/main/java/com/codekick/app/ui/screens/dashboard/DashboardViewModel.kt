package com.codekick.app.ui.screens.dashboard

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.codekick.app.data.model.LearningActivity
import com.codekick.app.data.model.LearningTopic
import com.codekick.app.data.remote.supabase
import com.codekick.app.data.repository.AuthRepository
import com.codekick.app.data.repository.LearningRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.jan.supabase.auth.auth
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.concurrent.TimeUnit
import javax.inject.Inject

data class DashboardState(
    val isLoading: Boolean = true,
    val recentTopics: List<LearningTopic> = emptyList(),
    val todayActivity: LearningActivity? = null,
    val totalTopics: Int = 0,
    val currentStreak: Int = 0,
    val memberSince: String = "",
    val username: String = ""
)

@HiltViewModel
class DashboardViewModel @Inject constructor(
    private val learningRepository: LearningRepository,
    private val authRepository: AuthRepository
) : ViewModel() {

    private val _state = MutableStateFlow(DashboardState())
    val state: StateFlow<DashboardState> = _state.asStateFlow()

    init {
        loadDashboardData()
    }

    fun loadDashboardData() {
        val userId = supabase.auth.currentUserOrNull()?.id ?: return
        viewModelScope.launch {
            _state.value = _state.value.copy(isLoading = true)
            try {
                val recentTopics = learningRepository.getRecentTopics(userId)
                val todayActivity = learningRepository.getTodayActivity(userId)
                val totalTopics = learningRepository.getTotalTopicsCount(userId)
                val activityHistory = learningRepository.getActivityHistory(userId)
                val profile = authRepository.getProfile(userId)
                val streak = calculateStreak(activityHistory)

                _state.value = DashboardState(
                    isLoading = false,
                    recentTopics = recentTopics,
                    todayActivity = todayActivity,
                    totalTopics = totalTopics,
                    currentStreak = streak,
                    memberSince = profile?.createdAt?.take(10) ?: "",
                    username = profile?.username ?: supabase.auth.currentUserOrNull()?.userMetadata?.get("username")?.toString() ?: "Learner"
                )
            } catch (e: Exception) {
                _state.value = _state.value.copy(isLoading = false)
            }
        }
    }

    fun deleteTopic(topicId: String) {
        viewModelScope.launch {
            try {
                learningRepository.deleteTopic(topicId)
                _state.value = _state.value.copy(
                    recentTopics = _state.value.recentTopics.filter { it.id != topicId }
                )
            } catch (_: Exception) {}
        }
    }

    // Calculates consecutive day streak — mirrors Dashboard.tsx streak logic
    private fun calculateStreak(history: List<LearningActivity>): Int {
        if (history.isEmpty()) return 0
        val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.US)
        val today = sdf.format(Date())
        var streak = 0
        for (i in history.indices) {
            val actDate = sdf.parse(history[i].activityDate) ?: break
            val todayDate = sdf.parse(today) ?: break
            val daysDiff = TimeUnit.MILLISECONDS.toDays(todayDate.time - actDate.time)
            if (daysDiff == i.toLong() && history[i].topicsCount > 0) streak++
            else if (daysDiff > i.toLong()) break
        }
        return streak
    }
}
