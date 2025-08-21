import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// This securely initializes the OpenAI client with your Open Router key and settings
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENROUTER_API_BASE!, // Tells the client to send requests to Open Router
  defaultHeaders: {
    "HTTP-Referer": process.env.OPENROUTER_SITE_URL!, // Required by Open Router
  },
});

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const messages = [
      { role: 'system', content: "You are InterviewGPT, a friendly and expert career coach. Your goal is to help users prepare for job interviews, improve their resumes, and offer insightful career advice. Keep your responses concise, helpful, and encouraging." },
      ...(history || []),
      { role: 'user', content: message }
    ];

    // Call the OpenAI-compatible endpoint on Open Router
    const chatCompletion = await openai.chat.completions.create({
      messages: messages as any,
      // You can use different models supported by Open Router here if you wish
      model: 'openai/gpt-3.5-turbo', 
      max_tokens: 500,
    });

    const aiReply = chatCompletion.choices[0].message.content;

    return NextResponse.json({ reply: aiReply });

  } catch (error: any) {
    console.error('Error in Open Router chat API:', error);
    return NextResponse.json({ error: `Failed to get a response from the AI. Server Error: ${error.message}` }, { status: 500 });
  }
}