"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from 'lucide-react';

// --- DATA: This data is specific to the Deloitte Placement Paper page ---

const paperContent = [
  { type: 'paragraph', content: "Deloitte was the first company who visited our college for placements on July 18th, 2023. The position they were offering was Audit Assistant. They briefed us about the tests/group discussion/ interviews." },
  { type: 'paragraph', content: "We had our first round, which was AMCAT scheduled on 1st August. I was really worried and focused on passing this, because I knew it would eliminate majority of us. It had four subjects:" },
  {
    type: 'list',
    items: [
      "Quantitative Aptitude (20 Min)",
      "Logic (15 Min)",
      "Verbal Ability (15 Min)",
      "Finance and Accounting (25 Min) (this last subject is subjective to your course, since I come from a commerce background I had Finance and Accounting, if you're an engineering student you'll probably have Computers and Coding)"
    ]
  },
  { type: 'paragraph', content: "I used R.S Aggarwal's Quantitative Aptitude, to study and it helped me A LOT. I also used websites like IndiaBix for revising questions in Logic and Verbal. I have to give complete credit to this website for helping me clear this round :)" },
  { type: 'paragraph', content: "Even if you're confident, of clearing this round without studying, it would still be better to practice as the time won't feel sufficient at all. I missed my last question in Quantitative cause I ran out of time. I finished just in time for Logic and Finance." },
  { type: 'paragraph', content: "So, you need to be mindful of the time always and work on solving as quickly as possible. You also cannot change your answer once you choose, so choose your answer carefully." },
  { type: 'paragraph', content: "We had 150 students registered and we had 30 students who cleared this exam. I'm grateful that I was among them. The next rounds were Group Discussion and Interviews and they were on the same day, the 8th of August, 2023." },
  { type: 'paragraph', content: "Group Discussion: We had 8 students in our group. So, we had an average of 4 groups. The key to clearing this round is speaking confidently and being present. It's easier to be clear because you're conversing with your group members, like a group project. Don't cut any student when they are speaking. Be casual and be aware of the fact that you're being judged but don't think too much about it(you'll be nervous otherwise). This round lasted for 20 min approx. All 8 of us from our group cleared this round:)" },
  { type: 'paragraph', content: "Which further proves that they don't necessarily, look for students to eliminate, if you fulfill the criteria that they look for. But they did eliminate students from other groups. 22 students cleared this round and the next was the final, the interview." },
  { type: 'heading', content: "The Interview:" },
  { type: 'paragraph', content: "Let me begin, by the fact that we were being interviewed by Professionals. And they made us aware of that but also kept us very much at ease during the interview. They were super kind and nice. Like I cannot stress this enough." },
  { type: 'paragraph', content: "As I entered the room, the interviewer asked me if this was my first interview ever, which it was. She then assured me that it's fine, and asked me how I was feeling. She then moved onto general questions like Tell me About Yourself etc. They also asked me Technical questions from my Resume." },
  { type: 'paragraph', content: "I would like to make a point here and say, please MEMORISE your resume. And make questions from your resume and ask yourself. They connect your answers to the next questions. They asked me a few more basic accounting questions which I answered. I did get one of my technical questions wrong, however." },
  { type: 'paragraph', content: "My interview lasted for 12-15 Min. As it ended I realized it was quite short and I was surprised. There were other students, for whom the interview lasted for 30 Min, so I was worried that, they weren't interested." },
  { type: 'paragraph', content: "One hour later, after they finished everyone's interviews, they sent a list of students that were NOT selected. I could not believe my name was not on that list. Which meant I was selected. It was so surreal at that moment and it still is. It's been almost a month since this day, but the feeling has still not sunk in. It will probably hit me when I actually start working." }
];

// --- MAIN PAGE COMPONENT ---
export default function DeloittePlacementPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="flex items-start gap-4 mb-8">
            <Link href="/aptitude_test/placement-papers" className="text-gray-500 hover:text-gray-900 transition-colors mt-1">
                <ArrowLeft size={28} />
            </Link>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md">
            {/* Header Section */}
            <div className="text-center mb-10 pb-6 border-b border-gray-200">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Deloitte.</h1>
                <p className="mt-2 text-lg text-gray-600 font-semibold">Deloitte Placement Paper</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Posted by : Anonymous</span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <Heart size={14} className="text-red-400" />
                        <span>(141)</span>
                    </div>
                </div>
            </div>

            {/* Content Section with Direct Styling */}
            <article className="space-y-6">
              {paperContent.map((item, index) => {
                if (item.type === 'paragraph') {
                  return (
                    <p key={index} className="text-lg text-gray-800 leading-relaxed">
                      {item.content}
                    </p>
                  );
                }
                if (item.type === 'list') {
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 pl-2">
                      {item.items.map((listItem, liIndex) => (
                        <li key={liIndex} className="text-lg text-gray-800 leading-relaxed">
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (item.type === 'heading') {
                    return (
                        <h2 key={index} className="text-2xl font-bold text-gray-900 pt-4">
                            {item.content}
                        </h2>
                    );
                }
                return null;
              })}
            </article>
        </div>
      </main>
    </div>
  );
}