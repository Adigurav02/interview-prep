"use client";

import Link from "next/link";
import { ArrowLeft, ThumbsUp } from 'lucide-react';

// --- DATA: User-submitted answers for "What is the difference between hard work and smart work?" ---
const userAnswers = [
  {
    author: "Pavani Chowdala",
    time: "3 months ago",
    likes: 17,
    content: [
      "Hardwork - It includes the straightforward method of doing same tasks which can require more time & energy.",
      "Smartwork - It includes alternate ways of doing the same work more efficiently with the same accuracy mind & energy."
    ]
  },
  {
    author: "Sv yadav",
    time: "5 months ago",
    likes: 33,
    content: [
      "Hard work takes a long period to complete the tasks.",
      "While Smart work took less effort for the same tasks."
    ]
  },
  {
    author: "Sivabalan P.",
    time: "5 months ago",
    likes: 8,
    content: [
      "The difference of hard work and smart work is, that smart work is the key of lazy people to complete the work most easily and many MNCs hire lazy people for do their work faster than the normal way."
    ]
  },
  {
    author: "Balkrishna Namdev Gawade",
    time: "5 months ago",
    likes: 24,
    content: [
      "Hard Work:",
      "Putting in a lot of time and effort.",
      "Focuses on dedication and perseverance.",
      "Example: Studying for 10 hours by reading the same book again and again.",
      "Smart Work:",
      "Achieving more with better planning and techniques.",
      "Focuses on efficiency and using the right tools or methods.",
      "Example: Studying for 5 hours using summaries, previous papers, and understanding key concepts."
    ]
  },
  {
    author: "Nalla Gouthami",
    time: "6 months ago",
    likes: 50,
    content: [
      "Hard work is all about putting a lot of effort into completing a task.",
      "Smartwork is working efficiently and using proper strategy and tools to complete the work within the least time."
    ]
  }
];

// --- MAIN PAGE COMPONENT ---
export default function HardWorkVsSmartWorkPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="flex items-center gap-4 mb-8">
            {/* Back button */}
            <Link href="/aptitude_test/hr-interview" className="text-gray-500 hover:text-gray-900 transition-colors mt-1">
                <ArrowLeft size={28} />
            </Link>
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900">
                    What is the difference between hard work and smart work?
                </h1>
                <p className="mt-1 text-lg text-gray-600">Example Answers from the Community</p>
            </div>
        </div>

        {/* Answers Section */}
        <div className="space-y-8">
            {userAnswers.map((answer, index) => (
                <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-md">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                        <p className="font-bold text-lg text-blue-800">{answer.author} said:</p>
                        <p className="text-sm text-gray-500">{answer.time}</p>
                    </div>

                    <div className="space-y-4 text-lg leading-relaxed">
                        {answer.content.map((paragraph, pIndex) => (
                            <p key={pIndex} style={{ color: '#111827' }}>
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="flex justify-end items-center mt-6 pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-gray-500">
                            <ThumbsUp size={16} />
                            <span>({answer.likes})</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}