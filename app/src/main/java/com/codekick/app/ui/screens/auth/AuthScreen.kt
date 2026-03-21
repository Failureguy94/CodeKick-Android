package com.codekick.app.ui.screens.auth

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle

/**
 * AuthScreen — port of Auth.tsx.
 *
 * Tabs: Sign In | Sign Up
 * Fields: username (validated) + password (+ full name for signup)
 * Uses username@codekick.local email trick to call Supabase auth.
 */
@Composable
fun AuthScreen(
    onAuthSuccess: (phoneVerified: Boolean) -> Unit,
    viewModel: AuthViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    var activeTab by remember { mutableStateOf(0) } // 0 = Sign In, 1 = Sign Up

    // Field states
    var username by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var fullName by remember { mutableStateOf("") }
    var passwordVisible by remember { mutableStateOf(false) }

    // Navigate on success
    LaunchedEffect(uiState.success) {
        if (uiState.success) {
            onAuthSuccess(uiState.phoneVerified)
            viewModel.clearState()
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
    ) {
        // Ambient glow
        Box(
            modifier = Modifier
                .size(800.dp)
                .align(Alignment.Center)
                .background(
                    MaterialTheme.colorScheme.onBackground.copy(alpha = 0.01f),
                    CircleShape
                )
        )

        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Spacer(Modifier.height(24.dp))

            // ── Header: "Welcome back" badge ─────────────────────────────────
            Surface(
                shape = CircleShape,
                color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
            ) {
                Row(
                    modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(6.dp)
                ) {
                    Icon(Icons.Outlined.AutoAwesome, null, modifier = Modifier.size(12.dp))
                    Text(
                        text = if (activeTab == 0) "Welcome back" else "Join us",
                        style = MaterialTheme.typography.labelSmall,
                        letterSpacing = 1.sp
                    )
                }
            }

            Spacer(Modifier.height(16.dp))

            // ── Logo text: "Code" + "Kick" ───────────────────────────────────
            Text(
                buildAnnotatedString {
                    withStyle(SpanStyle(fontWeight = FontWeight.Bold)) { append("Code") }
                    withStyle(SpanStyle(color = MaterialTheme.colorScheme.onBackground.copy(0.45f), fontWeight = FontWeight.Bold)) { append("Kick") }
                },
                style = MaterialTheme.typography.displaySmall
            )

            Spacer(Modifier.height(4.dp))
            Text(
                "Start your learning journey today",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(0.5f)
            )

            Spacer(Modifier.height(32.dp))

            // ── Auth Card ────────────────────────────────────────────────────
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f)
                )
            ) {
                Column(modifier = Modifier.padding(24.dp)) {

                    // Tab row
                    TabRow(
                        selectedTabIndex = activeTab,
                        containerColor = MaterialTheme.colorScheme.surface.copy(alpha = 0.5f),
                        contentColor = MaterialTheme.colorScheme.onBackground
                    ) {
                        Tab(
                            selected = activeTab == 0,
                            onClick = { activeTab = 0; viewModel.clearState() },
                            text = { Text("Sign In") }
                        )
                        Tab(
                            selected = activeTab == 1,
                            onClick = { activeTab = 1; viewModel.clearState() },
                            text = { Text("Sign Up") }
                        )
                    }

                    Spacer(Modifier.height(24.dp))

                    AnimatedContent(
                        targetState = activeTab,
                        transitionSpec = {
                            fadeIn(tween(300)) togetherWith fadeOut(tween(200))
                        },
                        label = "auth_tab"
                    ) { tab ->
                        Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {

                            // Full name (sign up only)
                            if (tab == 1) {
                                OutlinedTextField(
                                    value = fullName,
                                    onValueChange = { fullName = it },
                                    label = { Text("Full Name") },
                                    leadingIcon = { Icon(Icons.Outlined.Person, null) },
                                    modifier = Modifier.fillMaxWidth(),
                                    singleLine = true,
                                    shape = RoundedCornerShape(12.dp)
                                )
                            }

                            // Username field
                            OutlinedTextField(
                                value = username,
                                onValueChange = { username = it },
                                label = { Text("Username") },
                                placeholder = { Text("your_username") },
                                leadingIcon = { Icon(Icons.Outlined.AccountCircle, null) },
                                modifier = Modifier.fillMaxWidth(),
                                singleLine = true,
                                shape = RoundedCornerShape(12.dp),
                                supportingText = {
                                    Text(
                                        if (tab == 0) "Username is case-sensitive"
                                        else "Letters, numbers, underscores only",
                                        style = MaterialTheme.typography.bodySmall
                                    )
                                }
                            )

                            // Password field
                            OutlinedTextField(
                                value = password,
                                onValueChange = { password = it },
                                label = { Text("Password") },
                                leadingIcon = { Icon(Icons.Outlined.Lock, null) },
                                trailingIcon = {
                                    IconButton(onClick = { passwordVisible = !passwordVisible }) {
                                        Icon(
                                            if (passwordVisible) Icons.Outlined.VisibilityOff else Icons.Outlined.Visibility,
                                            contentDescription = "Toggle password visibility"
                                        )
                                    }
                                },
                                visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
                                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                                modifier = Modifier.fillMaxWidth(),
                                singleLine = true,
                                shape = RoundedCornerShape(12.dp)
                            )

                            // Error message
                            uiState.error?.let { err ->
                                Surface(
                                    color = MaterialTheme.colorScheme.errorContainer,
                                    shape = RoundedCornerShape(8.dp)
                                ) {
                                    Row(
                                        modifier = Modifier.padding(12.dp),
                                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                                        verticalAlignment = Alignment.CenterVertically
                                    ) {
                                        Icon(Icons.Outlined.Shield, null, modifier = Modifier.size(16.dp))
                                        Text(err, style = MaterialTheme.typography.bodySmall)
                                    }
                                }
                            }

                            // Submit button
                            Button(
                                onClick = {
                                    if (tab == 0) viewModel.signIn(username, password)
                                    else viewModel.signUp(username, fullName, password)
                                },
                                enabled = !uiState.isLoading,
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(52.dp),
                                shape = RoundedCornerShape(12.dp)
                            ) {
                                if (uiState.isLoading) {
                                    CircularProgressIndicator(
                                        modifier = Modifier.size(20.dp),
                                        strokeWidth = 2.dp,
                                        color = MaterialTheme.colorScheme.onPrimary
                                    )
                                } else {
                                    Text(if (tab == 0) "Sign In" else "Create Account")
                                    Spacer(Modifier.width(8.dp))
                                    Icon(Icons.Outlined.ArrowForward, null, modifier = Modifier.size(16.dp))
                                }
                            }
                        }
                    }
                }
            }

            Spacer(Modifier.height(32.dp))
        }
    }
}
