import React, { useState } from 'react';
import { View, Pressable, StyleSheet, ViewStyle, Platform, StyleProp, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface NeumorphicProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  borderRadius?: number;
  pressed?: boolean;
}

const getShadowColors = (isDark: boolean) => {
  if (isDark) {
    return {
      lightShadow: '#262626', // Lighter than card (#1A1A1A)
      darkShadow: '#0d0d0d',  // Darker than card (#1A1A1A)
    };
  } else {
    return {
      lightShadow: '#ffffff', // Lighter than background (#F9F9F9)
      darkShadow: '#d1d5db',  // Darker than background (#F9F9F9)
    };
  }
};

export const NeumorphicView: React.FC<NeumorphicProps> = ({ style, children, borderRadius = 16 }) => {
  const { colors, isDark } = useTheme();
  // Neumorphism works best when the component's background matches the screen's background!
  // In the CodeKick theme, the screen background is `colors.background`.
  const baseColor = colors.background; 
  
  const { lightShadow, darkShadow } = getShadowColors(isDark);

  if (Platform.OS === 'web') {
    return (
      <View style={[
        style, 
        {
          backgroundColor: baseColor,
          borderRadius,
          // @ts-ignore: web-only CSS prop
          boxShadow: `8px 8px 16px ${darkShadow}, -8px -8px 16px ${lightShadow}`
        }
      ]}>
        {children}
      </View>
    );
  }

  // Native: use shadow views behind, content on top with natural sizing
  return (
    <View style={[{ borderRadius }, style]}>
      {/* Light Shadow - Top Left */}
      <View style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: baseColor,
          borderRadius,
          shadowColor: lightShadow,
          shadowOffset: { width: -6, height: -6 },
          shadowOpacity: 1,
          shadowRadius: 8,
          elevation: isDark ? 2 : 4,
        }
      ]} />
      
      {/* Dark Shadow - Bottom Right */}
      <View style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: baseColor,
          borderRadius,
          shadowColor: darkShadow,
          shadowOffset: { width: 6, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 8,
          elevation: isDark ? 4 : 8,
        }
      ]} />
      
      {/* Content wrapper — NOT absolute, so it sizes based on children */}
      <View style={{ backgroundColor: baseColor, borderRadius, overflow: 'hidden' }}>
        {children}
      </View>
    </View>
  );
};

export const NeumorphicButton: React.FC<NeumorphicProps & { onPress: () => void, disabled?: boolean }> = ({ 
  style, 
  children, 
  borderRadius = 16,
  onPress,
  disabled
}) => {
  const { colors, isDark } = useTheme();
  const baseColor = colors.background; 
  const { lightShadow, darkShadow } = getShadowColors(isDark);

  const [isPressing, setIsPressing] = useState(false);

  const handlePressIn = () => setIsPressing(true);
  const handlePressOut = () => setIsPressing(false);

  // When pressed, we simulate an inset shadow or flat shape by reversing or removing shadows.
  if (Platform.OS === 'web') {
    return (
      <Pressable 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          style, 
          {
            backgroundColor: baseColor,
            borderRadius,
            opacity: disabled ? 0.6 : 1,
            // @ts-ignore
            boxShadow: isPressing 
              ? `inset 4px 4px 8px ${darkShadow}, inset -4px -4px 8px ${lightShadow}`
              : `6px 6px 12px ${darkShadow}, -6px -6px 12px ${lightShadow}`
          }
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[{ borderRadius, opacity: disabled ? 0.6 : 1 }, style]}
    >
      {!isPressing && (
        <>
          <View style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: baseColor,
              borderRadius,
              shadowColor: lightShadow,
              shadowOffset: { width: -5, height: -5 },
              shadowOpacity: 1,
              shadowRadius: 6,
            }
          ]} />
          <View style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: baseColor,
              borderRadius,
              shadowColor: darkShadow,
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 1,
              shadowRadius: 6,
            }
          ]} />
        </>
      )}
      <View style={[
        { backgroundColor: baseColor, borderRadius, overflow: 'hidden' },
        isPressing && { borderWidth: 2, borderColor: darkShadow + '50' }
      ]}>
        {children}
      </View>
    </Pressable>
  );
};
