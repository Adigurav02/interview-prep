"use client";

import Link from "next/link";
import { ArrowLeft, ThumbsUp } from 'lucide-react';

// --- DATA: User-submitted answers for "Why should I hire you?" ---
const userAnswers = [
  {
    author: "System",
    time: "1 day ago",
    likes: 0,
    content: [
      "You should hire me because I am a very good person and have very good knowledge of understanding."
    ]
  },
  {
    author: "Sumit singh",
    time: "1 day ago",
    likes: 1,
    content: [
      "You can consider hiring me because.",
      "I have good skills and dedication according whatever you want, and I contribute 100% of myself because I have a great interest in completing tasks I enjoy with my work and good in take responsibility for any task."
    ]
  },
  {
    author: "Manu Priya P",
    time: "1 day ago",
    likes: 0,
    content: [
      "You should hire me because I am a fast learner and always make sure to finish my tasks before the deadline. Whatever work is assigned to me, I give my best effort."
    ]
  },
  {
    author: "Bindu Sri goltapalli",
    time: "1 day ago",
    likes: 0,
    content: [
      "Sir, I have the Abilities that believe the abilities without an opportunity, there is nothing.",
      "So if you give me a chance, I will work my best and increase the growth of our company with my limited capabilities."
    ]
  },
  {
    author: "Mechanical Boba",
    time: "3 days ago",
    likes: 2,
    content: [
      "You should hire me because I have both technical knowledge and practical experience.",
      "During my B.Tech in Mechanical Engineering, I gained good knowledge of core subjects, and during my internship, I worked on real industrial problems like the suspension system of LHB bogies. I am a quick learner, hardworking, and always ready to take responsibility.",
      "Along with this, I also have leadership skills from my scout experience, which help me work well in a team. I believe I can contribute positively to your company with my skills, dedication, and willingness to learn new things."
    ]
  },
  {
    author: "PRAJINA D P",
    time: "5 days ago",
    likes: 8,
    content: [
      "I think my skills and knowledge match to the company requirements.",
      "I am confident that I will be able to contribute to more projects from the beginning while continuously learning and growing.",
      "My adaptability and eagerness to work in this specific role will add value to your team and help the company achieve its goals."
    ]
  },
  {
    author: "Payal Gautam More",
    time: "1 week ago",
    likes: 2,
    content: [
      "I have the skills, predication, I bring fresh energy, a strong work ethic because I can work using experience, communication, time management, problem solving, and technical skills. I bring fresh energy to work."
    ]
  },
  {
    author: "Gopi",
    time: "2 weeks ago",
    likes: 10,
    content: [
      "I just need the right opportunity. With my skills and willingness to learn, I will work smartly and add value to the company's success."
    ]
  },
  {
    author: "Darla Geethika",
    time: "2 weeks ago",
    likes: 17,
    content: [
      "I believe that ability without opportunity is nothing. If given the chance, I will work smartly and contribute to the company's growth."
    ]
  },
  {
    author: "Kandur shruthi",
    time: "3 weeks ago",
    likes: 23,
    content: [
      "You should hire me.",
      "Because I have the ability, but ability is nothing without opportunity. but if you give me a chance. So, I will work smartly and complete the task within the period."
    ]
  }
];

// --- MAIN PAGE COMPONENT ---
export default function WhyShouldIHireYouPage() {
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
                    Why should I hire you?
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