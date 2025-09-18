"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from 'lucide-react';

// --- DATA: This data is specific to the Accenture Interview Experience page ---

const interviewExperience = [
  { type: 'paragraph', content: "Here's a brief, clean summary you can use for your placement paper and interview experience about Accenture Bangalore – Full Stack Web Development with your 7.98 CGPA." },
  { type: 'heading', content: "Eligibility:" },
  {
    type: 'list',
    items: [
      "Minimum CGPA: 7.5 (I had 7.98 CGPA)",
      "Eligible branches: IT, CSE, ECE, and related",
      "Final-year students"
    ]
  },
  { type: 'heading', content: "Selection Process" },
  { type: 'subheading', content: "1. Online Assessment (90 mins)" },
  { type: 'paragraph', content: "Sections:" },
  {
    type: 'list',
    items: [
      "Cognitive & Aptitude (Logical reasoning, verbal ability, quantitative aptitude)",
      "Technical MCQs (OOPs, DBMS, HTML, CSS, JavaScript, Java/Python basics)",
      "Coding round (1 easy + 1 medium problem; topics like arrays, strings, basic algorithms)",
      "Example: Reverse words in a sentence, find second largest element in an array."
    ]
  },
  { type: 'subheading', content: "2. Technical Interview" },
  { type: 'paragraph', content: "Questions on:" },
  {
      type: 'list',
      items: [
          "HTML, CSS, JavaScript fundamentals",
          "React or Angular basics",
          "Java/Python OOP concepts",
          "SQL queries (joins, aggregation, subqueries)",
          "Simple API creation logic"
      ]
  },
  { type: 'paragraph', content: 'Sample: "Explain REST API and how you would design one for a student management system."' },
  { type: 'subheading', content: "3. HR Interview" },
  { type: 'paragraph', content: "Behavioral & situational questions:" },
  {
      type: 'list',
      items: [
          "Tell me about yourself",
          "Strengths and weaknesses",
          "How you handle deadlines & teamwork",
          "Also covered relocation & role flexibility"
      ]
  },
  { type: 'heading', content: "Preparation Strategy" },
  {
    type: 'list',
    items: [
      "Practiced coding daily on LeetCode & SkillRack",
      "Revised core CS subjects (OOP, DBMS, OS, Networking) from GeeksforGeeks",
      "Mock interviews with peers for HR preparation",
      "Focused on projects to explain in technical round (Full Stack apps with front-end & back-end integration)"
    ]
  },
  { type: 'heading', content: "Outcome" },
  {
    type: 'list',
    items: [
      "Selected for Full Stack Web Developer role at Accenture, Bangalore.",
      "The process tested both problem-solving skills and communication"
    ]
  }
];

// --- MAIN PAGE COMPONENT ---
export default function AccentureInterviewPage() {
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
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-wider">accenture</h1>
                <p className="mt-2 text-lg text-gray-600 font-semibold">Accenture Interview Experience</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Posted by : Kavya N</span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <Heart size={14} className="text-red-400" />
                        <span>(5)</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {interviewExperience.map((item, index) => {
                if (item.type === 'paragraph') {
                  return <p key={index} className="text-lg text-gray-800 leading-relaxed">{item.content}</p>;
                }
                if (item.type === 'heading') {
                  return <h2 key={index} className="text-2xl font-bold text-gray-900 pt-4">{item.content}</h2>;
                }
                if (item.type === 'subheading') {
                  return <h3 key={index} className="text-xl font-semibold text-gray-800 pt-2">{item.content}</h3>;
                }
                if (item.type === 'list') {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 pl-2">
                      {item.items.map((listItem, liIndex) => (
                        <li key={liIndex} className="text-lg text-gray-800 leading-relaxed">{listItem}</li>
                      ))}
                    </ul>
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