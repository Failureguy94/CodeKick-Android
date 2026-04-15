import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { Domain } from '../types';

// ─── FlipCard — mirrors DomainFlipCard in DomainsScreen.kt ──────────────────
// Uses Animated API with rotateY for 3D card flip effect.

interface FlipCardProps {
  domain: Domain;
  onNavigate: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ domain, onNavigate }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { colors } = useTheme();
  const flipAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (isFlipped) {
      onNavigate();
    } else {
      setIsFlipped(true);
      Animated.timing(flipAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleFlipBack = () => {
    setIsFlipped(false);
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const frontRotation = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backRotation = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [1, 1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: [0, 0, 1, 1],
  });

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={handlePress}
      onLongPress={isFlipped ? handleFlipBack : undefined}
    >
      {/* Front Face */}
      <Animated.View
        style={[
          styles.face,
          {
            transform: [{ perspective: 1000 }, { rotateY: frontRotation }],
            opacity: frontOpacity,
          },
        ]}
      >
        <LinearGradient
          colors={domain.gradient as [string, string]}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Ionicons name={domain.icon as any} size={56} color="#FFFFFF" />
          <Text style={styles.frontName}>{domain.name}</Text>
          <Text style={styles.frontDesc}>{domain.description}</Text>
        </LinearGradient>
      </Animated.View>

      {/* Back Face */}
      <Animated.View
        style={[
          styles.face,
          styles.backFace,
          {
            backgroundColor: colors.card,
            transform: [{ perspective: 1000 }, { rotateY: backRotation }],
            opacity: backOpacity,
          },
        ]}
      >
        <View style={styles.backContent}>
          <Text style={[styles.backTitle, { color: colors.foreground }]}>
            {domain.name} Overview
          </Text>

          <Text style={[styles.sectionLabel, { color: colors.accent.green }]}>
            ✅ Advantages:
          </Text>
          {domain.advantages.map((adv, i) => (
            <Text key={i} style={[styles.listItem, { color: colors.muted }]}>
              • {adv}
            </Text>
          ))}

          <Text style={[styles.sectionLabel, { color: colors.accent.red }]}>
            ⚠️ Disadvantages:
          </Text>
          {domain.disadvantages.map((dis, i) => (
            <Text key={i} style={[styles.listItem, { color: colors.muted }]}>
              • {dis}
            </Text>
          ))}

          <Text style={[styles.salaryText, { color: colors.foreground }]}>
            💰 {domain.salary}
          </Text>
          <Text style={[styles.listItem, { color: colors.muted }]}>
            ⏱ {domain.timeToMaster}
          </Text>

          <Text style={[styles.tapHint, { color: colors.accent.indigo }]}>
            Tap again to explore →
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 320,
  },
  face: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },
  backFace: {
    borderRadius: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
  },
  frontName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
  },
  frontDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  backContent: {
    padding: 16,
    flex: 1,
  },
  backTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  listItem: {
    fontSize: 12,
    lineHeight: 18,
  },
  salaryText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  tapHint: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
});

export default FlipCard;
