// ─── Grok AI Service — powers both Learn Notes & Chatbot ─────────────────────
// Uses xAI's Grok API (OpenAI-compatible format)
// Get your free API key at: https://console.x.ai/

const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';
const GROK_MODEL = 'grok-3-mini-fast';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface VideoSuggestion {
  title: string;
  searchQuery: string;
}

export interface GeneratedTopicResult {
  notes: string;
  videos: VideoSuggestion[];
}

/**
 * Send a chat completion request to Grok API.
 */
async function grokChat(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.EXPO_PUBLIC_GROK_API_KEY;

  if (!apiKey || apiKey === 'your_grok_api_key') {
    throw new Error('GROK_NOT_CONFIGURED');
  }

  const response = await fetch(GROK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROK_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('[Grok API Error]', response.status, errText);

    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    throw new Error(`Grok API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error('Empty response from Grok');
  return text;
}

// ─── Learning Notes Generation ───────────────────────────────────────────────

const TOPIC_SYSTEM_PROMPT = `You are an expert programming and technology tutor. Generate comprehensive, beginner-friendly learning notes for the given topic.

Your response MUST be a valid JSON object with exactly this structure:
{
  "notes": "markdown formatted notes here",
  "videos": [
    { "title": "Video Title 1", "searchQuery": "youtube search query 1" },
    { "title": "Video Title 2", "searchQuery": "youtube search query 2" },
    { "title": "Video Title 3", "searchQuery": "youtube search query 3" },
    { "title": "Video Title 4", "searchQuery": "youtube search query 4" }
  ]
}

The "notes" field should contain well-structured markdown with these sections:
## Introduction
Brief overview of what this topic is and why it matters.

## Key Concepts
List the core ideas with clear explanations.

## How It Works
Detailed explanation with examples.

## Code Examples
Practical code snippets with comments explaining each part.

## Common Use Cases
Real-world applications of this concept.

## Practice Problems
3 practice problems for the learner to try.

The "videos" array should contain 4 objects with YouTube search queries that would find helpful tutorials on this topic.

IMPORTANT: Return ONLY the JSON object, no markdown code blocks, no extra text.`;

export async function generateNotesWithGrok(
  topic: string,
  focusArea?: string,
): Promise<GeneratedTopicResult> {
  const userPrompt = focusArea
    ? `Generate comprehensive learning notes for: ${topic}, focusing specifically on: ${focusArea}`
    : `Generate comprehensive learning notes for: ${topic}`;

  const raw = await grokChat([
    { role: 'system', content: TOPIC_SYSTEM_PROMPT },
    { role: 'user', content: userPrompt },
  ]);

  // Parse JSON — handle potential markdown code blocks in response
  let cleanContent = raw.trim();
  if (cleanContent.startsWith('```json')) {
    cleanContent = cleanContent.slice(7);
  } else if (cleanContent.startsWith('```')) {
    cleanContent = cleanContent.slice(3);
  }
  if (cleanContent.endsWith('```')) {
    cleanContent = cleanContent.slice(0, -3);
  }
  cleanContent = cleanContent.trim();

  try {
    const parsed = JSON.parse(cleanContent);
    return {
      notes: parsed.notes || cleanContent,
      videos: Array.isArray(parsed.videos) ? parsed.videos : getDefaultVideos(topic),
    };
  } catch {
    // Fallback: use raw text as notes with default video suggestions
    return {
      notes: raw,
      videos: getDefaultVideos(topic),
    };
  }
}

function getDefaultVideos(topic: string): VideoSuggestion[] {
  return [
    { title: `${topic} Tutorial for Beginners`, searchQuery: `${topic} tutorial for beginners` },
    { title: `${topic} Crash Course`, searchQuery: `${topic} crash course` },
    { title: `${topic} Explained Simply`, searchQuery: `${topic} explained simply` },
    { title: `Advanced ${topic}`, searchQuery: `advanced ${topic} tutorial` },
  ];
}

// ─── Chatbot Conversation ────────────────────────────────────────────────────

const CHATBOT_SYSTEM_PROMPT = `You are a helpful AI assistant for CodeKick, a learning platform. Help users with their coding journey, answer questions about programming, suggest learning resources, and provide guidance on CP/DSA, AI/ML, Web3, and Web2 development. Be encouraging and supportive. Keep responses concise but informative. Use emojis occasionally. Format with markdown when useful (bullet points, code blocks).`;

export async function chatWithGrok(
  conversationHistory: ChatMessage[],
): Promise<string> {
  const messages: ChatMessage[] = [
    { role: 'system', content: CHATBOT_SYSTEM_PROMPT },
    ...conversationHistory,
  ];

  return grokChat(messages);
}
