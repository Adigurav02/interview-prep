"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from 'lucide-react';

// --- DATA: This data is specific to the IBM Interview Experience page ---

const interviewExperience = [
  { type: 'paragraph', content: "I applied for the position Associate Systems Engineer. They invited me to off-campus in Malla Reddy College of Engineering & Technology, Hyderabad." },
  { type: 'heading', content: "1st Round: Coding Test held by Hacker Rank." },
  { type: 'paragraph', content: "Given string str, the task is to check whether the given string is valid IFSC (Indian Financial System) Code. The valid IFSC (Indian Financial System) Code must satisfy the following conditions:" },
  { type: 'list', items: ["It should be 11 characters long.", "The first four characters should be upper case alphabets.", "The fifth character should be 0.", "The last six characters usually numeric, but can also be alphabetic."] },
  { type: 'example', title: 'Input: str = "SBIN0125620";', content: "Output: true\nExplanation:\nThe given string satisfies all the above mentioned conditions. Therefore it is a valid IFSC (Indian Financial System) Code." },
  { type: 'example', title: 'Input: str = "SBIN0125";', content: "Output: false\nExplanation:\nThe given string has 8 characters. Therefore it is not a valid IFSC (Indian Financial System) Code." },
  { type: 'example', title: 'Input: str = "1234SBIN012";', content: "Output: false\nExplanation:\nThe given string doesn\\'t starts with alphabets. Therefore it is not a valid IFSC (Indian Financial System) Code." },
  { type: 'paragraph', content: "Have to pass the Test cases.(Atleast 2 Test cases out of 7)" },
  { type: 'paragraph', content: "Please practice coding in Hacker Rank before attending the interview. So that it will be easy for you to understand the exam pattern." },
  { type: 'paragraph', content: "From 2nd round on wards Elimination rounds." },
  { type: 'heading', content: "2nd round: Cognitive Ability Test Games." },
  { type: 'paragraph', content: "30 minutes to complete IBM's game-based cognitive ability assessment." },
  { type: 'paragraph', content: "If you clear the Cognitive Ability Test Games round, you will be invited to Learning Agility Assessment. Describe yourself as you generally are now, not as you wish to be in the future." },
  { type: 'paragraph', content: "For each statement please indicate whether you:" },
  { type: 'list', items: [
      "1) Strongly Disagree with the statement as a description of you;",
      "2) Disagree with the statement as a description of you;",
      "3) Slightly Disagree with the statement as a description of you;",
      "4) Neither Agree nor Disagree with the statement as a description of you;",
      "5) Slightly Agree with the statement as a description of you;",
      "6) Agree with the statement as a description of you;",
      "7) Strongly Agree with the statement as a description of you."
  ]},
  { type: 'paragraph', content: "Based on the question we have select the options." },
  { type: 'paragraph', content: "If you clear Learning agility test, you will be invited to English Language Assessment. English Language Assessment(15 mins)." },
  { type: 'paragraph', content: "Simple Grammer related questions and Spellings are given with multiple choice.(easy round)." },
  { type: 'paragraph', content: "I cleared that round and they told me to attend for the interview next day." },
  { type: 'heading', content: "HR Round:" },
  { type: 'paragraph', content: "They ask some basic Java questions." },
  { type: 'paragraph', content: "HR questions:" },
  { type: 'list', items: ["Tell me about yourself.", "why IBM?", "About IBM?", "Hobbies?", "Where do you see yourself in the next five years?", "Why should I hire you?"] },
  { type: 'paragraph', content: "On Jan 13th I got a mail from IBMer to fill Background check forms. On March 9th I joined in IBM." },
  { type: 'paragraph', content: "Never give up. Have to be patient to clear the rounds. :)" },
  { type: 'paragraph', content: "All the best." }
];

// --- Component for the Company Info Footer section ---
const CompanyInfo = () => (
    <div className="bg-slate-100 p-6 rounded-lg mt-12 flex items-center gap-6">
        {/* CORRECTED: Replaced the SVG logo with a styled text element */}
        <div className="text-3xl font-bold text-blue-600 tracking-wider">
            IBM
        </div>
        <div>
            <h3 className="text-lg font-bold text-green-600">IBM</h3>
            <a href="https://www.ibm.com/in/en" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">
                www.ibm.com/in/en
            </a>
        </div>
    </div>
);

// --- MAIN PAGE COMPONENT ---
export default function IBMInterviewPage() {
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
                    IBM
                </h1>
                <p className="mt-2 text-lg text-gray-800 font-semibold">IBM Interview Pattern - Hyderabad & December 23rd 2019</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Posted by : Pranavi</span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <Heart size={14} className="text-red-400" />
                        <span>(81)</span>
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
                  return <h2 key={index} className="text-xl font-bold text-gray-900 pt-4">{item.content}</h2>;
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
                if (item.type === 'example') {
                    return (
                        <div key={index} className="bg-gray-100 p-4 rounded-md my-4">
                            <p className="font-mono text-gray-800 font-semibold">{item.title}</p>
                            <p className="text-gray-700 whitespace-pre-line mt-2">{item.content}</p>
                        </div>
                    );
                }
                return null;
              })}
            </div>
        </div>
        
        <CompanyInfo />
        
      </main>
    </div>
  );
}