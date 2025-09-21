import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';

// --- THIS IS THE CRUCIAL FIX ---
// This config tells Next.js to not use its default body parser,
// allowing Formidable to handle the raw file stream correctly.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to parse the incoming form data from the request
async function parseForm(req: Request): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable({});
    // formidable expects a Node.js request object, so we cast `req` to `any`
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(request: Request) {
  try {
    const { files } = await parseForm(request);
    // formidable wraps files in an array, even if it's a single upload
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) {
      return NextResponse.json({ error: 'No file was uploaded.' }, { status: 400 });
    }

    const filePath = file.filepath;
    const fileBuffer = fs.readFileSync(filePath);
    let extractedText = '';

    // Process the file based on its MIME type
    if (file.mimetype === 'application/pdf') {
      const data = await pdf(fileBuffer);
      extractedText = data.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const { value } = await mammoth.extractRawText({ buffer: fileBuffer });
      extractedText = value;
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Please upload a PDF or DOCX file.' }, { status: 400 });
    }

    // Clean up the temporary file from the server
    fs.unlinkSync(filePath);

    return NextResponse.json({ text: extractedText });

  } catch (error: any) {
    console.error('Error extracting text:', error);
    return NextResponse.json({ error: `Failed to process file. Server Error: ${error.message}` }, { status: 500 });
  }
}