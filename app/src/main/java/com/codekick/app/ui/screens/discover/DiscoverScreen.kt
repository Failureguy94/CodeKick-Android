package com.codekick.app.ui.screens.discover

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

data class LearningPath(
    val title: String,
    val description: String,
    val route: String,
    val icon: ImageVector,
    val color: Color,
    val duration: String
)

val allPaths = listOf(
    LearningPath("CP/DSA", "Competitive Programming & Algorithms", "cp", Icons.Outlined.Code, Color(0xFF3B82F6), "12-18 months"),
    LearningPath("AI/ML", "Artificial Intelligence & Machine Learning", "aiml", Icons.Outlined.Psychology, Color(0xFF8B5CF6), "18-24 months"),
    LearningPath("Web3", "Blockchain & Decentralized Apps", "web3", Icons.Outlined.Hub, Color(0xFF06B6D4), "6-12 months"),
    LearningPath("Web2", "Full-Stack Web Development", "web2", Icons.Outlined.Language, Color(0xFFEC4899), "6-12 months"),
)

/** DiscoverScreen — mirrors /discover */
@Composable
fun DiscoverScreen(navController: NavController) {
    var searchQuery by remember { mutableStateOf("") }
    val filtered = allPaths.filter {
        searchQuery.isBlank() || it.title.contains(searchQuery, true) || it.description.contains(searchQuery, true)
    }

    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text("Discover", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
            Text("Browse all learning paths",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(0.5f))
            Spacer(Modifier.height(12.dp))
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                label = { Text("Search paths...") },
                leadingIcon = { Icon(Icons.Outlined.Search, null) },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                singleLine = true
            )
        }
        items(filtered) { path ->
            Card(
                modifier = Modifier.fillMaxWidth().clickable { navController.navigate(path.route) },
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    Surface(color = path.color.copy(0.15f), shape = RoundedCornerShape(12.dp)) {
                        Icon(path.icon, null, tint = path.color, modifier = Modifier.padding(12.dp).size(28.dp))
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text(path.title, fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.titleMedium)
                        Text(path.description, style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                        Spacer(Modifier.height(4.dp))
                        Surface(color = path.color.copy(0.1f), shape = RoundedCornerShape(6.dp)) {
                            Text(path.duration, modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp),
                                style = MaterialTheme.typography.labelSmall, color = path.color)
                        }
                    }
                    Icon(Icons.Outlined.ChevronRight, null)
                }
            }
        }
    }
}
