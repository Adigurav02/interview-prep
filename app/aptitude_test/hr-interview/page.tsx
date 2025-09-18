"use client";

import Link from "next/link";
import { ArrowLeft, UserCheck } from 'lucide-react';

// --- DATA: Each question is an object with a 'question' and a 'slug' for the URL ---
const hrQuestions = [
  { 
    question: "Tell me about yourself.", 
    slug: "question-1" // Links to the page you've already created
  },
  { 
    question: "Why should I hire you?", 
    slug: "question-2" 
  },
  { 
    question: "What are your strengths and weaknesses?", 
    slug: "question-3" 
  },
  { 
    question: "Why do you want to work at our company?", 
    slug: "question-4" 
  },
  { 
    question: "What is the difference between confidence and over confidence?", 
    slug: "question-5" 
  },
  { 
    question: "What is the difference between hard work and smart work?", 
    slug: "question-6" 
  },
  { 
    question: "How do you feel about working nights and weekends?", 
    slug: "question-7" 
  },
  { 
    question: "Can you work under pressure?", 
    slug: "question-8" 
  },
  { 
    question: "Are you willing to relocate or travel?", 
    slug: "question-9" 
  },
  { 
    question: "What are your goals?", 
    slug: "question-10" 
  },
];


// --- MAIN PAGE COMPONENT ---
export default function HrInterviewPage() {
  const parentSlug = "hr-interview"; // This should match the current folder name

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="flex items-center gap-4 mb-8">
            {/* Back button */}
            <Link href="/aptitude_test" className="text-gray-500 hover:text-gray-900 transition-colors mt-1">
                <ArrowLeft size={28} />
            </Link>
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900">
                    HR Interview Questions
                </h1>
                <p className="mt-1 text-lg text-gray-600">Common questions asked during the HR round.</p>
            </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md">
            {/* Questions Grid with Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {hrQuestions.map((item, index) => (
                <Link 
                  key={index} 
                  href={`/aptitude_test/${parentSlug}/${item.slug}`} 
                  className="group flex items-start gap-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <UserCheck className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                  <p className="text-lg text-gray-800 group-hover:text-green-700">
                    {item.question}
                  </p>
                </Link>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
}