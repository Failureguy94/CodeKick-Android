import React, { useState, useRef } from 'react';
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
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import MarkdownRenderer from './MarkdownRenderer';

// ─── AI Chatbot — triggered from center tab button ──────────────────────────

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface AIChatbotFabProps {
  visible: boolean;
  onClose: () => void;
}

const AIChatbotFab: React.FC<AIChatbotFabProps> = ({ visible, onClose }) => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! 👋 I\'m your CodeKick AI assistant. Ask me anything about coding, algorithms, tech concepts, or career guidance!',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Scroll to bottom
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);

    // Call Gemini API with conversation history
    try {
      const { chatWithAI } = await import('../services/gemini');
      // Build conversation history (skip the initial welcome message)
      const history = newMessages
        .filter((m) => m.id !== '1')
        .map((m) => ({
          role: (m.isUser ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.text,
        }));

      const response = await chatWithAI(history);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      // Fallback to pattern-matched responses
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input.trim()),
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={[styles.container, { backgroundColor: colors.background }]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <View style={styles.headerLeft}>
            <View style={[styles.aiAvatar, { backgroundColor: colors.primary }]}>
              <Ionicons name="sparkles" size={18} color={colors.onPrimary} />
            </View>
            <View>
              <Text style={[styles.headerTitle, { color: colors.foreground }]}>
                AI Assistant
              </Text>
              <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
                Powered by CodeKick
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={onClose}
            style={[styles.closeButton, { backgroundColor: colors.card }]}
          >
            <Ionicons name="close" size={22} color={colors.foreground} />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.messageList}
          contentContainerStyle={styles.messageContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.isUser
                  ? [styles.userBubble, { backgroundColor: colors.primary }]
                  : [styles.aiBubble, { backgroundColor: colors.card, borderColor: colors.border }],
              ]}
            >
              {!msg.isUser && (
                <Ionicons
                  name="sparkles"
                  size={14}
                  color={colors.primary}
                  style={styles.aiIcon}
                />
              )}
              {msg.isUser ? (
                <Text
                  style={[
                    styles.messageText,
                    { color: colors.onPrimary },
                  ]}
                >
                  {msg.text}
                </Text>
              ) : (
                <MarkdownRenderer content={msg.text} />
              )}
            </View>
          ))}
          {isTyping && (
            <View
              style={[
                styles.messageBubble,
                styles.aiBubble,
                { backgroundColor: colors.card, borderColor: colors.border },
              ]}
            >
              <Ionicons name="sparkles" size={14} color={colors.primary} style={styles.aiIcon} />
              <Text style={[styles.messageText, { color: colors.muted }]}>
                Thinking...
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Input Bar */}
        <View style={[styles.inputBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Ask anything about coding..."
            placeholderTextColor={colors.muted}
            style={[styles.textInput, { color: colors.foreground, backgroundColor: colors.background, borderColor: colors.border }]}
            onSubmitEditing={handleSend}
            returnKeyType="send"
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: input.trim() ? colors.primary : colors.border }]}
            onPress={handleSend}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={18} color={input.trim() ? colors.onPrimary : colors.muted} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

/** Simple pattern-matched responses — replace with real Gemini API later */
function getAIResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return 'Hello! How can I help you with coding today? 🚀';
  }
  if (q.includes('dsa') || q.includes('data structure')) {
    return '📚 DSA is fundamental! Start with:\n\n1. Arrays & Strings\n2. Linked Lists\n3. Stacks & Queues\n4. Trees & Graphs\n5. Dynamic Programming\n\nPractice on LeetCode, CodeForces, or HackerRank. Start with Easy problems and work up!';
  }
  if (q.includes('react') || q.includes('javascript') || q.includes('web')) {
    return '🌐 Great choice! For web development:\n\n1. HTML/CSS basics\n2. JavaScript fundamentals\n3. React or Next.js\n4. Node.js backend\n5. Databases (PostgreSQL/MongoDB)\n\nBuild projects to learn fastest!';
  }
  if (q.includes('python') || q.includes('ai') || q.includes('machine learning') || q.includes('ml')) {
    return '🤖 AI/ML is exciting! Roadmap:\n\n1. Python fundamentals\n2. NumPy, Pandas, Matplotlib\n3. Scikit-learn (classical ML)\n4. Deep Learning (PyTorch/TensorFlow)\n5. NLP or Computer Vision\n\nStart with Andrew Ng\'s courses on Coursera!';
  }
  if (q.includes('web3') || q.includes('blockchain') || q.includes('crypto')) {
    return '⛓️ Web3 roadmap:\n\n1. Solidity basics\n2. Smart contract development\n3. Hardhat/Foundry tools\n4. DeFi concepts\n5. Frontend with ethers.js/wagmi\n\nBuild on testnets first!';
  }
  if (q.includes('career') || q.includes('job') || q.includes('interview')) {
    return '💼 Career tips:\n\n1. Build 3-5 solid projects\n2. Practice DSA (150+ problems)\n3. Contribute to open source\n4. Network on LinkedIn/Twitter\n5. Prepare system design basics\n\nConsistency beats intensity!';
  }

  return `Great question about "${question}"! 🤔\n\nI'd recommend:\n1. Break the problem into smaller parts\n2. Search for related concepts\n3. Practice with real code examples\n4. Build a small project using it\n\nWant me to go deeper on any specific aspect?`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 56 : 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageList: {
    flex: 1,
  },
  messageContent: {
    padding: 16,
    paddingBottom: 8,
    gap: 12,
  },
  messageBubble: {
    maxWidth: '85%',
    borderRadius: 16,
    padding: 14,
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  aiIcon: {
    marginBottom: 6,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 21,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    borderTopWidth: 1,
    gap: 10,
  },
  textInput: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    borderWidth: 1,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AIChatbotFab;
