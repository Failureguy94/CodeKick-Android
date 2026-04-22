import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { useLearnStore } from '../store/learnStore';
import { focusAreas } from '../utils/constants';

// ─── LearnTopicScreen — mirrors LearnTopicScreen.kt ─────────────────────────

const LearnTopicScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { colors } = useTheme();
  const {
    isGenerating, generatedNotes, videoSuggestions, currentTopic,
    error, isSaved, generateNotes, saveCurrentTopic, clearNotes,
  } = useLearnStore();
  const [topicInput, setTopicInput] = useState('');
  const [selectedFocus, setSelectedFocus] = useState<string | null>(null);

  const openYouTubeSearch = (query: string) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.title, { color: colors.foreground }]}>Learn a Topic</Text>
      <Text style={[styles.subtitle, { color: colors.foreground + '80' }]}>
        Enter any topic and get AI-generated notes instantly
      </Text>

      {/* Search input */}
      <View style={[styles.inputContainer, { borderColor: colors.border }]}>
        <Ionicons name="search" size={18} color={colors.muted} style={styles.inputIcon} />
        <TextInput
          value={topicInput}
          onChangeText={setTopicInput}
          placeholder="e.g. Binary Search Trees, Neural Networks..."
          placeholderTextColor={colors.muted}
          style={[styles.input, { color: colors.foreground }]}
        />
        {topicInput.length > 0 && (
          <TouchableOpacity onPress={() => { setTopicInput(''); clearNotes(); }}>
            <Ionicons name="close" size={20} color={colors.muted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Focus area chips */}
      <Text style={[styles.focusLabel, { color: colors.foreground }]}>Focus Area</Text>
      <View style={styles.chipRow}>
        {focusAreas.slice(0, 3).map((area) => (
          <TouchableOpacity
            key={area}
            style={[
              styles.chip,
              {
                backgroundColor: selectedFocus === area ? colors.primary : colors.card,
                borderColor: selectedFocus === area ? colors.primary : colors.border,
              },
            ]}
            onPress={() => setSelectedFocus(selectedFocus === area ? null : area)}
          >
            <Text style={{ color: selectedFocus === area ? colors.onPrimary : colors.foreground, fontSize: 12 }}>
              {area}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.chipRow}>
        {focusAreas.slice(3).map((area) => (
          <TouchableOpacity
            key={area}
            style={[
              styles.chip,
              {
                backgroundColor: selectedFocus === area ? colors.primary : colors.card,
                borderColor: selectedFocus === area ? colors.primary : colors.border,
              },
            ]}
            onPress={() => setSelectedFocus(selectedFocus === area ? null : area)}
          >
            <Text style={{ color: selectedFocus === area ? colors.onPrimary : colors.foreground, fontSize: 12 }}>
              {area}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Generate button */}
      <TouchableOpacity
        style={[
          styles.generateBtn,
          { backgroundColor: colors.primary, opacity: !topicInput.trim() || isGenerating ? 0.5 : 1 },
        ]}
        onPress={() => generateNotes(topicInput, selectedFocus || undefined)}
        disabled={!topicInput.trim() || isGenerating}
      >
        {isGenerating ? (
          <>
            <ActivityIndicator size="small" color={colors.onPrimary} />
            <Text style={[styles.generateText, { color: colors.onPrimary }]}>Generating notes...</Text>
          </>
        ) : (
          <>
            <Ionicons name="sparkles" size={18} color={colors.onPrimary} />
            <Text style={[styles.generateText, { color: colors.onPrimary }]}>Generate Notes</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Error */}
      {error && (
        <View style={[styles.errorBox, { backgroundColor: colors.accent.red + '20' }]}>
          <Ionicons name="alert-circle-outline" size={16} color={colors.accent.red} />
          <Text style={[styles.errorText, { color: colors.accent.red }]}>{error}</Text>
        </View>
      )}

      {/* Generated notes */}
      {generatedNotes.length > 0 && (
        <View style={[styles.notesCard, { backgroundColor: colors.card }]}>
          <View style={styles.notesHeader}>
            <Text style={[styles.notesTopic, { color: colors.foreground }]}>{currentTopic}</Text>
            <TouchableOpacity
              style={[styles.saveBtn, { backgroundColor: colors.surface }]}
              onPress={saveCurrentTopic}
              disabled={isSaved}
            >
              <Ionicons
                name={isSaved ? 'checkmark-circle-outline' : 'bookmark-outline'}
                size={16}
                color={isSaved ? colors.accent.green : colors.foreground}
              />
              <Text style={{ color: isSaved ? colors.accent.green : colors.foreground, fontSize: 12 }}>
                {isSaved ? 'Saved!' : 'Save Topic'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.notesDivider, { backgroundColor: colors.border }]} />
          <Text style={[styles.notesBody, { color: colors.foreground }]}>{generatedNotes}</Text>
        </View>
      )}

      {/* Video Suggestions */}
      {videoSuggestions.length > 0 && (
        <View style={{ gap: 8 }}>
          <Text style={[styles.videoSectionTitle, { color: colors.foreground }]}>
            📺 Recommended Videos
          </Text>
          {videoSuggestions.map((video, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.videoCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => openYouTubeSearch(video.searchQuery)}
              activeOpacity={0.7}
            >
              <View style={[styles.videoIcon, { backgroundColor: '#FF0000' + '20' }]}>
                <Ionicons name="logo-youtube" size={22} color="#FF0000" />
              </View>
              <View style={styles.videoInfo}>
                <Text style={[styles.videoTitle, { color: colors.foreground }]} numberOfLines={2}>
                  {video.title}
                </Text>
                <Text style={[styles.videoHint, { color: colors.muted }]}>
                  Tap to search on YouTube
                </Text>
              </View>
              <Ionicons name="open-outline" size={16} color={colors.muted} />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 16, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 14 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, height: 52 },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 14 },
  focusLabel: { fontSize: 14, fontWeight: '500' },
  chipRow: { flexDirection: 'row', gap: 8 },
  chip: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1 },
  generateBtn: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 12, height: 52, gap: 8 },
  generateText: { fontSize: 14, fontWeight: '500' },
  errorBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, padding: 12, gap: 8 },
  errorText: { fontSize: 12, flex: 1 },
  notesCard: { borderRadius: 16, padding: 16 },
  notesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  notesTopic: { fontSize: 16, fontWeight: '700', flex: 1 },
  saveBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  notesDivider: { height: 1, marginVertical: 8 },
  notesBody: { fontSize: 14, lineHeight: 22 },
  videoSectionTitle: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    gap: 12,
  },
  videoIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoInfo: { flex: 1 },
  videoTitle: { fontSize: 13, fontWeight: '600' },
  videoHint: { fontSize: 11, marginTop: 2 },
});

export default LearnTopicScreen;
