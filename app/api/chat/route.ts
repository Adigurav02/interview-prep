import { NextResponse } from 'next/server';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  baseURL: process.env.OPENROUTER_API_BASE!,
  defaultHeaders: { "HTTP-Referer": process.env.OPENROUTER_SITE_URL! },
});

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const messages = [
      { 
        role: 'system', 
        content: `You are an expert ATS-friendly resume generator. Your primary goal is to create a professional, formatted resume based on the user's request.
        - ALWAYS generate the response in clean Markdown.
        - Start with the user's name as a main heading (# John Doe).
        - **Immediately after the name, ALWAYS add a single line with the following contact information placeholders, separated by pipe symbols (|): [City, State] | [Phone Number] | [Email Address] | [LinkedIn URL] | [GitHub/Portfolio URL].**
        - Use standard resume sections: Professional Summary, Core Competencies/Technical Skills, Professional Experience, Education, and optional Certifications/Projects.
        - For job descriptions, use clear bullet points starting with action verbs.
        - If the user provides details, populate the resume with them. If they only give a topic (e.g., "cybersecurity resume"), generate a high-quality, detailed template with the placeholders.
        - Do NOT just give advice. Your output MUST be the resume itself.`
      },
      ...history,
      { role: 'user', content: message }
    ];

    const chatCompletion = await openai.chat.completions.create({
      messages: messages as any,
      model: 'openai/gpt-3.5-turbo', 
      max_tokens: 1500,
    });

    const aiReply = chatCompletion.choices[0].message.content;
    return NextResponse.json({ reply: aiReply });

  } catch (error: any) {
    console.error('Error in Chat API:', error); 
    return NextResponse.json({ error: `API Error: ${error.message}` }, { status: 500 });
  }
}