"use client";

import Link from "next/link";
import { ArrowLeft, ThumbsUp } from 'lucide-react';

// --- DATA: User-submitted answers for "Are you willing to relocate or travel?" ---
const userAnswers = [
  {
    author: "Roushan Raj",
    time: "4 weeks ago",
    likes: 4,
    content: [
      "Yes, I am open to relocation and travel.",
      "I see it as an opportunity to learn, adapt to new environments, and contribute where I'm needed."
    ]
  },
  {
    author: "Bhargav",
    time: "2 months ago",
    likes: 3,
    content: [
      "Yes sir, I will relocate in a week if the company requires."
    ]
  },
  {
    author: "RAMVIKESH V",
    time: "2 months ago",
    likes: 10,
    content: [
      "Yes, I am ready to relocate as per company requirements and I love travelling the new places because a new environment comes with a new experience and learn new things from other people and wanting to know their culture.",
      "And it's a good opportunity to communicate with more people, gain knowledge and new ideas for company growth."
    ]
  },
  {
    author: "Bhargav",
    time: "3 months ago",
    likes: 4,
    content: [
      "Yes, sir, I'm willing to relocate as per the company's requirements."
    ]
  },
  {
    author: "Shubham Borole",
    time: "4 months ago",
    likes: 4,
    content: [
      "Yes, I can relocate.",
      "My hobby is also travelling."
    ]
  },
  {
    author: "NARESH PATEL",
    time: "6 months ago",
    likes: 12,
    content: [
      "Yes, I'm willing to relocate and travel if needed for the role."
    ]
  },
  {
    author: "Niyazuddin Ansari",
    time: "7 months ago",
    likes: 9,
    content: [
      "\"Yes, I am open to relocation/travel if it aligns with the role and growth opportunities\"."
    ]
  },
  {
    author: "Sachin Sahu",
    time: "9 months ago",
    likes: 90,
    content: [
      "Yes, I am ready to relocate as per company requirements. I love to travel to new places because a new environment brings new people, different cultures, and new challenges.",
      "I think that will help me grow personally and professionally."
    ]
  },
  {
    author: "Madam Shilpa",
    time: "9 months ago",
    likes: 12,
    content: [
      "Yes, I will, Because relocating is an opportunity to show my skills and it is a very graceful thing to know their culture and meet with different people. I think that relocate teaches how to adjust or co-operate with new people."
    ]
  },
  {
    author: "Gudivada Bharath Kumar",
    time: "10 months ago",
    likes: 25,
    content: [
      "Yes, I am ready to relocate because I love to explore new places, and from new places, I learn new things, which is helpful to my life and my growth."
    ]
  }
];

// --- MAIN PAGE COMPONENT ---
export default function RelocateOrTravelPage() {
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
                    Are you willing to relocate or travel?
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