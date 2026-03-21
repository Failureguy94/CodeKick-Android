package com.codekick.app.ui.screens.web2

import androidx.compose.foundation.background
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

val web2Tracks = listOf(
    "HTML & CSS Fundamentals" to "Semantic HTML, Flexbox, Grid, Responsive",
    "JavaScript Essentials" to "ES6+, DOM, async/await, APIs",
    "React.js" to "Hooks, state management, routing",
    "Node.js & Express" to "REST APIs, middleware, authentication",
    "Databases" to "PostgreSQL, MongoDB, Supabase",
    "TypeScript" to "Types, generics, decorators",
    "Next.js" to "SSR, SSG, API routes, deployment",
    "Testing" to "Jest, React Testing Library, Cypress",
    "DevOps Basics" to "Git, Docker, CI/CD, Vercel",
)

/** Web2TrackScreen — mirrors /web2 */
@Composable
fun Web2TrackScreen(navController: NavController) {
    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text("Web2 Track", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
            Text("Full-stack web development from zero to hero",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(0.5f))
            Spacer(Modifier.height(8.dp))
        }
        items(web2Tracks.size) { index ->
            val (title, desc) = web2Tracks[index]
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    Surface(color = MaterialTheme.colorScheme.secondary.copy(0.15f), shape = RoundedCornerShape(8.dp)) {
                        Text("${index + 1}", modifier = Modifier.padding(10.dp),
                            fontWeight = FontWeight.Bold, color = MaterialTheme.colorScheme.secondary,
                            style = MaterialTheme.typography.bodyMedium)
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text(title, fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.bodyMedium)
                        Text(desc, style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    Icon(Icons.Outlined.ChevronRight, null)
                }
            }
        }
    }
}
