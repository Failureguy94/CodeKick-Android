import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

// ─── AI Chatbot FAB — mirrors AIChatbotFab.kt ──────────────────────────────

const AIChatbotFab: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useTheme();
  const scale = useRef(new Animated.Value(1)).current;

  const toggleExpanded = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    });
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      {expanded && (
        <View
          style={[
            styles.overlay,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <View style={styles.overlayHeader}>
            <Text style={[styles.overlayTitle, { color: colors.foreground }]}>
              AI Assistant
            </Text>
            <TouchableOpacity onPress={() => setExpanded(false)}>
              <Ionicons name="close" size={24} color={colors.muted} />
            </TouchableOpacity>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.overlayBody}>
            <Text style={[styles.placeholderText, { color: colors.muted }]}>
              Ask me anything about coding...
            </Text>
          </View>
        </View>
      )}

      <Animated.View style={{ transform: [{ scale }] }}>
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={toggleExpanded}
          activeOpacity={0.8}
        >
          <Ionicons
            name={expanded ? 'close' : 'sparkles'}
            size={24}
            color={colors.onPrimary}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  overlay: {
    width: Dimensions.get('window').width - 48,
    height: 400,
    borderRadius: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  overlayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  overlayTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
  overlayBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholderText: {
    fontSize: 14,
  },
});

export default AIChatbotFab;
