// ─── Gemini AI Service — powers both Learn Notes & Chatbot ───────────────────
// Uses Google's Gemini API (free tier available)
// Get your free API key at: https://aistudio.google.com/apikey

const GEMINI_MODEL = 'gemini-2.5-flash';

function getGeminiUrl(): string {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key') {
    throw new Error('GEMINI_NOT_CONFIGURED');
  }
  return `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
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
 * Send a request to Gemini API and return the text response.
 */
async function geminiChat(systemPrompt: string, userMessage: string): Promise<string> {
  const url = getGeminiUrl();

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: userMessage }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('[Gemini API Error]', response.status, errText);
    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini');
  return text;
}

/**
 * Multi-turn conversation with Gemini.
 */
async function geminiConversation(
  systemPrompt: string,
  history: { role: string; content: string }[],
): Promise<string> {
  const url = getGeminiUrl();

  const contents = history.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: systemPrompt }],
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('[Gemini API Error]', response.status, errText);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini');
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

export async function generateNotesWithAI(
  topic: string,
  focusArea?: string,
): Promise<GeneratedTopicResult> {
  const userPrompt = focusArea
    ? `Generate comprehensive learning notes for: ${topic}, focusing specifically on: ${focusArea}`
    : `Generate comprehensive learning notes for: ${topic}`;

  const raw = await geminiChat(TOPIC_SYSTEM_PROMPT, userPrompt);

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

export async function chatWithAI(
  conversationHistory: { role: string; content: string }[],
): Promise<string> {
  return geminiConversation(CHATBOT_SYSTEM_PROMPT, conversationHistory);
}
