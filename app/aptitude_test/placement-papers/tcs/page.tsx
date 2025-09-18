"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from 'lucide-react';

// --- DATA: This data is specific to the TCS Interview Experience page ---

const interviewExperience = [
  { 
    type: 'heading', 
    content: "TR & MR QUESTIONS" 
  },
  { 
    type: 'list', 
    items: [
      "Introduce yourself",
      "Is there any another cloud platforms, rather than AWS",
      "Explain about project in simple way",
      "Asked some questions in python only like, access modifiers, decorators, generators, list.",
      "How memory managed in python",
      "Write a program to convert Numbers to words",
      "Asked about my family indepth",
      "After he sent me outside for 5 min later call me again after 5 min",
      "Why do you want to join TCS?",
      "Asked me about Python data types",
      "Asked me about Python Python keywords",
      "Again he sent me back , we will call after 5 min",
      "Are you comfortable with relocating",
      "If you have offer to bhubaneswar will you go",
      "He suggest me at ending time interview please learn LinuxOs with certification or course"
    ] 
  },
  { 
    type: 'heading', 
    content: "HR :" 
  },
  {
    type: 'list',
    items: [
      "Show me your original adhaar card",
      "Show me all your academic certificates",
      "Why do you want join TCS?",
      "Asked about my hobbies ?",
      "Why should we hire you?"
    ]
  },
  {
    type: 'paragraph',
    content: "Same HR also tell me, please wait outside I will call you after 5 min, after this TR, MR, HR combined together asked some questions"
  },
  {
    type: 'list',
    items: [
      "Asked about my softskills",
      "Asked about education journey",
      "I mentioned outdoor photography in hobbies, she asked indepth questions in that topic",
      "Strength and weakness",
      "I asked 1 question to HR about TCS",
      "What is adaptability, how you followed this?",
      "In your college any seminars given , please tell about that"
    ]
  },
  {
    type: 'paragraph',
    content: "I completed my interview for ninja role"
  }
];

// --- MAIN PAGE COMPONENT ---
export default function TcsInterviewPage() {
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
                {/* Text-based logo for TCS */}
                <h1 className="text-4xl font-bold text-blue-600 tracking-wider mb-2">
                    TATA CONSULTANCY SERVICES
                </h1>
                <p className="text-lg text-gray-800 font-semibold">TCS Placement Papers</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Posted by : E Tharun</span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <Heart size={14} className="text-red-400" />
                        <span>(25)</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {interviewExperience.map((item, index) => {
                if (item.type === 'heading') {
                  return <h2 key={index} className="text-xl font-bold text-gray-900 pt-4">{item.content}</h2>;
                }
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