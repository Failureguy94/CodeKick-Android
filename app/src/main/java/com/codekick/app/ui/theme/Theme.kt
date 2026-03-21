package com.codekick.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.staticCompositionLocalOf

private val DarkColorScheme = darkColorScheme(
    primary = ForegroundDark,
    onPrimary = BackgroundDark,
    secondary = AccentIndigo,
    onSecondary = ForegroundDark,
    tertiary = AccentOrange,
    background = BackgroundDark,
    onBackground = ForegroundDark,
    surface = SurfaceDark,
    onSurface = ForegroundDark,
    surfaceVariant = CardDark,
    onSurfaceVariant = MutedDark,
    outline = BorderDark,
    error = AccentRed,
)

private val LightColorScheme = lightColorScheme(
    primary = ForegroundLight,
    onPrimary = BackgroundLight,
    secondary = AccentIndigo,
    onSecondary = ForegroundLight,
    tertiary = AccentOrange,
    background = BackgroundLight,
    onBackground = ForegroundLight,
    surface = SurfaceLight,
    onSurface = ForegroundLight,
    surfaceVariant = CardLight,
    onSurfaceVariant = MutedLight,
    outline = BorderLight,
    error = AccentRed,
)

val LocalDarkTheme = staticCompositionLocalOf { true }

@Composable
fun CodeKickTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme

    CompositionLocalProvider(LocalDarkTheme provides darkTheme) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = CodeKickTypography,
            content = content
        )
    }
}
