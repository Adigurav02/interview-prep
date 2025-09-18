"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from 'lucide-react';

// --- DATA: This data is specific to the Capgemini Interview Experience page ---
const experienceContent = [
  "Hi guys, Capgemini visited our campus (BIT bangalore) on 14/9/18. All the Engineering branches were allowed to write the test(no idea why). Around 300 people showed up.",
  "The online test consist of 16 quants and 16 logical reasoning and one essay writing. For the quants and logical section just go through Indiabix(more than enough).",
  "The next one was essay. 149 min words and 182 max words. Don\\'t focus on the content, just make sure you NEVER use backspace and after a comma or full stop give space and continue writing.",
  "Around 31 cleared the test and I was among them. The next round was Pseudo code. (job description was Analyst with a package of 3.5L p.a). I had no about C-lang but questions were on Data structures and Pseudo code. They were straight forward questions.",
  "Around 15-20 people cleared it and they went for the interview process(TR+HR).",
  "Basic C questions and questions on resume and projects were asked and general HR questions.",
  "So prepare well guys :) P.S( I couldn\\'t clear pseudo round and I will update on Indiabix when I get a job.(same guy who uploaded accenture paper))."
];


// --- MAIN PAGE COMPONENT ---
export default function CapgeminiInterviewPage() {
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
                <div className="flex justify-center items-center mb-4">
                    {/* A simple text representation of the logo */}
                    <span className="text-3xl font-bold text-blue-600">Capgemini</span>
                </div>
                <p className="mt-2 text-lg text-gray-800 font-semibold">Capgemini Interview Experience - Bangalore, 14/09/2018</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Posted by : Hugger</span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <Heart size={14} className="text-red-400" />
                        <span>(250)</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {experienceContent.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
}