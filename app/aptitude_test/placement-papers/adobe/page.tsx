"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from 'lucide-react';

// --- DATA: This data is specific to the Adobe Sample Paper page ---

const paperContent = [
  { type: 'heading', content: 'ADOBE Sample Paper' },
  { type: 'paragraph', content: 'I got lot of queries about the kind of questions asked in Adobe test.' },
  { type: 'paragraph', content: 'There were four section:' },
  { 
    type: 'section', 
    number: 1, 
    title: 'Aptitude', 
    text: 'They had fairly simple arithmatic question, questions on geometry and questions like whether information can be deduced from the comments given.' 
  },
  { type: 'paragraph', content: 'It was fairly easy and jst u need to have basic clear.' },
  { 
    type: 'section', 
    number: 2, 
    title: 'Analytical', 
    text: 'Questions like pattern matching, odd one out were there. Be careful while attempting these two sections that u wont be having much time. Before u know the time is over.' 
  },
  { 
    type: 'section', 
    number: 3, 
    title: 'Computers', 
    text: 'This paper is mostly from the topics u cover in B.Tech. there was one question on finite automata, Bit manipulation(flipping the bits), drawing the tree given preorder and inorder traversal, finding the formula for N-ary tree to fine number of external nodes.' 
  },
  { 
    type: 'section', 
    number: 4, 
    title: 'C/Java', 
    text: 'Here u had to write C programs(Mind u no multiple questions). There was one question to write program to search a string from bigger string, write a algorithm to compute X^n which is of complexity log n, implement atoi function.(U cannot use any standard function in these.)' 
  }
];

// --- Adobe Logo Component ---
const AdobeLogo = () => (
    <div className="w-12 h-12 bg-red-600 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.58 3H22v18h-7.42V3zM9.42 3H17v18H9.42V3zM2 3h7.42v18H2V3z" />
        </svg>
    </div>
);


// --- MAIN PAGE COMPONENT ---
export default function AdobeSamplePaperPage() {
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
                    <AdobeLogo />
                </div>
                <p className="mt-2 text-lg text-gray-800 font-semibold">ADOBE - Sample Paper Pattern</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Posted by : Star</span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <Heart size={14} className="text-red-400" />
                        <span>(39)</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {paperContent.map((item, index) => {
                if (item.type === 'heading') {
                  return <h2 key={index} className="text-2xl font-bold text-gray-900">{item.content}</h2>;
                }
                if (item.type === 'paragraph') {
                  return <p key={index} className="text-lg text-gray-800 leading-relaxed">{item.content}</p>;
                }
                if (item.type === 'section') {
                  return (
                    <div key={index}>
                      <p className="text-lg text-gray-800 leading-relaxed">
                        <span className="font-bold">{item.number}. {item.title}:</span> {item.text}
                      </p>
                    </div>
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