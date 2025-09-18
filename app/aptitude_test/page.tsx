"use client";

import Link from "next/link";
import React from "react";

// --- Custom SVG Icons to match the example ---
const GeneralAptitudeIcon = () => (<svg className="w-28 h-28 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>);
const ReasoningIcon = () => (<svg className="w-28 h-28 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9.5 16.5l7-4.5-7-4.5v9z"/></svg>);
const GkIcon = () => (<svg className="w-28 h-28 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v4z"/></svg>);
const InterviewIcon = () => (<svg className="w-28 h-28 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>);
const EngineeringIcon = () => (<svg className="w-28 h-28 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8.41L13.41 7 12 5.59 10.59 7 12 8.41zM7 10.59L8.41 12 7 13.41 5.59 12 7 10.59zM12 13.59L10.59 15 12 16.41 13.41 15 12 13.59zM17 10.59L18.41 12 17 13.41 15.59 12 17 10.59zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>);
const ProgrammingIcon = () => (<svg className="w-28 h-28 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>);
const OnlineTestIcon = () => (<svg className="w-28 h-28 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM6 17H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V7h2v2zm4 8H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V7h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2zm4 4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>);
const McqIcon = () => (<svg className="w-28 h-28 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>);
const ShortAnswerIcon = () => (<svg className="w-28 h-28 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>);
const MedicalIcon = () => (<svg className="w-28 h-28 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z"/></svg>);
const PuzzlesIcon = () => (<svg className="w-28 h-28 text-slate-100" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 11v-2h-2v2H9v2h2v2h2v-2h2v-2h-2zm-1-9L18 8h-5V3z"/></svg>);

// --- Helper function to convert text to a URL-friendly slug (kebab-case) ---
const toKebabCase = (str: string) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// --- Data for all 12 cards, with SVG icons ---
const aptitudeCategories = [
  { title: "General Aptitude", icon: <GeneralAptitudeIcon />, links: ["Arithmetic Aptitude", "Data Interpretation Test"] },
  { title: "Current Affairs & GK", icon: <GkIcon />, links: ["Current Affairs", "Basic General Knowledge", "General Science"] },
  { title: "Interview", icon: <InterviewIcon />, links: ["Placement Papers", "HR Interview"] },
  { title: "Engineering", icon: <EngineeringIcon />, links: ["Mechanical Engineering", "Civil Engineering"] },
  { title: "Programming", icon: <ProgrammingIcon />, links: ["C Programming", "Java Programming"] },
  { title: "Technical MCQs", icon: <McqIcon />, links: ["Networking Questions", "Database Questions"] },
  { title: "Medical Science", icon: <MedicalIcon />, links: ["Microbiology", "Biotechnology"] },
  { title: "Puzzles", icon: <PuzzlesIcon />, links: ["Sudoku", "Number puzzles", "Logical puzzles"] },
];

// --- Reusable Card Component with refined styling ---
const CategoryCard = ({ title, icon, links }: { title: string, icon: React.ReactNode, links: string[] }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 flex flex-col">
            <div className="absolute -right-5 -bottom-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {icon}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-800 mb-4">{title}</h2>
            <ul className="space-y-2.5 relative mb-6 flex-grow">
                {links.map((link, index) => (
                    <li key={index}>
                        {/* CORRECTED LINK with the underscore to match folder name */}
                        <Link href={`/aptitude_test/${toKebabCase(link)}`} className="text-slate-600 hover:text-green-600 font-medium text-base transition-colors">
                            {link}
                        </Link>
                    </li>
                ))}
            </ul>
             <Link href="#" className="text-green-600 hover:text-green-800 text-sm font-bold flex items-center gap-2 self-start group/readmore">
                Read more
                <span className="transition-transform group-hover/readmore:translate-x-1">→</span>
            </Link>
        </div>
    );
};

export default function AptitudeTestPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="text-left mb-12 pb-4 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome to Prepwise Aptitude
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Aptitude questions and answers for your placement interviews and competitive exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aptitudeCategories.map(category => (
                <CategoryCard 
                    key={category.title}
                    title={category.title}
                    icon={category.icon}
                    links={category.links}
                />
            ))}
            <div /> 
        </div>
      </main>
    </div>
  );
}