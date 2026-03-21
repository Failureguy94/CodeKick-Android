package com.codekick.app.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import kotlin.math.sin

// ─── Floating Geometric Square (mirrors FloatingShape in Home.tsx) ────────────
@Composable
fun AnimatedFloatingSquare(
    size: Dp,
    color: Color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.06f),
    durationMs: Int = 20000,
    modifier: Modifier = Modifier
) {
    val infiniteTransition = rememberInfiniteTransition(label = "square")
    val rotation by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMs, easing = LinearEasing)
        ),
        label = "rotate"
    )
    Box(
        modifier = modifier
            .size(size)
            .rotate(rotation)
            .border(1.dp, color)
            .alpha(0.6f)
    )
}

// ─── Floating Tech Icon (mirrors FloatingIcon in Home.tsx) ────────────────────
@Composable
fun AnimatedFloatingIcon(
    imageVector: ImageVector,
    durationMs: Int = 6000,
    modifier: Modifier = Modifier
) {
    val infiniteTransition = rememberInfiniteTransition(label = "icon")
    val offsetY by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 15f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMs, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "float"
    )
    Icon(
        imageVector = imageVector,
        contentDescription = null,
        tint = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.12f),
        modifier = modifier
            .size(48.dp)
            .offset(y = offsetY.dp)
    )
}

// ─── Full animated background layer (used on HomeScreen and AuthScreen) ───────
@Composable
fun AnimatedBackground(modifier: Modifier = Modifier) {
    val icons = listOf(
        Icons.Outlined.Code,
        Icons.Outlined.Psychology,
        Icons.Outlined.Language,
        Icons.Outlined.Storage,
        Icons.Outlined.Memory,
        Icons.Outlined.Terminal,
    )
    val positions = listOf(
        Pair(0.08f, 0.25f), Pair(0.88f, 0.18f), Pair(0.12f, 0.72f),
        Pair(0.85f, 0.70f), Pair(0.50f, 0.12f), Pair(0.45f, 0.82f)
    )
    Box(modifier = modifier) {
        icons.forEachIndexed { i, icon ->
            val (x, y) = positions[i]
            AnimatedFloatingIcon(
                imageVector = icon,
                durationMs = 5000 + i * 1500,
                modifier = Modifier
                    .fillMaxWidth()
                    .fillMaxHeight()
                    .wrapContentSize(Alignment.TopStart)
                    .offset(
                        x = (x * 400).dp,  // approximate %x layout
                        y = (y * 800).dp
                    )
            )
        }
    }
}
