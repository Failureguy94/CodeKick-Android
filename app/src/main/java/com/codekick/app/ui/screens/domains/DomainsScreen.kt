package com.codekick.app.ui.screens.domains

import androidx.compose.animation.core.*
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.codekick.app.ui.NavGraph
import com.codekick.app.ui.theme.*

data class Domain(
    val id: String,
    val name: String,
    val icon: ImageVector,
    val gradient: List<Color>,
    val description: String,
    val advantages: List<String>,
    val disadvantages: List<String>,
    val salary: String,
    val timeToMaster: String
)

val domains = listOf(
    Domain(
        id = "cp",
        name = "CP/DSA",
        icon = Icons.Outlined.Code,
        gradient = listOf(Color(0xFF1a1a2e), Color(0xFF16213e)),
        description = "Competitive Programming & Data Structures and Algorithms",
        advantages = listOf(
            "Strong problem-solving skills",
            "Excellent for tech interviews",
            "High-paying job opportunities",
            "Logical thinking development"
        ),
        disadvantages = listOf(
            "Steep learning curve",
            "Time-intensive practice needed",
            "Can be frustrating initially"
        ),
        salary = "\$80K - \$200K+ annually",
        timeToMaster = "12-18 months with consistent practice"
    ),
    Domain(
        id = "aiml",
        name = "AI/ML",
        icon = Icons.Outlined.Psychology,
        gradient = listOf(Color(0xFF2d132c), Color(0xFF1a0a1a)),
        description = "Artificial Intelligence & Machine Learning",
        advantages = listOf(
            "Cutting-edge technology field",
            "High demand in the market",
            "Diverse applications",
            "Research opportunities"
        ),
        disadvantages = listOf(
            "Requires strong math background",
            "Hardware-intensive",
            "Constantly evolving field"
        ),
        salary = "\$90K - \$250K+ annually",
        timeToMaster = "18-24 months including prerequisites"
    ),
    Domain(
        id = "web3",
        name = "Web3",
        icon = Icons.Outlined.Hub,
        gradient = listOf(Color(0xFF0f2027), Color(0xFF203a43)),
        description = "Blockchain & Decentralized Applications",
        advantages = listOf(
            "Emerging technology",
            "High earning potential",
            "Remote work opportunities",
            "Innovation-driven"
        ),
        disadvantages = listOf(
            "Market volatility",
            "Requires web2 foundation",
            "Security concerns"
        ),
        salary = "\$70K - \$180K+ annually",
        timeToMaster = "6-12 months with web2 background"
    ),
    Domain(
        id = "web2",
        name = "Web2",
        icon = Icons.Outlined.Language,
        gradient = listOf(Color(0xFF3d1c1c), Color(0xFF1a0a0a)),
        description = "Traditional Web Development",
        advantages = listOf(
            "Wide job market",
            "Immediate practical applications",
            "Large community support",
            "Versatile skill set"
        ),
        disadvantages = listOf(
            "Highly competitive",
            "Rapidly changing frameworks",
            "Can feel saturated"
        ),
        salary = "\$60K - \$150K+ annually",
        timeToMaster = "6-12 months for proficiency"
    )
)

/**
 * DomainsScreen — port of Domains.tsx.
 * 4 flip-cards using graphicsLayer { rotationY } to mirror the web's CSS 3D card flip.
 * Tap card → flip to reveal details. Tap again → navigate to the track.
 */
@Composable
fun DomainsScreen(navController: NavController) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .verticalScroll(rememberScrollState())
            .padding(horizontal = 16.dp, vertical = 24.dp)
    ) {
        Text(
            "Choose Your Domain",
            style = MaterialTheme.typography.headlineLarge.copy(fontWeight = FontWeight.Bold),
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 4.dp),
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )
        Text(
            "Tap each card to see detailed information",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f),
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 24.dp),
            textAlign = androidx.compose.ui.text.style.TextAlign.Center
        )

        // 2-column grid
        domains.chunked(2).forEach { row ->
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                row.forEach { domain ->
                    DomainFlipCard(
                        domain = domain,
                        modifier = Modifier.weight(1f),
                        onNavigate = { navController.navigate(domain.id) }
                    )
                }
                // fill space if odd count
                if (row.size == 1) Spacer(Modifier.weight(1f))
            }
            Spacer(Modifier.height(12.dp))
        }
    }
}

@Composable
fun DomainFlipCard(
    domain: Domain,
    modifier: Modifier = Modifier,
    onNavigate: () -> Unit
) {
    var isFlipped by remember { mutableStateOf(false) }
    val rotation by animateFloatAsState(
        targetValue = if (isFlipped) 180f else 0f,
        animationSpec = tween(600),
        label = "flip"
    )

    val isFrontVisible = rotation < 90f

    Box(
        modifier = modifier
            .height(320.dp)
            .graphicsLayer {
                cameraDistance = 12f * density
            }
            .clickable {
                if (isFlipped) onNavigate() else isFlipped = true
            }
    ) {
        if (isFrontVisible) {
            // ── Front face ───────────────────────────────────────────────────
            Card(
                modifier = Modifier
                    .fillMaxSize()
                    .graphicsLayer { rotationY = rotation },
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = Color.Transparent)
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            Brush.verticalGradient(domain.gradient),
                            shape = RoundedCornerShape(20.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.Center,
                        modifier = Modifier.padding(16.dp)
                    ) {
                        Icon(
                            domain.icon,
                            contentDescription = null,
                            tint = Color.White,
                            modifier = Modifier.size(56.dp)
                        )
                        Spacer(Modifier.height(16.dp))
                        Text(
                            domain.name,
                            style = MaterialTheme.typography.headlineSmall.copy(fontWeight = FontWeight.Bold),
                            color = Color.White
                        )
                        Spacer(Modifier.height(8.dp))
                        Text(
                            domain.description,
                            style = MaterialTheme.typography.bodySmall,
                            color = Color.White.copy(alpha = 0.8f),
                            textAlign = androidx.compose.ui.text.style.TextAlign.Center
                        )
                    }
                }
            }
        } else {
            // ── Back face ────────────────────────────────────────────────────
            Card(
                modifier = Modifier
                    .fillMaxSize()
                    .graphicsLayer { rotationY = rotation - 180f },
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                )
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .verticalScroll(rememberScrollState())
                        .padding(16.dp)
                ) {
                    Text(
                        "${domain.name} Overview",
                        style = MaterialTheme.typography.titleMedium.copy(fontWeight = FontWeight.Bold)
                    )
                    Spacer(Modifier.height(12.dp))

                    Text("✅ Advantages:", fontWeight = FontWeight.SemiBold,
                        color = AccentGreen, style = MaterialTheme.typography.bodySmall)
                    domain.advantages.forEach { adv ->
                        Text("• $adv", style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }

                    Spacer(Modifier.height(8.dp))
                    Text("⚠️ Disadvantages:", fontWeight = FontWeight.SemiBold,
                        color = AccentRed, style = MaterialTheme.typography.bodySmall)
                    domain.disadvantages.forEach { dis ->
                        Text("• $dis", style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }

                    Spacer(Modifier.height(8.dp))
                    Text("💰 ${domain.salary}", style = MaterialTheme.typography.bodySmall,
                        fontWeight = FontWeight.SemiBold)
                    Text("⏱ ${domain.timeToMaster}", style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant)

                    Spacer(Modifier.height(8.dp))
                    Text(
                        "Tap again to explore →",
                        style = MaterialTheme.typography.bodySmall,
                        color = AccentIndigo,
                        fontWeight = FontWeight.SemiBold
                    )
                }
            }
        }
    }
}
