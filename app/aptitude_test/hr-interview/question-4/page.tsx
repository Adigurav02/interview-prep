"use client";

import Link from "next/link";
import { ArrowLeft, ThumbsUp } from 'lucide-react';

// --- DATA: User-submitted answers for "Why do you want to work at our company?" ---
const userAnswers = [
  {
    author: "Dhriti Oswal",
    time: "3 days ago",
    likes: 1,
    content: [
      "My goal is to secure a position in XYZ company where I can grow professionally, contribute meaningfully, and work toward a higher role within the same organisation over time. It's a great privilege for anyone to work in a reputed company like yours. I have gone through your company profile."
    ]
  },
  {
    author: "Payal Gautam More",
    time: "1 week ago",
    likes: 31,
    content: [
      "My goal is to secure a position in XYZ company where I can grow professionally, contribute meaningfully, and work toward a higher role within the same organisation over time. It's a great privilege for anyone to work in a reputed company like yours. I have gone through your company profile."
    ]
  },
  {
    author: "DDGIRI",
    time: "2 weeks ago",
    likes: 61,
    content: [
      "I want to work at your company because it has a strong reputation for innovation and excellence in technology solutions. I admire how your team works on real-world data projects, and I believe this is the right environment for me to learn, grow, and contribute.",
      "As a fresher, I am excited to apply my SQL and data analysis skills while also gaining valuable industry experience."
    ]
  },
  {
    author: "Giri",
    time: "2 weeks ago",
    likes: 31,
    content: [
      "I want to work here because your company values innovation and teamwork. Its a great place for me to apply my skills while learning from experienced professionals."
    ]
  },
  {
    author: "Darla Geethika",
    time: "2 weeks ago",
    likes: 111,
    content: [
      "I believe your organization is the ideal platform for freshers like me to grow, succeed in their careers, and contribute meaningfully to the company by working on innovative projects."
    ]
  },
  {
    author: "Gaurav Maheshwari",
    time: "3 weeks ago",
    likes: 31,
    content: [
      "I would love to work at your company because I believe this is the right place where I can use my strengths while also learning and growing. I resonates with the company's commitment towards innovation and creating meaningful impact.",
      "I am confident that I can make a positive contribution here."
    ]
  },
  {
    author: "Santhosh",
    time: "1 month ago",
    likes: 32,
    content: [
      "\"I want to work at Larsen & Toubro because it's a leader in engineering and technology with a legacy of innovation and excellence since 1938.",
      "The company's diverse projects—from infrastructure to digital solutions—offer opportunities to learn, grow, and contribute to impactful work that shapes communities.",
      "I'm inspired by L&T's focus on sustainability, global reach, and commitment to employee development, and I believe my skills and enthusiasm align well with your vision for delivering world-class solutions\"."
    ]
  },
  {
    author: "Asmin Khatoon",
    time: "1 month ago",
    likes: 6,
    content: [
      "I'm excited about the opportunity to join your company because of its strong reputation for innovation and excellence. I'm eager to be part of a team that values upskilling and professional growth, as it aligns with my career aspirations.",
      "By joining your company, I believe I'll have the chance to develop new skills, expand my knowledge, and contribute to meaningful projects.",
      "I'm confident that this opportunity will help me take my career to the next level and enable me to make a positive impact."
    ]
  },
  {
    author: "Raju",
    time: "2 months ago",
    likes: 7,
    content: [
      "I'm excited about the opportunity to join your company because of its strong reputation for innovation and excellence. I'm eager to be part of a team that values upskilling and professional growth, as it aligns with my career aspirations.",
      "By joining your company, I believe I'll have the chance to develop new skills, expand my knowledge, and contribute to meaningful projects.",
      "I'm confident that this opportunity will help me raise my career to the next level and enable me to make a positive impact."
    ]
  },
  {
    author: "Eshwar Vyas",
    time: "2 months ago",
    likes: 5,
    content: [
      "You should hire me because I bring consistency, efficiency, and adaptability to every task.",
      "I can understand complex problems quickly and provide accurate, well-structured solutions.",
      "I'm available 24/7, work well under pressure, and never stop learning. My goal is to support your success through my smart work."
    ]
  }
];

// --- MAIN PAGE COMPONENT ---
export default function WhyWorkAtOurCompanyPage() {
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
                    Why do you want to work at our company?
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