package com.codekick.app.ui.components

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.currentBackStackEntryAsState

/**
 * Top app bar — mirrors Navigation.kt component from the web.
 * Shows "CodeKick" logo, and the theme toggle icon.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CodeKickTopBar(
    isDark: Boolean,
    onThemeToggle: () -> Unit,
    onProfileClick: () -> Unit,
    isLoggedIn: Boolean
) {
    TopAppBar(
        title = {
            Text(
                buildAnnotatedString {
                    withStyle(SpanStyle(fontWeight = FontWeight.Bold)) { append("Code") }
                    withStyle(SpanStyle(color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.5f), fontWeight = FontWeight.Bold)) { append("Kick") }
                },
                style = MaterialTheme.typography.titleLarge
            )
        },
        actions = {
            IconButton(onClick = onThemeToggle) {
                Icon(
                    imageVector = if (isDark) Icons.Outlined.LightMode else Icons.Outlined.DarkMode,
                    contentDescription = "Toggle theme"
                )
            }
            if (isLoggedIn) {
                IconButton(onClick = onProfileClick) {
                    Icon(Icons.Outlined.AccountCircle, contentDescription = "Profile")
                }
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = MaterialTheme.colorScheme.background,
        )
    )
}

/**
 * Bottom navigation bar — mirrors the web Navigation.kt links.
 * Shows 5 tabs: Home, Domains, Learn, Track, Dashboard.
 */
@Composable
fun CodeKickBottomBar(navController: NavController, isLoggedIn: Boolean) {
    if (!isLoggedIn) return

    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val items = listOf(
        BottomNavItem("home", "Home", Icons.Outlined.Home),
        BottomNavItem("domains", "Domains", Icons.Outlined.GridView),
        BottomNavItem("learn", "Learn", Icons.Outlined.AutoStories),
        BottomNavItem("track", "Track", Icons.Outlined.Insights),
        BottomNavItem("dashboard", "Dashboard", Icons.Outlined.Dashboard),
    )

    NavigationBar(
        containerColor = MaterialTheme.colorScheme.surface,
        tonalElevation = 0.dp
    ) {
        items.forEach { item ->
            NavigationBarItem(
                icon = { Icon(item.icon, contentDescription = item.label) },
                label = { Text(item.label, style = MaterialTheme.typography.labelSmall) },
                selected = currentRoute == item.route,
                onClick = {
                    if (currentRoute != item.route) {
                        navController.navigate(item.route) {
                            popUpTo("home") { saveState = true }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                }
            )
        }
    }
}

data class BottomNavItem(
    val route: String,
    val label: String,
    val icon: androidx.compose.ui.graphics.vector.ImageVector
)
