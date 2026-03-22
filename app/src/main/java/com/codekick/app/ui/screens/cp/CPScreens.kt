package com.codekick.app.ui.screens.cp

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

data class Language(val id: String, val name: String, val icon: ImageVector, val color: Color)

val cpLanguages = listOf(
    Language("cpp", "C++", Icons.Outlined.Code, Color(0xFF0077CC)),
    Language("java", "Java", Icons.Outlined.LocalCafe, Color(0xFFE76F00)),
    Language("python", "Python", Icons.Outlined.Terminal, Color(0xFF3776AB)),
    Language("javascript", "JavaScript", Icons.Outlined.DataObject, Color(0xFFF7DF1E)),
    Language("go", "Go", Icons.Outlined.Code, Color(0xFF00ADD8)),
    Language("rust", "Rust", Icons.Outlined.Memory, Color(0xFFCE422B)),
)

/** CP_LanguageSelectionScreen — mirrors /cp route: choose language for DSA/CP */
@Composable
fun CP_LanguageSelectionScreen(navController: NavController) {
    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text("CP/DSA", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
            Text("Choose your programming language", style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(0.5f))
            Spacer(Modifier.height(8.dp))
        }
        items(cpLanguages) { lang ->
            Card(
                modifier = Modifier.fillMaxWidth().clickable {
                    navController.navigate("cp/${lang.id}/level")
                },
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Row(
                    modifier = Modifier.padding(20.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Surface(color = lang.color.copy(0.15f), shape = RoundedCornerShape(10.dp)) {
                        Icon(lang.icon, null, tint = lang.color, modifier = Modifier.padding(12.dp).size(28.dp))
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text(lang.name, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                        Text("Competitive programming with ${lang.name}", style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    Icon(Icons.Outlined.ChevronRight, null)
                }
            }
        }
    }
}

/** CP_ProficiencyLevelScreen — mirrors /cp/:language/level */
@Composable
fun CP_ProficiencyLevelScreen(navController: NavController, language: String) {
    val levels = listOf(
        Triple("beginner", "Beginner", "Arrays, Strings, Basic Algorithms"),
        Triple("intermediate", "Intermediate", "Trees, Graphs, DP, Greedy"),
        Triple("advanced", "Advanced", "Advanced DP, Network Flow, Segment Trees"),
    )
    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text(language.uppercase(), style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
            Text("Select your proficiency level", style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(0.5f))
            Spacer(Modifier.height(8.dp))
        }
        items(levels) { (id, label, desc) ->
            Card(
                modifier = Modifier.fillMaxWidth().clickable { navController.navigate("cp/$language/$id") },
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Row(modifier = Modifier.padding(20.dp), verticalAlignment = Alignment.CenterVertically) {
                    Column(modifier = Modifier.weight(1f)) {
                        Text(label, style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.SemiBold)
                        Text(desc, style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    Icon(Icons.Outlined.ChevronRight, null)
                }
            }
        }
    }
}

/** CP_ResourcesScreen — mirrors /cp/:language/:level */
@Composable
fun CP_ResourcesScreen(navController: NavController, language: String, level: String) {
    val resources = listOf(
        "Striver's DSA Sheet — 180 Problems",
        "NeetCode 150 — Curated Problem List",
        "Codeforces — Competitive Programming",
        "LeetCode — Interview Prep Problems",
        "GeeksforGeeks — Concept Articles",
        "CP-Algorithms — Advanced Techniques",
    )
    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Text("$language • ${level.replaceFirstChar { it.uppercase() }}",
                style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
            Text("Curated resources for your level", style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(0.5f))
            Spacer(Modifier.height(8.dp))
        }
        items(resources) { resource ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Row(modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    Icon(Icons.Outlined.Link, null, tint = MaterialTheme.colorScheme.secondary)
                    Text(resource, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.weight(1f))
                    Icon(Icons.Outlined.OpenInNew, null, modifier = Modifier.size(16.dp))
                }
            }
        }
    }
}

/** CP_DailyBlogsScreen — mirrors /cp/blogs */
@Composable
fun CP_DailyBlogsScreen(navController: NavController) {
    val blogs = listOf(
        "Codeforces Round #945: Editorial",
        "How to approach Dynamic Programming problems",
        "Graph algorithms you must know for interviews",
        "Binary Search: From basics to advanced patterns",
        "Top 10 Segment Tree problems",
    )
    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Text("Daily Blogs", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
            Text("Fresh CP content every day", style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(0.5f))
            Spacer(Modifier.height(8.dp))
        }
        items(blogs) { blog ->
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Row(modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    Icon(Icons.Outlined.Article, null, tint = MaterialTheme.colorScheme.secondary)
                    Text(blog, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.weight(1f))
                }
            }
        }
    }
}
