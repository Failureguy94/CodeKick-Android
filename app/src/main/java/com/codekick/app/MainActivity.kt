package com.codekick.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.compose.rememberNavController
import com.codekick.app.ui.NavGraph
import com.codekick.app.ui.components.AIChatbotFab
import com.codekick.app.ui.components.CodeKickBottomBar
import com.codekick.app.ui.components.CodeKickTopBar
import com.codekick.app.ui.screens.auth.AuthViewModel
import com.codekick.app.ui.theme.CodeKickTheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val authViewModel: AuthViewModel = hiltViewModel()
            val isLoggedIn by authViewModel.isLoggedIn.collectAsStateWithLifecycle()
            var isDarkTheme by remember { mutableStateOf(true) }
            val navController = rememberNavController()

            CodeKickTheme(darkTheme = isDarkTheme) {
                Scaffold(
                    topBar = {
                        CodeKickTopBar(
                            isDark = isDarkTheme,
                            onThemeToggle = { isDarkTheme = !isDarkTheme },
                            onProfileClick = { navController.navigate("profile") },
                            isLoggedIn = isLoggedIn
                        )
                    },
                    bottomBar = {
                        CodeKickBottomBar(navController = navController, isLoggedIn = isLoggedIn)
                    },
                    floatingActionButton = {
                        if (isLoggedIn) {
                            AIChatbotFab()
                        }
                    }
                ) { paddingValues ->
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(paddingValues)
                    ) {
                        NavGraph(navController = navController, authViewModel = authViewModel)
                    }
                }
            }
        }
    }
}
