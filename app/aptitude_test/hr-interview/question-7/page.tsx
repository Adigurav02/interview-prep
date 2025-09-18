"use client";

import Link from "next/link";
import { ArrowLeft, ThumbsUp } from 'lucide-react';

// --- DATA: User-submitted answers for "How do you feel about working nights and weekends?" ---
const userAnswers = [
  {
    author: "Athary",
    time: "3 weeks ago",
    likes: 4,
    content: [
      "Sir/Mam, I believe that maintaining a work-life balance is crucial for any working professional to work long-term for a company. Loving what you do is crucial, but still, working all the time might be mentally exhausting for people.",
      "However, since I'm a fresher now, I'm exploring and willing to learn as many things as I can, so a few extra hours won't hurt me."
    ]
  },
  {
    author: "Rutika",
    time: "1 month ago",
    likes: 8,
    content: [
      "Ideally, it's not productive to work late nights as the Brain needs some rest to reboot itself. Although working weekends can be considered rather than working late nights.",
      "I will be there for the company when it comes to meeting deadlines."
    ]
  },
  {
    author: "Bhoomika Chourey",
    time: "1 month ago",
    likes: 8,
    content: [
      "If the company needs me, then I am ready to work at any time, as I want to gain knowledge and more work experience."
    ]
  },
  {
    author: "Suryansh Yadav",
    time: "2 months ago",
    likes: 4,
    content: [
      "I'm happy to contribute extra hours when needed. Let me know more about the additional compensation policy in place for overtime work."
    ]
  },
  {
    author: "RAMVIKESH V",
    time: "2 months ago",
    likes: 11,
    content: [
      "As a fresher, I don't have any problem working at weekends and night shifts. It will be an opportunity to gain more knowledge and learn new skills."
    ]
  },
  {
    author: "Ravindrareddy",
    time: "2 months ago",
    likes: 6,
    content: [
      "Yes, sir, I am not worried about night shifts and weekends, because as a fresher, my responsibility is to gain knowledge and explore my skills to help the growth of the organisation."
    ]
  },
  {
    author: "Kiran Malinije",
    time: "2 months ago",
    likes: 6,
    content: [
      "I cannot work at night shifts because doing tasks without proper rest may lead to stress and depression.",
      "A person without rest cannot do their best!"
    ]
  },
  {
    author: "Shanjitha",
    time: "5 months ago",
    likes: 13,
    content: [
      "Sir, I'm a fresher I have no issues working for night shift I will give my best and the importance once I need to complete the work at the time and weekend I will give more importance to my work. And I will handle my personal life and work."
    ]
  },
  {
    author: "Veevish",
    time: "5 months ago",
    likes: 35,
    content: [
      "Yes, sir, I have no issue working the night shift and weekends because as a fresher, I am responsible for gaining knowledge and more experience.",
      "And explore my skills to help the growth of the organisation."
    ]
  }
];

// --- MAIN PAGE COMPONENT ---
export default function WorkingNightsAndWeekendsPage() {
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
                    How do you feel about working nights and weekends?
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