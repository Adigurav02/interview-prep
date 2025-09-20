import { NextResponse } from 'next/server';
import { marked } from 'marked';
import puppeteer from 'puppeteer';

// --- Enhanced styling for a professional ATS-friendly PDF ---
const createHtmlForPdf = (markdownContent: string) => {
  const htmlContent = marked(markdownContent, { breaks: true });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Resume</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

        body {
          font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          line-height: 1.5;
          color: #374151;
          background-color: #ffffff;
          font-size: 10.5pt;
        }
        .container {
          max-width: 8.5in;
          margin: 0 auto;
          padding: 0;
        }
        h1 {
          font-size: 26pt;
          font-weight: 700;
          color: #111827;
          text-align: center;
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 2px solid #111827;
          letter-spacing: -1px;
        }
        
        /* --- THIS IS THE NEW STYLING FOR THE CONTACT INFO --- */
        /* It targets the first paragraph immediately after the main heading (h1) */
        h1 + p {
          text-align: center;
          font-size: 10pt;
          color: #4b5563;
          margin-top: 4px;
          margin-bottom: 28px;
        }

        h2 {
          font-size: 13pt;
          font-weight: 700;
          color: #111827;
          margin-top: 20px;
          margin-bottom: 10px;
          border-bottom: 1px solid #d1d5db;
          padding-bottom: 5px;
        }
        h3 {
          font-size: 11pt;
          font-weight: 600;
          color: #1f2937;
          margin-top: 16px;
          margin-bottom: 2px;
        }
        p {
          margin-top: 0;
          margin-bottom: 12px;
        }
        ul {
          padding-left: 20px;
          margin-top: 4px;
          margin-bottom: 16px;
        }
        li {
          margin-bottom: 6px;
          padding-left: 5px;
        }
        strong, b {
          font-weight: 600;
          color: #111827;
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${htmlContent}
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    if (!content) throw new Error('Content is required.');

    const html = createHtmlForPdf(content);
    
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({ 
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.7in',
        right: '0.7in',
        bottom: '0.7in',
        left: '0.7in'
      }
    });
    
    await browser.close();

    return new Response(pdfBuffer, {
      headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="resume.pdf"' },
    });
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    return NextResponse.json({ error: `Failed to generate PDF: ${error.message}` }, { status: 500 });
  }
}