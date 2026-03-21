package com.codekick.app.ui.screens.home

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.*
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.codekick.app.ui.components.AnimatedBackground

/**
 * HomeScreen — pixel-faithful Compose port of Home.tsx.
 *
 * Features:
 *  - Animated floating tech icons + rotating geometric squares
 *  - "Welcome to CodeKick" hero heading with animated underline
 *  - Auth-aware CTA: "Get Started" (guest) or "Go to Domains" (signed in)
 *  - "Explore learning paths" secondary text button
 *  - Animated scroll indicator at the bottom
 */
@Composable
fun HomeScreen(
    isLoggedIn: Boolean,
    onGetStarted: () -> Unit,
    onExplore: () -> Unit
) {
    val infiniteTransition = rememberInfiniteTransition(label = "home")

    // Scroll indicator bounce
    val scrollY by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 8f,
        animationSpec = infiniteRepeatable(
            animation = tween(2000, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "scroll"
    )

    // Animated underline width under "Code"
    var underlineAnimDone by remember { mutableStateOf(false) }
    val underlineAnim = remember { Animatable(0f) }
    LaunchedEffect(Unit) {
        kotlinx.coroutines.delay(1200)
        underlineAnim.animateTo(1f, tween(800))
        underlineAnimDone = true
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
    ) {
        // ── Floating background layer ────────────────────────────────────────
        AnimatedBackground(modifier = Modifier.fillMaxSize())

        // ── Ambient gradient glow ────────────────────────────────────────────
        Box(
            modifier = Modifier
                .size(600.dp)
                .offset(x = (-80).dp, y = 80.dp)
                .alpha(0.035f)
                .background(
                    Brush.radialGradient(
                        colors = listOf(MaterialTheme.colorScheme.onBackground, Color.Transparent),
                        center = Offset.Unspecified,
                        radius = 600f
                    ),
                    shape = CircleShape
                )
        )

        // ── Main content ─────────────────────────────────────────────────────
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 32.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            // "Start your tech journey" badge
            Surface(
                shape = CircleShape,
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
                modifier = Modifier.padding(bottom = 32.dp)
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Icon(
                        Icons.Outlined.AutoAwesome,
                        contentDescription = null,
                        modifier = Modifier.size(14.dp),
                        tint = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                    Text(
                        "Start your tech journey",
                        style = MaterialTheme.typography.labelSmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        letterSpacing = 1.sp
                    )
                }
            }

            // ── Hero heading: "Welcome to CodeKick" ─────────────────────────
            Text(
                "Welcome to",
                style = MaterialTheme.typography.displayMedium.copy(
                    fontWeight = FontWeight.Bold,
                    fontSize = 40.sp
                ),
                color = MaterialTheme.colorScheme.onBackground
            )

            Spacer(Modifier.height(4.dp))

            // "Code" with animated underline + "Kick" in muted color
            Box {
                Text(
                    buildAnnotatedString {
                        withStyle(SpanStyle(color = MaterialTheme.colorScheme.onBackground, fontWeight = FontWeight.Bold)) {
                            append("Code")
                        }
                        withStyle(SpanStyle(color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.45f), fontWeight = FontWeight.Bold)) {
                            append("Kick")
                        }
                    },
                    style = MaterialTheme.typography.displayMedium.copy(fontSize = 48.sp)
                )
                // Animated underline under "Code" (first 4 chars)
                Box(
                    modifier = Modifier
                        .align(Alignment.BottomStart)
                        .fillMaxWidth(0.45f * underlineAnim.value) // animates from 0 → ~45% width
                        .height(3.dp)
                        .background(MaterialTheme.colorScheme.primary)
                        .offset(y = 4.dp)
                )
            }

            Spacer(Modifier.height(16.dp))

            // Decorative horizontal line
            HorizontalDivider(
                modifier = Modifier.width(80.dp),
                color = MaterialTheme.colorScheme.outline.copy(alpha = 0.4f)
            )

            Spacer(Modifier.height(24.dp))

            // Sub-heading
            Text(
                "Your journey into tech starts here. Discover the perfect domain for your skills and passions with our guided learning paths.",
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.6f),
                textAlign = androidx.compose.ui.text.style.TextAlign.Center,
                modifier = Modifier.widthIn(max = 440.dp)
            )

            Spacer(Modifier.height(40.dp))

            // ── CTA Button ───────────────────────────────────────────────────
            Button(
                onClick = onGetStarted,
                shape = CircleShape,
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.primary,
                    contentColor = MaterialTheme.colorScheme.onPrimary
                ),
                modifier = Modifier.height(56.dp)
            ) {
                Text(
                    text = if (isLoggedIn) "Go to Domains" else "Get Started",
                    style = MaterialTheme.typography.titleMedium,
                    modifier = Modifier.padding(horizontal = 16.dp)
                )
                Spacer(Modifier.width(8.dp))
                Icon(Icons.Outlined.ArrowForward, contentDescription = null, modifier = Modifier.size(18.dp))
            }

            Spacer(Modifier.height(16.dp))

            // Secondary link
            TextButton(onClick = onExplore) {
                Text(
                    "Explore learning paths →",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f)
                )
            }
        }

        // ── Scroll indicator ─────────────────────────────────────────────────
        Column(
            modifier = Modifier
                .align(Alignment.BottomCenter)
                .padding(bottom = 32.dp)
                .offset(y = scrollY.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Text(
                "SCROLL",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.4f),
                letterSpacing = 3.sp
            )
            Spacer(Modifier.height(4.dp))
            Box(
                modifier = Modifier
                    .width(1.dp)
                    .height(32.dp)
                    .background(
                        Brush.verticalGradient(
                            listOf(
                                MaterialTheme.colorScheme.onBackground.copy(alpha = 0.4f),
                                Color.Transparent
                            )
                        )
                    )
            )
        }
    }
}
