"use client";

import { useState } from 'react';
import { ChevronDown, Info, Briefcase, Flame } from 'lucide-react';

// --- Data for the FAQ section ---
const faqData = [
  { question: "What's Job AI?", answer: "Job AI is an advanced tool that uses artificial intelligence to scan thousands of job postings and match you with roles that are a perfect fit for your skills and experience. It saves you time and helps you discover opportunities you might have missed." },
  { question: "How does it work?", answer: "You provide your resume or key skills, and our AI analyzes the information. It then compares your profile against a vast database of live job openings to find the ones where you have the highest chance of success." },
  { question: "What's the cost?", answer: "Access to the Job Finder AI is included in our one-time purchase of $29. This gives you lifetime access to this tool and all other features on our platform. No subscriptions, no hidden fees." },
  { question: "What kind of questions will I see?", answer: "This page is for our Job Finder AI. If you are looking for interview questions, please visit our 'Interview Questions' page to practice with AI for specific roles and companies." },
  { question: "Can I use this for different jobs?", answer: "Absolutely. You can tailor your profile for different job targets. For example, you can have a profile focused on 'Frontend Development' and another on 'Project Management' to get tailored job matches for each." },
  { question: "How do I start?", answer: "Simply sign up, navigate to the Job Finder AI tool, upload your resume or enter your skills, and let the AI do the work. You'll start seeing matched job opportunities within minutes." },
  { question: "Does it cover all interview stages?", answer: "Job Finder AI is focused on the first stage: finding the right job to apply for. For later stages, we recommend our 'Interview Co-Pilot' and 'Interview Questions' tools to prepare for the actual interviews." },
  { question: "How fast do I get the questions?", answer: "Job matches are delivered in near real-time. As soon as our AI finds a role that fits your profile, it will appear on your dashboard. This page, however, focuses on the Job Finder tool itself." },
  { question: "Can I save my answers?", answer: "This tool is for finding jobs, not answering questions. You can save the jobs you are interested in. The ability to save answers is part of our 'Interview Questions' practice tool." },
  { question: "Running low on tokens?", answer: "Our platform uses a one-time payment model, not tokens. Once you purchase access for $29, you have unlimited use of the Job Finder AI and all other tools forever." },
  { question: "Works for any industry?", answer: "Yes, our AI is trained on a massive dataset covering virtually every industry, from tech and finance to healthcare and creative fields. If the job is posted online, our AI can likely find it." },
  { question: "What about technical roles?", answer: "The Job Finder AI is especially powerful for technical roles. It understands the nuances between different programming languages, frameworks, and technical skills to provide highly accurate matches." },
  { question: "How many questions per job?", answer: "While this tool finds jobs for you, our 'Interview Questions' tool typically has hundreds of questions available for each job role, covering technical, behavioral, and situational topics." },
  { question: "Why is this better than regular prep?", answer: "Traditional job searching is time-consuming. Our Job Finder AI automates the most difficult part—finding the perfect fit—so you can spend your valuable time preparing for interviews, not endlessly scrolling through job boards." },
];

// --- Reusable Accordion Item Component ---
const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-4 sm:p-5 font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
      >
        {question}
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-green-600' : ''}`}
          size={20}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="p-4 sm:p-5 pt-0 text-gray-600">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function JobFinderFeaturePage() {
  return (
    <div className="bg-white min-h-screen text-gray-800">
      <main className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        
        {/* ==================================== */}
        {/* ===== NEW FEATURE HIGHLIGHT SECTION ===== */}
        {/* ==================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Left Column: Text Content */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Practice Until You're Confident, Not Just Prepared.
            </h1>
            <p className="text-lg text-gray-600">
              Our JobAI reads between the lines of the job post to show you what interviewers want to know. From required skills to company values - we help you prepare for every question they might ask.
            </p>
            <p className="text-lg text-gray-600">
              Get instant feedback on your answers - from structure to specific examples. Know exactly what's working and what needs improvement before the real interview.
            </p>
          </div>

          {/* Right Column: Graphic Illustration */}
          <div className="relative flex justify-center items-center">
            {/* The main machine body */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
              {/* Card coming out the top */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md px-6 py-2 border border-gray-200">
                <p className="font-bold text-gray-800">Tom Mylan</p>
                <p className="text-sm text-gray-500">Project Manager</p>
              </div>

              {/* Green Screen */}
              <div className="bg-lime-300/80 rounded-lg p-3 text-center border-2 border-lime-400/50">
                <p className="text-xs font-bold text-green-900 tracking-widest">THE DIFFICULTY LEVEL IS BEING INCREASED</p>
                <div className="w-full h-6 bg-lime-400/50 rounded-full mt-2 flex items-center px-1">
                   <div className="h-4 bg-lime-600 rounded-full w-3/4 animate-pulse"></div>
                </div>
                 <p className="text-xs font-bold text-green-900 mt-1 text-right pr-2">HARD</p>
              </div>

              {/* Speaker Grilles and Start Button */}
              <div className="flex justify-between items-center mt-6">
                <div className="w-16 h-16 bg-gray-200/50 rounded-lg"></div>
                <button className="bg-gray-800 text-white font-bold text-xl px-12 py-4 rounded-lg shadow-lg flex items-center gap-3 transform hover:scale-105 transition-transform">
                  <Flame size={24} className="text-orange-400" />
                  START
                </button>
                <div className="w-16 h-16 bg-gray-200/50 rounded-lg"></div>
              </div>
            </div>

            {/* Question card coming out the bottom */}
            <div className="absolute -bottom-20 bg-white shadow-2xl rounded-lg p-6 w-[90%] max-w-sm border border-gray-200 transform rotate-[-3deg]">
              <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">Hard</span>
              <p className="font-semibold text-gray-800">
                Discuss the significance of 'Big O' notation in software development?
              </p>
              <div className="mt-4">
                <span className="flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 w-fit">
                  <Info size={14}/> Technical
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2"><Briefcase size={14}/> Job Types</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-600">Data Analyst</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-600">Marketer</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-md bg-gray-100 text-gray-600">General</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================== */}
        {/* ===== EXISTING FAQ SECTION ===== */}
        {/* ==================================== */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Get clear answers to your questions, so you can focus on what matters, acing your interviews with confidence.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </main>
    </div>
  );
}