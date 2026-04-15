import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useAuthStore } from '../store/authStore';
import AnimatedBackground from '../components/AnimatedBackground';

// ─── HomeScreen — mirrors HomeScreen.kt ─────────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  // Animated underline
  const underlineWidth = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.timing(underlineWidth, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }, 1200);
    return () => clearTimeout(timeout);
  }, [underlineWidth]);

  // Scroll indicator bounce
  const scrollY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scrollY, {
          toValue: 8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scrollY, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [scrollY]);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigation.navigate('Domains');
    } else {
      navigation.navigate('Auth');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AnimatedBackground />

      {/* Ambient glow */}
      <View
        style={[
          styles.ambientGlow,
          { backgroundColor: colors.foreground + '09' },
        ]}
      />

      {/* Main content */}
      <View style={styles.content}>
        {/* Badge */}
        <View style={[styles.badge, { backgroundColor: colors.card + '80' }]}>
          <Ionicons name="sparkles" size={14} color={colors.muted} />
          <Text style={[styles.badgeText, { color: colors.muted }]}>
            Start your tech journey
          </Text>
        </View>

        {/* Hero heading */}
        <Text style={[styles.welcomeText, { color: colors.foreground }]}>
          Welcome to
        </Text>

        <View style={styles.codeKickRow}>
          <View>
            <Text style={[styles.heroText, { color: colors.foreground }]}>
              Code
              <Text style={{ color: colors.foreground + '73' }}>Kick</Text>
            </Text>
            <Animated.View
              style={[
                styles.underline,
                {
                  backgroundColor: colors.primary,
                  width: underlineWidth.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 100],
                  }),
                },
              ]}
            />
          </View>
        </View>

        {/* Divider */}
        <View style={[styles.divider, { backgroundColor: colors.border + '66' }]} />

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: colors.foreground + '99' }]}>
          Your journey into tech starts here. Discover the perfect domain for
          your skills and passions with our guided learning paths.
        </Text>

        {/* CTA Button */}
        <TouchableOpacity
          style={[styles.ctaButton, { backgroundColor: colors.primary }]}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={[styles.ctaText, { color: colors.onPrimary }]}>
            {isLoggedIn ? 'Go to Domains' : 'Get Started'}
          </Text>
          <Ionicons name="arrow-forward" size={18} color={colors.onPrimary} />
        </TouchableOpacity>

        {/* Secondary link */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Discover')}
          style={styles.exploreButton}
        >
          <Text style={[styles.exploreText, { color: colors.foreground + '80' }]}>
            Explore learning paths →
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scroll indicator */}
      <Animated.View
        style={[
          styles.scrollIndicator,
          { transform: [{ translateY: scrollY }] },
        ]}
      >
        <Text style={[styles.scrollText, { color: colors.foreground + '66' }]}>
          SCROLL
        </Text>
        <View style={[styles.scrollLine, { borderLeftColor: colors.foreground + '66' }]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ambientGlow: {
    position: 'absolute',
    width: 600,
    height: 600,
    borderRadius: 300,
    left: -80,
    top: 80,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
    marginBottom: 32,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: '700',
  },
  heroText: {
    fontSize: 48,
    fontWeight: '700',
  },
  codeKickRow: {
    marginTop: 4,
  },
  underline: {
    height: 3,
    marginTop: 4,
    borderRadius: 2,
  },
  divider: {
    width: 80,
    height: 1,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 24,
    maxWidth: 440,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 28,
    height: 56,
    paddingHorizontal: 32,
    marginTop: 40,
    gap: 8,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
  },
  exploreButton: {
    marginTop: 16,
    padding: 8,
  },
  exploreText: {
    fontSize: 14,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    alignItems: 'center',
  },
  scrollText: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 3,
  },
  scrollLine: {
    width: 0,
    height: 32,
    borderLeftWidth: 1,
    marginTop: 4,
  },
});

export default HomeScreen;
