"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from 'lucide-react';

// --- DATA: This data is specific to the Infosys Interview Experience page ---

const interviewExperience = [
  { type: 'heading', content: "Round 1: Online Assessment" },
  { type: 'paragraph', content: "Logical Reasoning: Questions on data interpretation, logical reasoning, and verbal ability." },
  { type: 'paragraph', content: "Technical Aptitude: Questions on programming concepts, data structures, algorithms, and basic computer science principles." },
  
  { type: 'heading', content: "Round 2: Technical Interview" },
  { type: 'paragraph', content: "Introduction: A brief introduction about myself and my projects." },
  { type: 'paragraph', content: "Core Subjects: Questions on core subjects like Data Structures, Algorithms, Operating Systems, and Computer Networks." },
  { type: 'paragraph', content: "Programming Language: Questions on my preferred programming language (e.g., Java, Python, C++)." },
  { type: 'paragraph', content: "Problem-Solving: Coding questions or algorithmic problems to solve." },
  { type: 'paragraph', content: "Project Discussion: Detailed discussion on my projects, their challenges, and solutions." },

  { type: 'heading', content: "Round 3: HR Interview" },
  { type: 'paragraph', content: "Introduction: A brief introduction about myself and my interests." },
  { type: 'paragraph', content: "Academic Background: Questions about my academic journey, strengths, and weaknesses." },
  { type: 'paragraph', content: "Career Goals: Discussion on my long-term career aspirations and how Infosys aligns with them." },
  { type: 'paragraph', content: "Relocation and Shift Work: Willingness to relocate and work in shifts." },
  { type: 'paragraph', content: "Salary Expectations: Negotiation of salary and benefits." },

  { type: 'heading', content: "Key Tips:" },
  { type: 'paragraph', content: "Strong Fundamentals: A solid understanding of core computer science concepts is crucial." },
  { type: 'paragraph', content: "Problem-Solving Skills: Practice problem-solving and coding challenges in website like IndiaBix." },
  { type: 'paragraph', content: "Communication Skills: Clear and concise communication is essential." },
  { type: 'paragraph', content: "Positive Attitude: Maintain a positive and confident demeanor throughout the interview process." },
  { type: 'paragraph', content: "Research Infosys: Familiarize yourself with Infosys's culture, values, and recent projects." },
  { type: 'paragraph', content: "Remember, preparation is key. Practice mock interviews, review common interview questions, and stay updated on the latest trends in the tech industry. Good luck!" }
];


// --- MAIN PAGE COMPONENT ---
export default function InfosysInterviewPage() {
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
                {/* 
                  CORRECTION: The SVG logo component has been replaced with a styled text heading.
                */}
                <h1 className="text-5xl font-bold text-blue-600 tracking-wider mb-4">
                    Infosys
                </h1>
                <p className="text-lg text-gray-800 font-semibold">Infosys Interview Experience</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Posted by : Gujjula Mahesh Babu</span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <Heart size={14} className="text-red-400" />
                        <span>(26)</span>
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
                return null;
              })}
            </div>
        </div>
      </main>
    </div>
  );
}