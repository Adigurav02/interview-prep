"use client";

import Link from "next/link";
import { ArrowLeft, ThumbsUp } from 'lucide-react';

// --- DATA: User-submitted answers for "Can you work under pressure?" ---
const userAnswers = [
  {
    author: "Jogeswar",
    time: "3 days ago",
    likes: 1,
    content: [
      "Yes sir.",
      "In that time, I will be quiet and focus on the problem and solve the problem."
    ]
  },
  {
    author: "AM",
    time: "3 weeks ago",
    likes: 3,
    content: [
      "Sir, it depends upon what you consider pressure to be. I have in the past worked under tight deadlines and on projects which hold a lot of value."
    ]
  },
  {
    author: "Kismat kafle",
    time: "1 month ago",
    likes: 4,
    content: [
      "Sir, it depends on what you consider pressure. But yeah, I am emotionally and mentally balanced and able to handle pressure.",
      "I won't let external pressure influence my actions within the office."
    ]
  },
  {
    author: "RAMVIKESH V",
    time: "2 months ago",
    likes: 11,
    content: [
      "As a fresher, I may not have direct professional experience, but I have handled similar scenarios involving tight deadlines in academic projects."
    ]
  },
  {
    author: "Yogesh Mewada",
    time: "2 months ago",
    likes: 9,
    content: [
      "Yes, because I worked under pressure good for me. I worked in a free mindset and focused on a task."
    ]
  },
  {
    author: "Megha",
    time: "2 months ago",
    likes: 7,
    content: [
      "Yes, at that time, I can work smartly."
    ]
  },
  {
    author: "Maria Oskar Mendis",
    time: "3 months ago",
    likes: 7,
    content: [
      "Yes, sir, I can stay calm and then solve the problem."
    ]
  },
  {
    author: "Vikas Kumar",
    time: "3 months ago",
    likes: 21,
    content: [
      "Yes, I can work under pressure.",
      "I stay calm, focus on the task, and manage my time well to meet deadlines without compromising quality."
    ]
  }
];

// --- MAIN PAGE COMPONENT ---
export default function WorkUnderPressurePage() {
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
                    Can you work under pressure?
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