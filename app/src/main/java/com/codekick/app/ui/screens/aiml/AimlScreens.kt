package com.codekick.app.ui.screens.aiml

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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

val aimlRoadmapSteps = listOf(
    "Linear Algebra & Calculus" to "Math foundations for ML",
    "Python & NumPy" to "Core programming tools",
    "Statistics & Probability" to "Statistical foundations",
    "Machine Learning Basics" to "Supervised & unsupervised",
    "Neural Networks" to "Deep learning foundations",
    "Computer Vision" to "CNNs & image processing",
    "Natural Language Processing" to "Transformers & LLMs",
    "MLOps & Deployment" to "Production-ready models",
)

/** AimlOverviewScreen — mirrors /aiml */
@Composable
fun AimlOverviewScreen(navController: NavController) {
    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text("AI/ML Roadmap", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
            Text("Your complete path to mastering AI & ML",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(0.5f))
            Spacer(Modifier.height(8.dp))
        }
        items(aimlRoadmapSteps.size) { index ->
            val (title, desc) = aimlRoadmapSteps[index]
            Card(
                modifier = Modifier.fillMaxWidth().clickable {
                    navController.navigate("aiml/step/${index + 1}")
                },
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Row(modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    Surface(
                        color = MaterialTheme.colorScheme.secondary.copy(0.15f),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text(
                            "${index + 1}",
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp),
                            style = MaterialTheme.typography.titleMedium,
                            fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.secondary
                        )
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text(title, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
                        Text(desc, style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    Icon(Icons.Outlined.ChevronRight, null)
                }
            }
        }
        item {
            OutlinedButton(onClick = { navController.navigate("aiml/papers") },
                modifier = Modifier.fillMaxWidth().height(52.dp), shape = RoundedCornerShape(12.dp)) {
                Icon(Icons.Outlined.Article, null, modifier = Modifier.size(18.dp))
                Spacer(Modifier.width(8.dp))
                Text("Browse Research Papers")
            }
        }
    }
}

/** AimlStepScreen — mirrors /aiml/step/:step */
@Composable
fun AimlStepScreen(navController: NavController, step: String) {
    val stepIndex = step.toIntOrNull()?.minus(1) ?: 0
    val (title, _) = aimlRoadmapSteps.getOrElse(stepIndex) { "Unknown" to "Explore this topic" }
    val resources = listOf("Video Lectures", "Notes & Articles", "Hands-on Projects", "Practice Exercises", "Community Forums")

    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Text("Step $step: $title", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
            Spacer(Modifier.height(8.dp))
        }
        items(resources) { resource ->
            Card(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Row(modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    Icon(Icons.Outlined.PlayCircle, null, tint = MaterialTheme.colorScheme.secondary)
                    Text(resource, style = MaterialTheme.typography.bodyMedium, modifier = Modifier.weight(1f))
                    Icon(Icons.Outlined.OpenInNew, null, modifier = Modifier.size(16.dp))
                }
            }
        }
    }
}

/** AimlResearchPapersScreen — mirrors /aiml/papers */
@Composable
fun AimlResearchPapersScreen(navController: NavController) {
    val papers = listOf(
        "Attention Is All You Need (Transformers)" to "Vaswani et al., 2017",
        "BERT: Pre-training of Deep Bidirectional Transformers" to "Devlin et al., 2018",
        "GPT-3: Language Models are Few-Shot Learners" to "Brown et al., 2020",
        "ResNet: Deep Residual Learning for Image Recognition" to "He et al., 2015",
        "AlphaFold: Protein Structure Prediction" to "Jumper et al., 2021",
        "Stable Diffusion: High-Resolution Image Synthesis" to "Rombach et al., 2022",
    )
    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Text("Research Papers", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
            Text("Foundational and recent AI/ML papers",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(0.5f))
            Spacer(Modifier.height(8.dp))
        }
        items(papers) { (title, authors) ->
            Card(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(title, style = MaterialTheme.typography.bodyMedium, fontWeight = FontWeight.SemiBold)
                    Text(authors, style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)
                }
            }
        }
    }
}
