import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

// ─── Simple Markdown Renderer for React Native ──────────────────────────────

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const { colors } = useTheme();

  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let codeBlock = false;
  let codeLines: string[] = [];
  let codeLanguage = '';

  const renderInlineText = (text: string, baseStyle: any): React.ReactNode => {
    // Handle bold, italic, inline code
    const parts: React.ReactNode[] = [];
    // Match **bold**, *italic*, `code`
    const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Text before match
      if (match.index > lastIndex) {
        parts.push(
          <Text key={`t-${lastIndex}`} style={baseStyle}>
            {text.slice(lastIndex, match.index)}
          </Text>
        );
      }

      if (match[1]) {
        // **bold**
        parts.push(
          <Text key={`b-${match.index}`} style={[baseStyle, { fontWeight: '700' }]}>
            {match[2]}
          </Text>
        );
      } else if (match[3]) {
        // *italic*
        parts.push(
          <Text key={`i-${match.index}`} style={[baseStyle, { fontStyle: 'italic' }]}>
            {match[4]}
          </Text>
        );
      } else if (match[5]) {
        // `inline code`
        parts.push(
          <Text
            key={`c-${match.index}`}
            style={[
              baseStyle,
              {
                fontFamily: 'monospace',
                backgroundColor: colors.surface,
                paddingHorizontal: 4,
                borderRadius: 3,
                fontSize: 12,
                color: colors.accent.indigo,
              },
            ]}
          >
            {match[6]}
          </Text>
        );
      }
      lastIndex = match.index + match[0].length;
    }

    // Remaining text
    if (lastIndex < text.length) {
      parts.push(
        <Text key={`r-${lastIndex}`} style={baseStyle}>
          {text.slice(lastIndex)}
        </Text>
      );
    }

    return parts.length > 0 ? parts : <Text style={baseStyle}>{text}</Text>;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block toggle
    if (line.trim().startsWith('```')) {
      if (codeBlock) {
        // End code block
        elements.push(
          <View
            key={`code-${i}`}
            style={[styles.codeBlock, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            {codeLanguage ? (
              <Text style={[styles.codeLanguage, { color: colors.muted }]}>
                {codeLanguage}
              </Text>
            ) : null}
            <Text style={[styles.codeText, { color: colors.accent.green }]}>
              {codeLines.join('\n')}
            </Text>
          </View>
        );
        codeBlock = false;
        codeLines = [];
        codeLanguage = '';
      } else {
        codeBlock = true;
        codeLanguage = line.trim().replace('```', '').trim();
      }
      continue;
    }

    if (codeBlock) {
      codeLines.push(line);
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<View key={`sp-${i}`} style={styles.spacer} />);
      continue;
    }

    // ## Heading 2
    if (line.startsWith('## ')) {
      elements.push(
        <Text key={`h2-${i}`} style={[styles.heading2, { color: colors.foreground }]}>
          {line.slice(3)}
        </Text>
      );
      continue;
    }

    // ### Heading 3
    if (line.startsWith('### ')) {
      elements.push(
        <Text key={`h3-${i}`} style={[styles.heading3, { color: colors.foreground }]}>
          {line.slice(4)}
        </Text>
      );
      continue;
    }

    // # Heading 1
    if (line.startsWith('# ')) {
      elements.push(
        <Text key={`h1-${i}`} style={[styles.heading1, { color: colors.foreground }]}>
          {line.slice(2)}
        </Text>
      );
      continue;
    }

    // Numbered list (1. item)
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)/);
    if (numberedMatch) {
      elements.push(
        <View key={`ol-${i}`} style={styles.listItem}>
          <Text style={[styles.listNumber, { color: colors.accent.indigo }]}>
            {numberedMatch[1]}.
          </Text>
          <Text style={[styles.listText, { color: colors.foreground }]}>
            {renderInlineText(numberedMatch[2], { color: colors.foreground, fontSize: 14, lineHeight: 22 })}
          </Text>
        </View>
      );
      continue;
    }

    // Bullet list (- item or * item)
    const bulletMatch = line.match(/^[-*]\s+(.+)/);
    if (bulletMatch) {
      elements.push(
        <View key={`ul-${i}`} style={styles.listItem}>
          <Text style={[styles.bulletDot, { color: colors.accent.indigo }]}>•</Text>
          <Text style={[styles.listText, { color: colors.foreground }]}>
            {renderInlineText(bulletMatch[1], { color: colors.foreground, fontSize: 14, lineHeight: 22 })}
          </Text>
        </View>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <Text key={`p-${i}`} style={[styles.paragraph, { color: colors.foreground }]}>
        {renderInlineText(line, { color: colors.foreground, fontSize: 14, lineHeight: 22 })}
      </Text>
    );
  }

  return <View style={styles.container}>{elements}</View>;
};

const styles = StyleSheet.create({
  container: {
    gap: 2,
  },
  heading1: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 8,
  },
  heading2: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 6,
  },
  heading3: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 4,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
  },
  spacer: {
    height: 8,
  },
  listItem: {
    flexDirection: 'row',
    paddingLeft: 4,
    marginVertical: 2,
  },
  bulletDot: {
    fontSize: 14,
    lineHeight: 22,
    width: 16,
    fontWeight: '700',
  },
  listNumber: {
    fontSize: 14,
    lineHeight: 22,
    width: 24,
    fontWeight: '600',
  },
  listText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  codeBlock: {
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
  },
  codeLanguage: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default MarkdownRenderer;
