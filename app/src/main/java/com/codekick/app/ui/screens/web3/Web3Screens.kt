package com.codekick.app.ui.screens.web3

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

val web3Modules = listOf(
    "Blockchain Fundamentals" to "Blocks, chains, consensus, wallets",
    "Smart Contracts with Solidity" to "ERC standards, events, gas",
    "Ethereum Development" to "Hardhat, Foundry, testing",
    "DeFi Protocols" to "Uniswap, Aave, lending/borrowing",
    "NFT Development" to "ERC-721, ERC-1155, metadata",
    "Web3 Frontend" to "ethers.js, wagmi, RainbowKit",
    "Security Auditing" to "Common vulnerabilities, reentrancy",
    "Layer 2 Scaling" to "Optimism, Arbitrum, zkSync",
)

val web3Insights = listOf(
    "Bitcoin" to "$71,000" to "+2.3%",
    "Ethereum" to "$3,800" to "+1.8%",
    "Solana" to "$180" to "+4.2%",
    "Polygon" to "$0.85" to "-0.5%",
)

/** Web3TrackScreen — mirrors /web3 */
@Composable
fun Web3TrackScreen(navController: NavController) {
    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            Text("Web3 Track", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
            Text("Blockchain & Decentralized Applications",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(0.5f))
            Spacer(Modifier.height(8.dp))
        }
        items(web3Modules.size) { index ->
            val (title, desc) = web3Modules[index]
            Card(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                    Surface(color = MaterialTheme.colorScheme.secondary.copy(0.15f), shape = RoundedCornerShape(8.dp)) {
                        Text("${index + 1}", modifier = Modifier.padding(10.dp), fontWeight = FontWeight.Bold,
                            color = MaterialTheme.colorScheme.secondary, style = MaterialTheme.typography.bodyMedium)
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text(title, fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.bodyMedium)
                        Text(desc, style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                }
            }
        }
        item {
            OutlinedButton(onClick = { navController.navigate("web3/insights") },
                modifier = Modifier.fillMaxWidth().height(52.dp), shape = RoundedCornerShape(12.dp)) {
                Icon(Icons.Outlined.TrendingUp, null, modifier = Modifier.size(18.dp))
                Spacer(Modifier.width(8.dp))
                Text("Market Insights")
            }
        }
    }
}

/** Web3InsightsScreen — mirrors /web3/insights */
@Composable
fun Web3InsightsScreen(navController: NavController) {
    LazyColumn(
        modifier = Modifier.fillMaxSize().background(MaterialTheme.colorScheme.background),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp)
    ) {
        item {
            Text("Web3 Market Insights", style = MaterialTheme.typography.headlineMedium.copy(fontWeight = FontWeight.Bold))
            Text("Live crypto prices & trends", style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onBackground.copy(0.5f))
            Spacer(Modifier.height(8.dp))
        }
        items(web3Insights) { (pair, change) ->
            val (name, price) = pair
            val isPositive = change.startsWith("+")
            Card(modifier = Modifier.fillMaxWidth(), shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)) {
                Row(modifier = Modifier.padding(16.dp), verticalAlignment = Alignment.CenterVertically) {
                    Icon(Icons.Outlined.CurrencyBitcoin, null, tint = MaterialTheme.colorScheme.secondary)
                    Spacer(Modifier.width(12.dp))
                    Column(modifier = Modifier.weight(1f)) {
                        Text(name, fontWeight = FontWeight.SemiBold, style = MaterialTheme.typography.bodyMedium)
                        Text(price, style = MaterialTheme.typography.bodySmall,
                            color = MaterialTheme.colorScheme.onSurfaceVariant)
                    }
                    Text(change,
                        color = if (isPositive) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.error,
                        fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}
