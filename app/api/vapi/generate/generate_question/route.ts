import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import pdf from 'pdf-parse';

// This line securely loads the key from your .env.local file.
// It will now work because you have restarted the server.
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('resume') as File | null;
    const existingQuestionsJSON = formData.get('existingQuestions') as string | null;
    const existingQuestions = existingQuestionsJSON ? JSON.parse(existingQuestionsJSON) : [];

    if (!file) {
      return NextResponse.json({ error: 'No resume file provided.' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const data = await pdf(fileBuffer);
    const resumeText = data.text;

    if (resumeText.trim().length < 100) {
        return NextResponse.json({ error: 'Could not extract enough text from the resume.' }, { status: 400 });
    }

    const prompt = `
      Based on the following resume text, please generate 5 personalized interview questions.
      The questions should be insightful and directly related to the experience, skills, and projects mentioned.
      RULES:
      - Generate exactly 5 questions.
      - DO NOT include any introductory text like "Here are 5 questions".
      - Each question must be on a new line.
      - The questions must be unique and not present in this list of already existing questions: ${existingQuestions.join(', ')}
      
      RESUME TEXT:
      ---
      ${resumeText.substring(0, 3500)} 
      ---
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiText = response.text();

    const questions = aiText.split('\n').filter(q => q.trim().length > 5);

    if (questions.length === 0) {
        throw new Error("The AI returned an empty response. Please try again.");
    }

    return NextResponse.json({ questions });

  } catch (error: any) {
    console.error('Error in generate-questions API:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate questions. Check server logs for details.' }, { status: 500 });
  }
}