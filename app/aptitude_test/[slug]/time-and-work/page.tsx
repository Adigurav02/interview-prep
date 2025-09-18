"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Time and Work page ---

const formulasContent = [
  { type: 'heading', text: '1. Work from Days:' },
  { type: 'textWithFormula', text: 'If A can do a piece of work in n days, then A\'s 1 day\'s work =', formula: '1/n' },
  { type: 'heading', text: '2. Days from Work:' },
  { type: 'textWithFormula', text: 'If A\'s 1 day\'s work = 1/n, then A can finish the work in', formula: 'n days' },
  { type: 'heading', text: '3. Ratio:' },
  { type: 'text', text: 'If A is thrice as good a workman as B, then:' },
  { type: 'text', text: 'Ratio of work done by A and B = 3 : 1.' },
  { type: 'text', text: 'Ratio of times taken by A and B to finish a work = 1 : 3.' },
];

const generalQuestions = [
  {
    question: "A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is:",
    options: ["1/4", "1/10", "7/15", "8/15"],
    answer: "D",
    explanation: [
      { type: 'formula', content: "A's 1 day's work = 1/15;" },
      { type: 'formula', content: "B's 1 day's work = 1/20;" },
      { type: 'formula', content: "(A + B)'s 1 day's work = (1/15 + 1/20) = 7/60" },
      { type: 'formula', content: "(A + B)'s 4 day's work = (7/60 * 4) = 7/15" },
      { type: 'text', content: 'Therefore, Remaining work =' },
      { type: 'formula', content: '(1 - 7/15) = 8/15' },
    ]
  },
  {
    question: "A can lay railway track between two given stations in 16 days and B can do the same job in 12 days. With help of C, they did the job in 4 days only. Then, C alone can do the job in:",
    options: ["9 1/5 days", "9 2/5 days", "9 3/5 days", "10 days"],
    answer: "C",
    explanation: [
      { type: 'formula', content: "(A + B + C)'s 1 day's work = 1/4" },
      { type: 'formula', content: "A's 1 day's work = 1/16" },
      { type: 'formula', content: "B's 1 day's work = 1/12" },
      { type: 'formula', content: "C's 1 day's work = 1/4 - (1/16 + 1/12) = 5/48" },
      { type: 'text', content: "So, C alone can do the work in 48/5 days = 9 3/5 days." },
    ]
  },
  {
    question: "A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?",
    options: ["12 days", "15 days", "16 days", "18 days"],
    answer: "B",
    explanation: [
      { type: 'formula', content: "A's 2 day's work = (1/20 * 2) = 1/10" },
      { type: 'formula', content: "(A + B + C)'s 1 day's work = (1/20 + 1/30 + 1/60) = 6/60 = 1/10" },
      { type: 'formula', content: "Work done in 3 days = (1/10 + 1/10) = 1/5" },
      { type: 'text', content: "Now, 1/5 work is done in 3 days." },
      { type: 'text', content: "Whole work will be done in (3 * 5) = 15 days." },
    ]
  },
  {
    question: "A is thrice as good a workman as B and therefore is able to finish a job in 60 days less than B. Working together, they can do it in:",
    options: ["20 days", "22 1/2 days", "25 days", "30 days"],
    answer: "B",
    explanation: [
      { type: 'text', content: 'Ratio of times taken by A and B = 1 : 3.' },
      { type: 'text', content: 'The time difference is (3 - 1) = 2 days while B takes 3 days and A takes 1 day.' },
      { type: 'text', content: 'If difference of time is 2 days, B takes 3 days.' },
      { type: 'formula', content: 'If difference of time is 60 days, B takes (3/2 * 60) = 90 days.' },
      { type: 'text', content: 'So, A takes 30 days to do the work.' },
      { type: 'formula', content: "(A + B)'s 1 day's work = (1/30 + 1/90) = 4/90 = 2/45" },
      { type: 'text', content: 'A and B together can do the work in 45/2 = 22 1/2 days.' },
    ]
  },
  {
    question: "A alone can do a piece of work in 6 days and B alone in 8 days. A and B undertook to do it for Rs. 3200. With the help of C, they completed the work in 3 days. How much is to be paid to C?",
    options: ["Rs. 375", "Rs. 400", "Rs. 600", "Rs. 800"],
    answer: "B",
    explanation: [
      { type: 'formula', content: "C's 1 day's work = 1/3 - (1/6 + 1/8) = 1/24" },
      { type: 'text', content: "A's wages : B's wages : C's wages = 1/6 : 1/8 : 1/24 = 4 : 3 : 1" },
      { type: 'formula', content: "C's share (for 3 days) = Rs. (1/8 * 3200) = Rs. 400" },
    ]
  }
];

const subPageLinks = [ "Time and Work - Formulas", "Time and Work - General Questions" ];
const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Unchanged) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { return ( <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn"> <div className="flex items-center gap-2"> <p className="font-bold text-gray-900">Answer: Option</p> <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"> <span className='font-sans font-semibold text-xs text-white'>{answer}</span> </div> </div> <div> <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3> <div className="space-y-3 text-gray-800"> {explanation.map((item, index) => { if (item.type === 'text') { return <p key={index}>{item.content}</p>; } if (item.type === 'formula') { return <p key={index} className="font-sans text-gray-900 text-center bg-slate-100 p-3 border border-slate-200 rounded">{item.content}</p>; } if (item.type === 'video') { return ( <p key={index} className="font-semibold pt-2"> Video Explanation: <Link href={item.content} target="_blank" className="text-blue-600 hover:underline">{item.content}</Link> </p> ); } return null; })} </div> </div> </div> ); };
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => { return ( <div className="flex justify-center items-center gap-2 mt-8"> {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => ( <button key={num} onClick={() => onPageChange(num)} className={`px-4 py-2 text-sm font-semibold border rounded-md transition-colors ${currentPage === num ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`} > {num} </button> ))} </div> ); };


// --- MAIN PAGE COMPONENT ---
export default function TimeAndWorkPage() {
  const [activeSubPage, setActiveSubPage] = useState(toKebabCase(subPageLinks[0]));
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleAnswers, setVisibleAnswers] = useState<number[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>({});
  const questionsPerPage = 5;

  const handleToggleAnswer = (questionIndex: number) => {
    setVisibleAnswers(prev => 
      prev.includes(questionIndex) 
        ? prev.filter(index => index !== questionIndex)
        : [...prev, questionIndex]
    );
  };

  const handleOptionClick = (questionIndex: number, selectedOptionChar: string) => {
    if (selectedAnswers[questionIndex]) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedOptionChar,
    }));
  };
  
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = generalQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(generalQuestions.length / questionsPerPage);

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Time and Work</span></p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
              <nav className="space-y-1">
                {subPageLinks.map(linkText => {
                  const linkSlug = toKebabCase(linkText);
                  const isActive = activeSubPage === linkSlug;
                  return (
                    <button
                      key={linkText}
                      onClick={() => { setActiveSubPage(linkSlug); setCurrentPage(1); setVisibleAnswers([]); setSelectedAnswers({}); }}
                      className={`w-full flex items-center gap-3 p-2 rounded-md text-left text-sm font-medium transition-colors ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      {isActive ? <CheckSquare size={16} /> : <Square size={16} />}
                      {linkText}
                    </button>
                  );
                })}
              </nav>
            </aside>
            <div className="md:col-span-3">
              {activeSubPage.includes('formulas') && (
                <div className="space-y-6 text-gray-800">
                  {formulasContent.map((item, index) => (
                    <div key={index}>
                      {item.type === 'heading' && <h2 className="text-xl font-bold text-gray-900">{item.text}</h2>}
                      {item.type === 'formula' && <p className="font-sans text-gray-800 bg-slate-100 p-4 rounded-md border border-slate-200 text-center">{item.formula}</p>}
                      {item.type === 'text' && <p className="text-gray-700">{item.text}</p>}
                      {item.type === 'textWithFormula' && (
                        <div className='my-4'>
                           <p className="text-gray-700">{item.text}</p>
                           <p className="font-sans text-gray-800 bg-slate-100 p-4 rounded-md border border-slate-200 text-center mt-2">{item.formula}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {activeSubPage.includes('general-questions') && (
                <div className="space-y-8">
                  {currentQuestions.map((q, index) => {
                    const questionIndex = indexOfFirstQuestion + index;
                    const userSelectedOption = selectedAnswers[questionIndex];
                    const isAnswerVisible = visibleAnswers.includes(questionIndex) || !!userSelectedOption;

                    return (
                      <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                        <p className="mb-4 text-gray-900 font-medium">{questionIndex + 1}. {q.question}</p>
                        <div className="space-y-3">
                          {q.options.map((option, i) => {
                            const optionChar = String.fromCharCode(65 + i);
                            const isCorrect = optionChar === q.answer;
                            const isSelected = userSelectedOption === optionChar;
                            
                            let buttonStyle = 'border-gray-300 hover:bg-gray-100 text-gray-800';
                            let labelStyle = 'border-gray-400 text-gray-600';
                            let icon = null;

                            if (userSelectedOption) {
                                if (isCorrect) {
                                    buttonStyle = 'border-green-500 bg-green-50 text-green-800 font-semibold';
                                    labelStyle = 'border-green-600 bg-green-600 text-white';
                                    icon = <Check size={16} className="text-green-600 ml-auto" />;
                                } else if (isSelected) {
                                    buttonStyle = 'border-red-500 bg-red-50 text-red-800 font-semibold';
                                    labelStyle = 'border-red-600 bg-red-600 text-white';
                                    icon = <X size={16} className="text-red-600 ml-auto" />;
                                } else {
                                    buttonStyle = 'border-gray-200 bg-gray-50 text-gray-500';
                                    labelStyle = 'border-gray-300 text-gray-400';
                                }
                            }
                            
                            return (
                               <button 
                                  key={i} 
                                  onClick={() => handleOptionClick(questionIndex, optionChar)}
                                  disabled={!!userSelectedOption}
                                  className={`w-full flex items-center gap-3 p-3 text-left border rounded-lg transition-colors ${buttonStyle} ${userSelectedOption ? 'cursor-default' : 'cursor-pointer'}`}
                               >
                                 <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-sans font-semibold transition-colors ${labelStyle}`}>
                                   {optionChar}
                                 </div>
                                 <span>{option}</span>
                                 {icon}
                               </button>
                            );
                          })}
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button 
                            onClick={() => handleToggleAnswer(questionIndex)}
                            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <BookOpen size={16} className="text-gray-600"/>
                          </button>
                        </div>
                        {isAnswerVisible && <Explanation answer={q.answer} explanation={q.explanation} />}
                      </div>
                    );
                  })}
                  {totalPages > 1 && ( <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}