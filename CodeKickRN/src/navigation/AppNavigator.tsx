import React from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useAuthStore } from '../store/authStore';
import TopBar from '../components/TopBar';
import AIChatbotFab from '../components/AIChatbotFab';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import VerifyPhoneScreen from '../screens/VerifyPhoneScreen';
import DomainsScreen from '../screens/DomainsScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LearnTopicScreen from '../screens/LearnTopicScreen';
import TrackScreen from '../screens/TrackScreen';
import MyTopicsScreen from '../screens/MyTopicsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
// CP
import CPLanguageScreen from '../screens/cp/CPLanguageScreen';
import CPLevelScreen from '../screens/cp/CPLevelScreen';
import CPResourcesScreen from '../screens/cp/CPResourcesScreen';
import CPBlogsScreen from '../screens/cp/CPBlogsScreen';
// AIML
import AimlOverviewScreen from '../screens/aiml/AimlOverviewScreen';
import AimlStepScreen from '../screens/aiml/AimlStepScreen';
import AimlPapersScreen from '../screens/aiml/AimlPapersScreen';
// Web3
import Web3TrackScreen from '../screens/web3/Web3TrackScreen';
import Web3InsightsScreen from '../screens/web3/Web3InsightsScreen';
// Web2
import Web2TrackScreen from '../screens/web2/Web2TrackScreen';

// ─── Navigation Structure — mirrors NavGraph.kt ─────────────────────────────

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type IoniconsName = keyof typeof Ionicons.glyphMap;

const tabIcons: Record<string, { active: IoniconsName; inactive: IoniconsName }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Domains: { active: 'grid', inactive: 'grid-outline' },
  Learn: { active: 'flask', inactive: 'flask-outline' },
  Track: { active: 'analytics', inactive: 'analytics-outline' },
  Dashboard: { active: 'stats-chart', inactive: 'stats-chart-outline' },
};

const MainTabs: React.FC = () => {
  const { colors } = useTheme();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = tabIcons[route.name] || tabIcons.Home;
          return (
            <Ionicons
              name={focused ? icons.active : icons.inactive}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: colors.foreground,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 6,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500' as const,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Domains" component={DomainsScreen} />
      {isLoggedIn && <Tab.Screen name="Learn" component={LearnTopicScreen} />}
      {isLoggedIn && <Tab.Screen name="Track" component={TrackScreen} />}
      {isLoggedIn && <Tab.Screen name="Dashboard" component={DashboardScreen} />}
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const { colors, isDark } = useTheme();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.background,
      text: colors.foreground,
      border: colors.border,
      primary: colors.secondary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main">
          {() => (
            <View style={{ flex: 1, backgroundColor: colors.background }}>
              <TopBar
                isLoggedIn={isLoggedIn}
                onProfilePress={() => {}}
              />
              <View style={{ flex: 1 }}>
                <MainTabs />
              </View>
              {isLoggedIn && <AIChatbotFab />}
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: true,
            headerTitle: 'Profile',
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.foreground,
          }}
        />
        <Stack.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{
            headerShown: true,
            headerTitle: 'Discover',
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.foreground,
          }}
        />
        <Stack.Screen
          name="MyTopics"
          component={MyTopicsScreen}
          options={{
            headerShown: true,
            headerTitle: 'My Topics',
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.foreground,
          }}
        />
        {/* CP Track */}
        <Stack.Screen name="CPLanguage" component={CPLanguageScreen}
          options={{ headerShown: true, headerTitle: 'CP/DSA', headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground }} />
        <Stack.Screen name="CPLevel" component={CPLevelScreen}
          options={{ headerShown: true, headerTitle: 'Select Level', headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground }} />
        <Stack.Screen name="CPResources" component={CPResourcesScreen}
          options={{ headerShown: true, headerTitle: 'Resources', headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground }} />
        <Stack.Screen name="CPBlogs" component={CPBlogsScreen}
          options={{ headerShown: true, headerTitle: 'Daily Blogs', headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground }} />
        {/* AIML Track */}
        <Stack.Screen name="AimlOverview" component={AimlOverviewScreen}
          options={{ headerShown: true, headerTitle: 'AI/ML', headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground }} />
        <Stack.Screen name="AimlStep" component={AimlStepScreen}
          options={{ headerShown: true, headerTitle: 'Step Details', headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground }} />
        <Stack.Screen name="AimlPapers" component={AimlPapersScreen}
          options={{ headerShown: true, headerTitle: 'Research Papers', headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground }} />
        {/* Web3 Track */}
        <Stack.Screen name="Web3Track" component={Web3TrackScreen}
          options={{ headerShown: true, headerTitle: 'Web3', headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground }} />
        <Stack.Screen name="Web3Insights" component={Web3InsightsScreen}
          options={{ headerShown: true, headerTitle: 'Market Insights', headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground }} />
        {/* Web2 Track */}
        <Stack.Screen name="Web2Track" component={Web2TrackScreen}
          options={{ headerShown: true, headerTitle: 'Web2', headerBackTitle: 'Back',
            headerStyle: { backgroundColor: colors.background }, headerTintColor: colors.foreground }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
