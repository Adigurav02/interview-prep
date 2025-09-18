"use client";

import Link from "next/link";
import { ArrowLeft, ThumbsUp } from 'lucide-react';

// --- DATA: User-submitted answers for "What are your strengths and weaknesses?" ---
const userAnswers = [
  {
    author: "Payal Patel",
    time: "3 days ago",
    likes: 1,
    content: [
      "My strength is that I am confident and can easily adapt to new environments.",
      "I sometimes focus so much on work that I forget to take breaks, but I've been improving my time management to stay balanced and productive."
    ]
  },
  {
    author: "Jithen M S",
    time: "6 days ago",
    likes: 5,
    content: [
      "My strength: I try to do my work without any mistakes, In under pressure I do my work perfectly, I tried handle the any situation easily without making any complex.",
      "My weakness is sometimes I will be over confidence like I am correct I am good."
    ]
  },
  {
    author: "Payal Gautam More",
    time: "1 week ago",
    likes: 1,
    content: [
      "My strength is I am an honest and safe motivating person, also I am a quick learner.",
      "I am very straightforward, and I trust people very quickly. I concentrate on one thing at a time."
    ]
  },
  {
    author: "Darla Geethika",
    time: "2 weeks ago",
    likes: 13,
    content: [
      "Strengths: I am a quick learner, highly adaptable to new environments, and capable of performing well under pressure while maintaining quality.",
      "Weakness: I tend to overthink at times because I strive for perfection in my work, but I am actively working on balancing quality with efficiency."
    ]
  },
  {
    author: "Abhishok",
    time: "2 weeks ago",
    likes: 1,
    content: [
      "Sir, I am a honest, self-motivated and hard-working boy with a positive attitude towards my life and my career. And also, I adapt to any situation very quickly."
    ]
  },
  {
    author: "Ayush Panwar",
    time: "2 weeks ago",
    likes: 3,
    content: [
      "My strengths include good communication and interpersonal skills, as I have to work with some people in an organisation, which also shows my teamwork efficiency and boosts my confidence.",
      "My weakness is that I am a detail-oriented person, but it becomes an opportunity for me as it helps me to generate more accurate results."
    ]
  },
  {
    author: "Gaurav Maheshwari",
    time: "3 weeks ago",
    likes: 3,
    content: [
      "Sir, my strengths include being a strong team player with solid leadership skills and effective problem-solving ability and the area.",
      "I am currently working on spending extra time perfecting the small details, and I easily get persuaded by people."
    ]
  },
  {
    author: "GS",
    time: "3 weeks ago",
    likes: 5,
    content: [
      "My confidence is my strength, and I cannot say no easily; my shy nature is my weakness."
    ]
  },
  {
    author: "Rajagopalb",
    time: "1 month ago",
    likes: 40,
    content: [
      "My strengths include being honest and trustworthy, as well as being well-versed in automotive technology, a quick learner, and a problem solver.",
      "My weakness is being overly detail-oriented in project presentations, which leads to more time spent understanding. Overthinking, trust everyone. Can not say no to others."
    ]
  },
  {
    author: "Jothika",
    time: "1 month ago",
    likes: 13,
    content: [
      "My strength: I am self-motivated and a team player, and I can easily convey the message.",
      "My Weakness: Open talk and trust everyone."
    ]
  }
];

// --- MAIN PAGE COMPONENT ---
export default function StrengthsAndWeaknessesPage() {
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
                    What are your strengths and weaknesses?
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