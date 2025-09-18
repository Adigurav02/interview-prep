"use client";

import Link from "next/link";
import { ArrowLeft, ThumbsUp } from 'lucide-react';

// --- DATA: User-submitted answers for "What are your goals?" ---
const userAnswers = [
  {
    author: "Payal Gautam More",
    time: "1 week ago",
    likes: 1,
    content: [
      "My short-term goal is to get a job in a repeater company like yours, where I can gain more knowledge and experience.",
      "My long-term goal is to achieve a good position in the same company where I am working."
    ]
  },
  {
    author: "Vaibhav",
    time: "4 weeks ago",
    likes: 8,
    content: [
      "My short-term goal is to improve my skills and gain hands-on experience in a professional environment, contributing to the company's success.",
      "My long-term goal is to grow into a position of responsibility where I can lead projects, mentor others, and make a meaningful impact in my field."
    ]
  },
  {
    author: "Asmin Khatoon",
    time: "1 month ago",
    likes: 11,
    content: [
      "My short-term goals are to get in this job role, and my long-term goals are to achieve a higher position in our company."
    ]
  },
  {
    author: "Bhoomika Chourey",
    time: "1 month ago",
    likes: 9,
    content: [
      "My short-term goal is to start my career in a good company like yours, where I can learn new skills, get real work experience, and grow step by step.",
      "My long-term goal is to become a skilled and confident professional, take on more responsibilities, and help the company grow and do well."
    ]
  },
  {
    author: "RAMVIKESH V",
    time: "2 months ago",
    likes: 3,
    content: [
      "My short-term goals are to get in this job role, and my long-term goals are to achieve a higher position in our company."
    ]
  },
  {
    author: "Navinaa",
    time: "2 months ago",
    likes: 14,
    content: [
      "Short-term goal is to get a job and become financially independent to my self, so that I can support my family.",
      "Long-term goal is to reach a high position in a company like yours."
    ]
  },
  {
    author: "Sidemsetti Pujitha",
    time: "2 months ago",
    likes: 4,
    content: [
      "Good morning, sir. Thank you for allowing me to convey my goals to you.",
      "My short-term goal is to get a job in a reputable company.",
      "And my long-term goal is to become the best in my office."
    ]
  },
  {
    author: "Karan prajapat",
    time: "2 months ago",
    likes: 12,
    content: [
      "My short-term goal is to secure a position in a reputable company where I can develop my career utilising my skills and knowledge.",
      "My long-term goal is that achieve a good position, along with improving my skills and knowledge, which can be used in an organisation."
    ]
  },
  {
    author: "Jaswanth Kumar",
    time: "3 months ago",
    likes: 8,
    content: [
      "My short-term goal is to be hired in a good company where I can build my career with skills and knowledge.",
      "My long-term goal is that will achieve a good position, along with improving my skills and knowledge which can use to organization."
    ]
  },
  {
    author: "Anshul kumar",
    time: "3 months ago",
    likes: 5,
    content: [
      "My short-term goal is to get job in a reputed company and my long-term goal is to achieve a good position like yours, where I can build my career and help the organization too.",
      "That's all about me thank you very much."
    ]
  }
];

// --- MAIN PAGE COMPONENT ---
export default function WhatAreYourGoalsPage() {
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
                    What are your goals?
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