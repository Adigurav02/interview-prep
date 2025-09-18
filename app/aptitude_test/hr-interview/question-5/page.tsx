"use client";

import Link from "next/link";
import { ArrowLeft, ThumbsUp } from 'lucide-react';

// --- DATA: User-submitted answers for "What is the difference between confidence and over confidence?" ---
const userAnswers = [
  {
    author: "DDGIRI",
    time: "2 weeks ago",
    likes: 4,
    content: [
      "Confidence means believing in your abilities while still being open to learning and improving.",
      "Overconfidence is when someone believes they know everything and stops listening or learning.",
      "For example, confidence says 'I can do this task if I prepare well,' while overconfidence says 'I don't need to prepare, I already know everything.'"
    ]
  },
  {
    author: "Gaurav Maheshwari",
    time: "3 weeks ago",
    likes: 1,
    content: [
      "Confidence is characterised by having positive and realistic beliefs in your abilities.",
      "Overconfidence is when you have an excessive belief in your abilities; it can cause you to underestimate something and make mistakes."
    ]
  },
  {
    author: "Roushan Raj",
    time: "4 weeks ago",
    likes: 2,
    content: [
      "Confidence is belief backed by preparation.",
      "Overconfidence is a belief that occurs without adequate preparation or awareness of risks."
    ]
  },
  {
    author: "Asmin Khatoon",
    time: "1 month ago",
    likes: 5,
    content: [
      "Confidence is when we feel sure about our actions and make the right decisions.",
      "We believe in our ability to do something and have faith in ourselves.",
      "On the other hand, overconfidence is excessive belief in our abilities, overlooking the fact that we can be wrong too."
    ]
  },
  {
    author: "RAMVIKESH V",
    time: "2 months ago",
    likes: 9,
    content: [
      "Confidence is when we feel sure about our actions and make the right decisions.",
      "We believe in our ability to do something and have faith in ourselves. On the other hand, overconfidence is excessive belief in our abilities, overlooking the fact that we can be wrong too."
    ]
  },
  {
    author: "Shailendra Pratap kushwaha",
    time: "2 months ago",
    likes: 46,
    content: [
      "Confidence means I can do this work, while overconfidence means only I can do this work."
    ]
  },
  {
    author: "Anish kumar",
    time: "3 months ago",
    likes: 31,
    content: [
      "Confidence is when I believe I can achieve something because I have prepared for it, and I know my strengths.",
      "Overconfidence occurs when I assume I can achieve something without proper preparation and ignore my limitations. Although I believe confidence builds careers, overconfidence can also destroy opportunities. So, I choose to stay grounded and keep learning."
    ]
  },
  {
    author: "Dhruv",
    time: "4 months ago",
    likes: 24,
    content: [
      "Confidence is knowing you studied well and saying you'll do your best in the exam; overconfidence is saying you'll top the exam without learning properly."
    ]
  },
  {
    author: "Sivabalan P.",
    time: "5 months ago",
    likes: 47,
    content: [
      "According to me, Confidence is the reflection of practice and overconfidence is the reflection of mental pressure."
    ]
  },
  {
    author: "Lavanya manthina",
    time: "6 months ago",
    likes: 58,
    content: [
      "Confidence is based on facts and knowledge. Overconfidence is based on speculation.",
      "There is a small difference between confidence and overconfidence.",
      "Yes, I can do this work, is self-confidence but only I can do this work is overconfidence or you can say that confidence is an internal belief that I am the right person for this job.",
      "Overconfidence is thought that I am only the right person for this job."
    ]
  }
];

// --- MAIN PAGE COMPONENT ---
export default function ConfidenceVsOverconfidencePage() {
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
                    What is the difference between confidence and over confidence?
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