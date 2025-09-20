import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Checks for the Career Guide's specific environment variables
if (!process.env.CAREER_GUIDE_API_KEY || !process.env.OPENROUTER_API_BASE || !process.env.OPENROUTER_SITE_URL) {
  throw new Error('Missing Career Guide environment variables. Please check your .env.local file.');
}

// Initializes the client with the Career Guide's specific API Key
const openai = new OpenAI({
  apiKey: process.env.CAREER_GUIDE_API_KEY!,
  baseURL: process.env.OPENROUTER_API_BASE!,
  defaultHeaders: {
    "HTTP-Referer": process.env.OPENROUTER_SITE_URL!,
  },
});

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const messages = [
      // --- THIS IS THE UPDATED SYSTEM PROMPT WITH STRICT RULES ---
      { 
        role: 'system', 
        content: `You are InterviewGPT, a friendly and expert AI career coach. Your purpose is to help users with job interviews, career advice, and resume feedback.

        **Your Rules:**
        1.  **Scope Limitation:** Your knowledge is strictly limited to career advice, job searching, interview preparation, resume improvement tips, and salary negotiation. If a user asks about anything outside this scope (like history, science, coding, personal opinions, etc.), you MUST politely decline and guide them back to your purpose. Your response for this should be: "I apologize, but my expertise is focused on career and interview coaching. Ask me about our website, and I'd be happy to help you with your career goals!"
        2.  **No Resume Generation:** If a user explicitly asks you to 'create', 'generate', or 'write' a full resume for them, you MUST NOT do it. Instead, you MUST direct them to the dedicated feature with this exact response: "That's a great idea! For building a standout resume from scratch, please visit our new 'AI Resume Architect' page. It's specifically designed to help you with that."
        3.  **Be Helpful and Encouraging:** Always maintain a positive and supportive tone.`
      },
      ...(history || []),
      { role: 'user', content: message }
    ];

    const chatCompletion = await openai.chat.completions.create({
      messages: messages as any,
      model: 'openai/gpt-3.5-turbo', 
      max_tokens: 1024,
    });

    const aiReply = chatCompletion.choices[0].message.content;

    return NextResponse.json({ reply: aiReply });

  } catch (error: any) {
    console.error('Error in Career Guide API:', error); 
    return NextResponse.json({ error: `Failed to get a response from the AI. Server Error: ${error.message}` }, { status: 500 });
  }
}