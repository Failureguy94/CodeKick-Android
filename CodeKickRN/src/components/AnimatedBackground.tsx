import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

// ─── Animated Background — mirrors AnimatedBackground.kt ────────────────────

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const icons: Array<keyof typeof Ionicons.glyphMap> = [
  'code-slash',
  'hardware-chip',
  'globe',
  'server',
  'git-branch',
  'terminal',
];

const positions = [
  { x: 0.08, y: 0.25 },
  { x: 0.88, y: 0.18 },
  { x: 0.12, y: 0.72 },
  { x: 0.85, y: 0.70 },
  { x: 0.50, y: 0.12 },
  { x: 0.45, y: 0.82 },
];

interface FloatingIconProps {
  name: keyof typeof Ionicons.glyphMap;
  x: number;
  y: number;
  duration: number;
  color: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ name, x, y, duration, color }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 15,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [duration, translateY]);

  return (
    <Animated.View
      style={[
        styles.iconContainer,
        {
          left: x * SCREEN_WIDTH - 24,
          top: y * SCREEN_HEIGHT - 24,
          transform: [{ translateY }],
        },
      ]}
    >
      <Ionicons name={name} size={48} color={color} />
    </Animated.View>
  );
};

const AnimatedBackground: React.FC = () => {
  const { colors } = useTheme();
  const iconColor = colors.foreground + '1F'; // 0.12 alpha

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {icons.map((icon, i) => (
        <FloatingIcon
          key={i}
          name={icon}
          x={positions[i].x}
          y={positions[i].y}
          duration={5000 + i * 1500}
          color={iconColor}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    opacity: 0.6,
  },
});

export default AnimatedBackground;
