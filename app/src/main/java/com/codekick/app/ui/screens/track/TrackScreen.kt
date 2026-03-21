package com.codekick.app.ui.screens.track

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.ViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewModelScope
import androidx.navigation.NavController
import com.codekick.app.data.model.LearningActivity
import com.codekick.app.data.remote.supabase
import com.codekick.app.data.repository.LearningRepository
import com.codekick.app.ui.theme.AccentGreen
import com.codekick.app.ui.theme.AccentOrange
import dagger.hilt.android.lifecycle.HiltViewModel
import io.github.jan.supabase.auth.auth
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*
import javax.inject.Inject

// ─── ViewModel ───────────────────────────────────────────────────────────────
data class TrackState(
    val activityHistory: List<LearningActivity> = emptyList(),
    val totalTopics: Int = 0,
    val currentStreak: Int = 0,
    val isLoading: Boolean = true
)

@HiltViewModel
class TrackViewModel @Inject constructor(
    private val learningRepository: LearningRepository
) : ViewModel() {

    private val _state = MutableStateFlow(TrackState())
    val state: StateFlow<TrackState> = _state.asStateFlow()

    init { loadData() }

    private fun loadData() {
        val userId = supabase.auth.currentUserOrNull()?.id ?: return
        viewModelScope.launch {
            val history = learningRepository.getActivityHistory(userId)
            val total = learningRepository.getTotalTopicsCount(userId)
            val streak = calculateStreak(history)
            _state.value = TrackState(history, total, streak, false)
        }
    }

    private fun calculateStreak(history: List<LearningActivity>): Int {
        if (history.isEmpty()) return 0
        val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.US)
        val today = sdf.format(Date())
        var streak = 0
        for (i in history.indices) {
            val actDate = sdf.parse(history[i].activityDate) ?: break
            val todayDate = sdf.parse(today) ?: break
            val daysDiff = java.util.concurrent.TimeUnit.MILLISECONDS.toDays(todayDate.time - actDate.time)
            if (daysDiff == i.toLong() && history[i].topicsCount > 0) streak++
            else if (daysDiff > i.toLong()) break
        }
        return streak
    }
}

// ─── Screen ──────────────────────────────────────────────────────────────────
/**
 * TrackScreen — port of Track.tsx
 * - Stats cards
 * - Activity heatmap drawn on Canvas (mirrors ActivityHeatmap.tsx)
 * - Milestones list
 */
@Composable
fun TrackScreen(
    navController: NavController,
    viewModel: TrackViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsStateWithLifecycle()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text("Your Progress", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
        Text("Track your learning journey over time",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f))

        // ── Stats cards ──────────────────────────────────────────────────────
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            TrackStatCard(
                icon = Icons.Outlined.AutoStories,
                label = "Topics Learned",
                value = "${state.totalTopics}",
                modifier = Modifier.weight(1f)
            )
            TrackStatCard(
                icon = Icons.Outlined.LocalFire,
                label = "Day Streak",
                value = "${state.currentStreak}",
                modifier = Modifier.weight(1f),
                valueColor = AccentOrange
            )
        }

        // ── Activity Heatmap ─────────────────────────────────────────────────
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Activity Heatmap", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.SemiBold))
                Text("Last 12 weeks", style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant)
                Spacer(Modifier.height(12.dp))
                ActivityHeatmap(activityHistory = state.activityHistory)
            }
        }

        // ── Milestones ───────────────────────────────────────────────────────
        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Milestones", style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.SemiBold))
                Spacer(Modifier.height(12.dp))
                val milestones = listOf(
                    Triple("First Topic!", state.totalTopics >= 1, Icons.Outlined.EmojiEvents),
                    Triple("5 Topics Learned", state.totalTopics >= 5, Icons.Outlined.EmojiEvents),
                    Triple("10 Topics Learned", state.totalTopics >= 10, Icons.Outlined.EmojiEvents),
                    Triple("7-Day Streak", state.currentStreak >= 7, Icons.Outlined.LocalFire),
                    Triple("30-Day Streak", state.currentStreak >= 30, Icons.Outlined.LocalFire),
                )
                milestones.forEach { (label, achieved, icon) ->
                    MilestoneRow(label, achieved, icon)
                    Spacer(Modifier.height(6.dp))
                }
            }
        }
    }
}

/** Canvas-drawn heatmap — mirrors ActivityHeatmap.tsx */
@Composable
fun ActivityHeatmap(activityHistory: List<LearningActivity>) {
    val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.US)
    val activityMap = activityHistory.associate { it.activityDate to it.topicsCount }
    val weeks = 12
    val days = 7
    val calendar = Calendar.getInstance()
    calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY)

    val surfaceColor = MaterialTheme.colorScheme.surface
    val activeColor = AccentGreen

    Canvas(
        modifier = Modifier
            .fillMaxWidth()
            .height((days * 14 + 8).dp)
    ) {
        val cellSize = size.width / (weeks + 1)
        val gap = 4.dp.toPx()

        for (week in 0 until weeks) {
            for (day in 0 until days) {
                val cal = calendar.clone() as Calendar
                cal.add(Calendar.DAY_OF_YEAR, (week - weeks + 1) * 7 + day)
                val dateStr = sdf.format(cal.time)
                val count = activityMap[dateStr] ?: 0
                val alpha = when {
                    count == 0 -> 0.12f
                    count < 3 -> 0.4f
                    count < 6 -> 0.7f
                    else -> 1.0f
                }
                drawRoundRect(
                    color = if (count > 0) activeColor.copy(alpha = alpha) else surfaceColor,
                    topLeft = Offset(week * cellSize + gap / 2, day * (cellSize + gap / 2)),
                    size = Size(cellSize - gap, cellSize - gap),
                    cornerRadius = CornerRadius(3.dp.toPx())
                )
            }
        }
    }
}

@Composable
private fun TrackStatCard(
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    label: String,
    value: String,
    modifier: Modifier = Modifier,
    valueColor: Color = MaterialTheme.colorScheme.onBackground
) {
    Card(
        modifier = modifier,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Column(modifier = Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Icon(icon, null, tint = valueColor)
            Text(value, style = MaterialTheme.typography.headlineSmall, fontWeight = FontWeight.Bold, color = valueColor)
            Text(label, style = MaterialTheme.typography.bodySmall, color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    }
}

@Composable
private fun MilestoneRow(
    label: String,
    achieved: Boolean,
    icon: androidx.compose.ui.graphics.vector.ImageVector
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .background(MaterialTheme.colorScheme.surface.copy(0.5f), RoundedCornerShape(8.dp))
            .padding(12.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Icon(
            icon, null,
            tint = if (achieved) AccentGreen else MaterialTheme.colorScheme.onSurfaceVariant.copy(0.4f),
            modifier = Modifier.size(20.dp)
        )
        Text(
            label,
            style = MaterialTheme.typography.bodyMedium,
            color = if (achieved) MaterialTheme.colorScheme.onBackground else MaterialTheme.colorScheme.onSurfaceVariant.copy(0.5f),
            fontWeight = if (achieved) FontWeight.SemiBold else FontWeight.Normal,
            modifier = Modifier.weight(1f)
        )
        if (achieved) Icon(Icons.Outlined.CheckCircle, null, tint = AccentGreen, modifier = Modifier.size(16.dp))
    }
}
