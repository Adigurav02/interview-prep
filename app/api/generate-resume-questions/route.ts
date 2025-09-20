import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with the NEW, dedicated API key
const openai = new OpenAI({
  apiKey: process.env.RESUME_AI_API_KEY!,
  baseURL: process.env.OPENROUTER_API_BASE!,
  defaultHeaders: { "HTTP-Referer": process.env.OPENROUTER_SITE_URL! },
});

export async function POST(request: Request) {
  try {
    const { resumeText, numQuestions } = await request.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required.' }, { status: 400 });
    }
    if (!numQuestions) {
      return NextResponse.json({ error: 'Number of questions is required.' }, { status: 400 });
    }

    // A powerful and specific prompt to get the desired output
    const systemPrompt = `You are an expert hiring manager. Based on the following resume text, generate exactly ${numQuestions} insightful and specific interview questions. 
    - The questions MUST directly relate to the skills, experiences, and projects mentioned in the resume.
    - Avoid generic questions like "Tell me about yourself."
    - Your response MUST be a valid JSON object with a single key "questions" that holds an array of the generated question strings.`;
    
    const userMessage = `Resume Text: """${resumeText}"""`;

    const response = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      response_format: { type: 'json_object' }, // Enforce JSON output
    });

    const responseContent = response.choices[0].message.content;
    if (!responseContent) {
      throw new Error("AI returned an empty response.");
    }
    
    const result = JSON.parse(responseContent);
    const questions = result.questions || [];

    return NextResponse.json({ questions });

  } catch (error: any) {
    console.error('Error generating resume questions:', error);
    return NextResponse.json({ error: `Failed to generate questions. Error: ${error.message}` }, { status: 500 });
  }
}