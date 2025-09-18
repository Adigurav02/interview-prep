"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from 'lucide-react';

// --- DATA: This data is specific to the Wipro Interview Experience page ---

const interviewExperience = [
  { type: 'paragraph', content: "Hi Folks," },
  { type: 'paragraph', content: "I am the user of IndiaBix since my collage days. Now I am in WIPRO HYD." },
  { type: 'paragraph', content: "First I cracked the Aptitude round & written communication round, after a month I got the TR & HR round mail and I went there." },
  { type: 'paragraph', content: "In TR round they asked questions are as:-" },
  { 
    type: 'list', 
    items: [
      "Tell me something about yourself.",
      "Which is your favorite subject in IT.",
      "He asked me to write some basic programs in any language.",
      "I said him about my live project which is a educational website.",
      "Said about something extra activities like web designing freelancing etc."
    ] 
  },
  { type: 'paragraph', content: "Finally selected for HR." },
  { type: 'paragraph', content: "In HR round one HR taken my interview online." },
  { type: 'paragraph', content: "She asked some questions are as:" },
  { 
    type: 'list', 
    items: [
      "Tell me something about yourself.",
      "Why I hire you.",
      "Say me about your weakness and strength.",
      "Something about my school and college life.",
      "What do you do in your free time."
    ] 
  },
  { type: 'paragraph', content: "After 2 days I got a mail that I am selected." },
  { type: 'paragraph', content: "After a month there is lockdown in INDIA for COVID19." },
  { type: 'paragraph', content: "After that I completed PJP (pre joining program)." },
  { type: 'paragraph', content: "After that I joined WIPRO @ 7th sep 2020 and now working from home." },
  { type: 'paragraph', content: "Thank you." },
];

// --- MAIN PAGE COMPONENT ---
export default function WiproInterviewPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="flex items-start gap-4 mb-8">
            {/* Back button */}
            <Link href="/aptitude_test/placement-papers" className="text-gray-500 hover:text-gray-900 transition-colors mt-1">
                <ArrowLeft size={28} />
            </Link>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md">
            {/* Header Section */}
            <div className="text-center mb-10 pb-6 border-b border-gray-200">
                {/* Text-based logo for Wipro */}
                <h1 className="text-5xl font-bold text-gray-800 tracking-wider mb-4">
                    WIPRO
                </h1>
                <p className="text-lg text-gray-800 font-semibold">Wipro - Hyderabad 17/02/2021</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Posted by : Rohit Kumar Nicku</span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <Heart size={14} className="text-red-400" />
                        <span>(340)</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {interviewExperience.map((item, index) => {
                if (item.type === 'paragraph') {
                  return <p key={index} className="text-lg text-gray-800 leading-relaxed">{item.content}</p>;
                }
                if (item.type === 'list') {
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 pl-2">
                      {item.items.map((listItem, liIndex) => (
                        <li key={liIndex} className="text-lg text-gray-800 leading-relaxed">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  );
                }
                return null;
              })}
            </div>
        </div>
      </main>
    </div>
  );
}