package com.codekick.app.ui

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import androidx.navigation.NavType
import com.codekick.app.ui.screens.aiml.AimlOverviewScreen
import com.codekick.app.ui.screens.aiml.AimlResearchPapersScreen
import com.codekick.app.ui.screens.aiml.AimlStepScreen
import com.codekick.app.ui.screens.auth.AuthScreen
import com.codekick.app.ui.screens.auth.AuthViewModel
import com.codekick.app.ui.screens.auth.VerifyPhoneScreen
import com.codekick.app.ui.screens.cp.CP_DailyBlogsScreen
import com.codekick.app.ui.screens.cp.CP_LanguageSelectionScreen
import com.codekick.app.ui.screens.cp.CP_ProficiencyLevelScreen
import com.codekick.app.ui.screens.cp.CP_ResourcesScreen
import com.codekick.app.ui.screens.dashboard.DashboardScreen
import com.codekick.app.ui.screens.discover.DiscoverScreen
import com.codekick.app.ui.screens.domains.DomainsScreen
import com.codekick.app.ui.screens.home.HomeScreen
import com.codekick.app.ui.screens.learn.LearnTopicScreen
import com.codekick.app.ui.screens.mytopics.MyTopicsScreen
import com.codekick.app.ui.screens.profile.ProfileScreen
import com.codekick.app.ui.screens.track.TrackScreen
import com.codekick.app.ui.screens.web2.Web2TrackScreen
import com.codekick.app.ui.screens.web3.Web3InsightsScreen
import com.codekick.app.ui.screens.web3.Web3TrackScreen

// ─── Route constants — mirror App.tsx route paths ───────────────────────────
object Routes {
    const val HOME = "home"
    const val AUTH = "auth"
    const val VERIFY_PHONE = "verify_phone"
    const val PROFILE = "profile"
    const val DOMAINS = "domains"
    const val DISCOVER = "discover"
    const val DASHBOARD = "dashboard"
    const val LEARN = "learn"
    const val MY_TOPICS = "my_topics"
    const val TRACK = "track"

    // CP track
    const val CP = "cp"
    const val CP_LEVEL = "cp/{language}/level"
    const val CP_RESOURCES = "cp/{language}/{level}"
    const val CP_BLOGS = "cp/blogs"

    // AI/ML track
    const val AIML = "aiml"
    const val AIML_STEP = "aiml/step/{step}"
    const val AIML_PAPERS = "aiml/papers"

    // Web3 track
    const val WEB3 = "web3"
    const val WEB3_INSIGHTS = "web3/insights"

    // Web2 track
    const val WEB2 = "web2"
}

@Composable
fun NavGraph(
    navController: NavHostController,
    authViewModel: AuthViewModel = hiltViewModel()
) {
    val isLoggedIn by authViewModel.isLoggedIn.collectAsStateWithLifecycle()

    NavHost(
        navController = navController,
        startDestination = Routes.HOME
    ) {
        // ── Public routes ────────────────────────────────────────────────────
        composable(Routes.HOME) {
            HomeScreen(
                isLoggedIn = isLoggedIn,
                onGetStarted = {
                    navController.navigate(if (isLoggedIn) Routes.DOMAINS else Routes.AUTH)
                },
                onExplore = { navController.navigate(Routes.DISCOVER) }
            )
        }

        composable(Routes.AUTH) {
            AuthScreen(
                onAuthSuccess = { phoneVerified ->
                    if (phoneVerified) navController.navigate(Routes.HOME) { popUpTo(0) }
                    else navController.navigate(Routes.VERIFY_PHONE) { popUpTo(0) }
                }
            )
        }

        composable(Routes.VERIFY_PHONE) {
            VerifyPhoneScreen(onVerified = {
                navController.navigate(Routes.HOME) { popUpTo(0) }
            })
        }

        // ── Protected routes ─────────────────────────────────────────────────
        composable(Routes.PROFILE) {
            if (isLoggedIn) ProfileScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        composable(Routes.DOMAINS) {
            if (isLoggedIn) DomainsScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        composable(Routes.DISCOVER) {
            if (isLoggedIn) DiscoverScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        composable(Routes.DASHBOARD) {
            if (isLoggedIn) DashboardScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        composable(Routes.LEARN) {
            if (isLoggedIn) LearnTopicScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        composable(Routes.MY_TOPICS) {
            if (isLoggedIn) MyTopicsScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        composable(Routes.TRACK) {
            if (isLoggedIn) TrackScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        // ── CP/DSA track ─────────────────────────────────────────────────────
        composable(Routes.CP) {
            if (isLoggedIn) CP_LanguageSelectionScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        composable(
            route = Routes.CP_LEVEL,
            arguments = listOf(navArgument("language") { type = NavType.StringType })
        ) { backStack ->
            val language = backStack.arguments?.getString("language") ?: ""
            if (isLoggedIn) CP_ProficiencyLevelScreen(navController, language)
            else navController.navigate(Routes.AUTH)
        }

        composable(
            route = Routes.CP_RESOURCES,
            arguments = listOf(
                navArgument("language") { type = NavType.StringType },
                navArgument("level") { type = NavType.StringType }
            )
        ) { backStack ->
            val language = backStack.arguments?.getString("language") ?: ""
            val level = backStack.arguments?.getString("level") ?: ""
            if (isLoggedIn) CP_ResourcesScreen(navController, language, level)
            else navController.navigate(Routes.AUTH)
        }

        composable(Routes.CP_BLOGS) {
            if (isLoggedIn) CP_DailyBlogsScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        // ── AI/ML track ──────────────────────────────────────────────────────
        composable(Routes.AIML) {
            if (isLoggedIn) AimlOverviewScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        composable(
            route = Routes.AIML_STEP,
            arguments = listOf(navArgument("step") { type = NavType.StringType })
        ) { backStack ->
            val step = backStack.arguments?.getString("step") ?: "1"
            if (isLoggedIn) AimlStepScreen(navController, step)
            else navController.navigate(Routes.AUTH)
        }

        composable(Routes.AIML_PAPERS) {
            if (isLoggedIn) AimlResearchPapersScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        // ── Web3 track ───────────────────────────────────────────────────────
        composable(Routes.WEB3) {
            if (isLoggedIn) Web3TrackScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        composable(Routes.WEB3_INSIGHTS) {
            if (isLoggedIn) Web3InsightsScreen(navController)
            else navController.navigate(Routes.AUTH)
        }

        // ── Web2 track ───────────────────────────────────────────────────────
        composable(Routes.WEB2) {
            if (isLoggedIn) Web2TrackScreen(navController)
            else navController.navigate(Routes.AUTH)
        }
    }
}
