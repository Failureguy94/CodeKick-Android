package com.codekick.app.ui.screens.learn

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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavController

val focusAreas = listOf("Basics", "Advanced", "Interview Prep", "Project Ideas", "Best Practices", "Examples")

/**
 * LearnTopicScreen — port of LearnTopic.tsx
 * Topic search input → generate AI notes via Supabase edge function → display + save
 */
@Composable
fun LearnTopicScreen(
    navController: NavController,
    viewModel: LearnViewModel = hiltViewModel()
) {
    val state by viewModel.state.collectAsStateWithLifecycle()
    var topicInput by remember { mutableStateOf("") }
    var selectedFocus by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            "Learn a Topic",
            style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold)
        )
        Text(
            "Enter any topic and get AI-generated notes instantly",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f)
        )

        // ── Search input ─────────────────────────────────────────────────────
        OutlinedTextField(
            value = topicInput,
            onValueChange = { topicInput = it },
            label = { Text("What do you want to learn?") },
            placeholder = { Text("e.g. Binary Search Trees, Neural Networks...") },
            leadingIcon = { Icon(Icons.Outlined.Search, null) },
            trailingIcon = {
                if (topicInput.isNotEmpty()) {
                    IconButton(onClick = { topicInput = ""; viewModel.clearNotes() }) {
                        Icon(Icons.Outlined.Close, null)
                    }
                }
            },
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            singleLine = true
        )

        // ── Focus area chips ─────────────────────────────────────────────────
        Text("Focus Area", style = MaterialTheme.typography.labelLarge, fontWeight = FontWeight.Medium)
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            focusAreas.take(3).forEach { area ->
                FilterChip(
                    selected = selectedFocus == area,
                    onClick = { selectedFocus = if (selectedFocus == area) null else area },
                    label = { Text(area) }
                )
            }
        }
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            focusAreas.drop(3).forEach { area ->
                FilterChip(
                    selected = selectedFocus == area,
                    onClick = { selectedFocus = if (selectedFocus == area) null else area },
                    label = { Text(area) }
                )
            }
        }

        // ── Generate button ──────────────────────────────────────────────────
        Button(
            onClick = { viewModel.generateNotes(topicInput, selectedFocus) },
            enabled = topicInput.isNotBlank() && !state.isGenerating,
            modifier = Modifier.fillMaxWidth().height(52.dp),
            shape = RoundedCornerShape(12.dp)
        ) {
            if (state.isGenerating) {
                CircularProgressIndicator(modifier = Modifier.size(20.dp), strokeWidth = 2.dp,
                    color = MaterialTheme.colorScheme.onPrimary)
                Spacer(Modifier.width(8.dp))
                Text("Generating notes...")
            } else {
                Icon(Icons.Outlined.AutoAwesome, null, modifier = Modifier.size(18.dp))
                Spacer(Modifier.width(8.dp))
                Text("Generate Notes")
            }
        }

        // ── Error ────────────────────────────────────────────────────────────
        state.error?.let { err ->
            Card(
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.errorContainer),
                shape = RoundedCornerShape(8.dp)
            ) {
                Text(err, modifier = Modifier.padding(12.dp), style = MaterialTheme.typography.bodySmall)
            }
        }

        // ── Generated notes display ──────────────────────────────────────────
        if (state.generatedNotes.isNotEmpty()) {
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Text(state.currentTopic, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold)
                        FilledTonalButton(
                            onClick = { viewModel.saveCurrentTopic() },
                            enabled = !state.isSaved
                        ) {
                            Icon(
                                if (state.isSaved) Icons.Outlined.CheckCircle else Icons.Outlined.BookmarkBorder,
                                null,
                                modifier = Modifier.size(16.dp)
                            )
                            Spacer(Modifier.width(4.dp))
                            Text(if (state.isSaved) "Saved!" else "Save Topic")
                        }
                    }
                    HorizontalDivider(modifier = Modifier.padding(vertical = 8.dp))
                    // Render the notes as plain text (markdown rendering would require a library)
                    Text(
                        state.generatedNotes,
                        style = MaterialTheme.typography.bodyMedium,
                        lineHeight = MaterialTheme.typography.bodyMedium.lineHeight
                    )
                }
            }
        }
    }
}
