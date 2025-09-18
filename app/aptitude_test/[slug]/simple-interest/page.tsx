"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Simple Interest page ---

const formulasContent = [
  { type: 'heading', text: '1. Principal:' },
  { type: 'text', text: 'The money borrowed or lent out for a certain period is called the principal or the sum.' },
  { type: 'heading', text: '2. Interest:' },
  { type: 'text', text: 'Extra money paid for using other\'s money is called interest.' },
  { type: 'heading', text: '3. Simple Interest (S.I.):' },
  { type: 'text', text: 'If the interest on a sum borrowed for certain period is reckoned uniformly, then it is called simple interest.' },
  { type: 'text', text: 'Let Principal = P, Rate = R% per annum (p.a.) and Time = T years. Then:' },
  { type: 'formula', content: '(i). Simple Interest = (P x R x T) / 100' },
  { type: 'formula', content: '(ii). P = (100 x S.I.) / (R x T);  R = (100 x S.I.) / (P x T);  T = (100 x S.I.) / (P x R)' },
];

const generalQuestions = [
  {
    question: "A sum of money at simple interest amounts to Rs. 815 in 3 years and to Rs. 854 in 4 years. The sum is:",
    options: ["Rs. 650", "Rs. 690", "Rs. 698", "Rs. 700"],
    answer: "C",
    explanation: [
      { type: 'text', content: 'S.I. for 1 year = Rs. (854 - 815) = Rs. 39.' },
      { type: 'text', content: 'S.I. for 3 years = Rs. (39 x 3) = Rs. 117.' },
      { type: 'formula', content: 'Principal = Rs. (815 - 117) = Rs. 698.' },
    ]
  },
  {
    question: "Mr. Thomas invested an amount of Rs. 13,900 divided in two different schemes A and B at the simple interest rate of 14% p.a. and 11% p.a. respectively. If the total amount of simple interest earned in 2 years be Rs. 3508, what was the amount invested in Scheme B?",
    options: ["Rs. 6400", "Rs. 6500", "Rs. 7200", "Rs. 7500", "None of these"],
    answer: "A",
    explanation: [
      { type: 'text', content: 'Let the sum invested in Scheme A be Rs. x and that in Scheme B be Rs. (13900 - x).' },
      { type: 'formula', content: 'Then, ((x * 14 * 2) / 100) + (((13900 - x) * 11 * 2) / 100) = 3508' },
      { type: 'formula', content: '⇒ 28x - 22x = 350800 - (13900 * 22)' },
      { type: 'formula', content: '⇒ 6x = 45000' },
      { type: 'formula', content: '⇒ x = 7500.' },
      { type: 'text', content: 'So, sum invested in Scheme B = Rs. (13900 - 7500) = Rs. 6400.' },
      { type: 'video', content: 'https://youtu.be/fX4f4U2by6pjk' },
    ]
  },
  {
    question: "A sum fetched a total simple interest of Rs. 4016.25 at the rate of 9 p.c.p.a. in 5 years. What is the sum?",
    options: ["Rs. 4462.50", "Rs. 8032.50", "Rs. 8900", "Rs. 8925"],
    answer: "D",
    explanation: [
      { type: 'formula', content: 'Principal = Rs. (100 x 4016.25) / (9 x 5)' },
      { type: 'formula', content: '= Rs. (401625 / 45)' },
      { type: 'formula', content: '= Rs. 8925.' },
    ]
  },
  {
    question: "How much time will it take for an amount of Rs. 450 to yield Rs. 81 as interest at 4.5% per annum of simple interest?",
    options: ["3.5 years", "4 years", "4.5 years", "5 years"],
    answer: "B",
    explanation: [
      { type: 'formula', content: 'Time = (100 x 81) / (450 x 4.5) years = 4 years.' },
      { type: 'video', content: 'https://youtu.be/WdtBzNDSjBc' },
    ]
  },
  {
    question: "Reena took a loan of Rs. 1200 with simple interest for as many years as the rate of interest. If she paid Rs. 432 as interest at the end of the loan period, what was the rate of interest?",
    options: ["3.6", "6", "18", "Cannot be determined"],
    answer: "B",
    explanation: [
      { type: 'text', content: 'Let rate = R% and time = R years.' },
      { type: 'formula', content: 'Then, (1200 x R x R) / 100 = 432' },
      { type: 'formula', content: '⇒ 12R² = 432' },
      { type: 'formula', content: '⇒ R² = 36' },
      { type: 'formula', content: '⇒ R = 6.' },
    ]
  }
];

const subPageLinks = [ "Simple Interest - Formulas", "Simple Interest - General Questions"];
const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Unchanged) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { return ( <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn"> <div className="flex items-center gap-2"> <p className="font-bold text-gray-900">Answer: Option</p> <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"> <span className='font-sans font-semibold text-xs text-white'>{answer}</span> </div> </div> <div> <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3> <div className="space-y-3 text-gray-800"> {explanation.map((item, index) => { if (item.type === 'text') { return <p key={index}>{item.content}</p>; } if (item.type === 'formula') { return <p key={index} className="font-sans text-gray-900 text-center bg-slate-100 p-3 border border-slate-200 rounded">{item.content}</p>; } if (item.type === 'video') { return ( <p key={index} className="font-semibold pt-2"> Video Explanation: <Link href={item.content} target="_blank" className="text-blue-600 hover:underline">{item.content}</Link> </p> ); } return null; })} </div> </div> </div> ); };
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => { return ( <div className="flex justify-center items-center gap-2 mt-8"> {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => ( <button key={num} onClick={() => onPageChange(num)} className={`px-4 py-2 text-sm font-semibold border rounded-md transition-colors ${currentPage === num ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`} > {num} </button> ))} </div> ); };


// --- MAIN PAGE COMPONENT ---
export default function SimpleInterestPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Simple Interest</span></p>
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
                      {item.type === 'heading' && <h2 className="text-xl font-bold text-gray-900 pt-4">{item.text}</h2>}
                      {item.type === 'formula' && <p className="font-sans text-gray-800 bg-slate-100 p-4 rounded-md border border-slate-200 text-center">{item.content}</p>}
                      {item.type === 'text' && <p className="text-gray-700 leading-relaxed">{item.text}</p>}
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