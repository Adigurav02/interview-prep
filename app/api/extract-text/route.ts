import { NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file was uploaded.' }, { status: 400 });
    }

    // Convert the uploaded file into a Buffer that our parsing libraries can read
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    let extractedText = '';

    // Process the file based on its MIME type
    if (file.type === 'application/pdf') {
      const data = await pdf(fileBuffer);
      extractedText = data.text;
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
      extractedText = value;
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Please upload a PDF or DOCX file.' }, { status: 400 });
    }

    if (!extractedText) {
        return NextResponse.json({ error: 'Could not extract text from the file. It might be empty or corrupted.' }, { status: 400 });
    }

    return NextResponse.json({ text: extractedText });

  } catch (error: any) {
    console.error('Error in extract-text API:', error);
    return NextResponse.json({ error: `Failed to process file. Server Error: ${error.message}` }, { status: 500 });
  }
}