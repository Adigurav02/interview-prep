"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Compound Interest page ---

const formulasContent = [
  { type: 'text', text: '1. Let Principal = P, Rate = R% per annum, Time = n years.' },
  { type: 'heading', text: '2. When interest is compounded Annually:' },
  { type: 'formula', content: 'Amount = P * (1 + R/100)^n' },
  { type: 'heading', text: '3. When interest is compounded Half-yearly:' },
  { type: 'formula', content: 'Amount = P * (1 + (R/2)/100)^(2n)' },
  { type: 'heading', text: '4. When interest is compounded Quarterly:' },
  { type: 'formula', content: 'Amount = P * (1 + (R/4)/100)^(4n)' },
  { type: 'heading', text: '5. When interest is compounded Annually but time is in fraction, say 3 2/5 years:' },
  { type: 'formula', content: 'Amount = P * (1 + R/100)^3 * (1 + (2/5 * R)/100)' },
  { type: 'heading', text: '6. When Rates are different for different years, say R1%, R2%, R3% for 1st, 2nd and 3rd year respectively.' },
  { type: 'formula', content: 'Then, Amount = P * (1 + R1/100) * (1 + R2/100) * (1 + R3/100)' },
  { type: 'heading', text: '7. Present worth of Rs. x due n years hence is given by:' },
  { type: 'formula', content: 'Present Worth = x / (1 + R/100)^n' },
];

const generalQuestions = [
  {
    question: "A bank offers 5% compound interest calculated on half-yearly basis. A customer deposits Rs. 1600 each on 1st January and 1st July of a year. At the end of the year, the amount he would have gained by way of interest is:",
    options: ["Rs. 120", "Rs. 121", "Rs. 122", "Rs. 123"],
    answer: "B",
    explanation: [
      { type: 'text', content: 'Amount after 1 year on Rs. 1600 deposited on 1st Jan:' },
      { type: 'formula', content: 'Amount = 1600 * (1 + 2.5/100)^2 = 1600 * (41/40)^2 = Rs. 1681' },
      { type: 'text', content: 'Amount after 6 months on Rs. 1600 deposited on 1st July:' },
      { type: 'formula', content: 'Amount = 1600 * (1 + 2.5/100)^1 = Rs. 1640' },
      { type: 'text', content: 'Total amount = Rs. (1681 + 1640) = Rs. 3321' },
      { type: 'text', content: 'Total principal = Rs. (1600 + 1600) = Rs. 3200' },
      { type: 'formula', content: 'C.I. = Rs. (3321 - 3200) = Rs. 121' },
    ]
  },
  {
    question: "The difference between simple and compound interests compounded annually on a certain sum of money for 2 years at 4% per annum is Rs. 1. The sum (in Rs.) is:",
    options: ["625", "630", "640", "650"],
    answer: "A",
    explanation: [
      { type: 'text', content: 'Let the sum be Rs. x. Then,' },
      { type: 'formula', content: 'C.I. = [x * (1 + 4/100)^2] - x = (676x/625) - x = 51x/625' },
      { type: 'formula', content: 'S.I. = (x * 4 * 2) / 100 = 2x/25' },
      { type: 'formula', content: '(51x/625) - (2x/25) = 1' },
      { type: 'formula', content: '⇒ x/625 = 1 ⇒ x = 625' },
    ]
  },
  {
    question: "There is 60% increase in an amount in 6 years at simple interest. What will be the compound interest of Rs. 12,000 after 3 years at the same rate?",
    options: ["Rs. 2160", "Rs. 3120", "Rs. 3972", "Rs. 6240"],
    answer: "C",
    explanation: [
      { type: 'text', content: 'Let P = Rs. 100. Then, S.I. Rs. 60 and T = 6 years.' },
      { type: 'formula', content: 'R = (100 * 60) / (100 * 6) = 10% p.a.' },
      { type: 'text', content: 'Now, P = Rs. 12000, T = 3 years and R = 10% p.a.' },
      { type: 'formula', content: 'C.I. = [12000 * { (1 + 10/100)^3 - 1 }]' },
      { type: 'formula', content: '= [12000 * (331/1000)] = 3972.' },
    ]
  },
  {
    question: "What is the difference between the compound interests on Rs. 5000 for 1 1/2 years at 4% per annum compounded yearly and half-yearly?",
    options: ["Rs. 2.04", "Rs. 3.06", "Rs. 4.80", "Rs. 8.30"],
    answer: "A",
    explanation: [
      { type: 'text', content: 'C.I. when interest compounded yearly:' },
      { type: 'formula', content: '= [5000 * (1 + 4/100) * (1 + (1/2 * 4)/100)] = Rs. 5304' },
      { type: 'text', content: 'C.I. when interest is compounded half-yearly:' },
      { type: 'formula', content: '= [5000 * (1 + 2/100)^3] = Rs. 5306.04' },
      { type: 'formula', content: 'Difference = Rs. (5306.04 - 5304) = Rs. 2.04' },
    ]
  },
  {
    question: "The compound interest on Rs. 30,000 at 7% per annum is Rs. 4347. The period (in years) is:",
    options: ["2", "2 1/2", "3", "4"],
    answer: "A",
    explanation: [
      { type: 'text', content: 'Amount = Rs. (30000 + 4347) = Rs. 34347.' },
      { type: 'text', content: 'Let the time be n years.' },
      { type: 'formula', content: 'Then, 30000 * (1 + 7/100)^n = 34347' },
      { type: 'formula', content: '⇒ (107/100)^n = 34347/30000 = 11449/10000 = (107/100)^2' },
      { type: 'text', content: '∴ n = 2 years.' },
    ]
  }
];

const subPageLinks = [ "Compound Interest - Formulas", "Compound Interest - General Questions"];
const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Unchanged) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { return ( <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn"> <div className="flex items-center gap-2"> <p className="font-bold text-gray-900">Answer: Option</p> <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"> <span className='font-sans font-semibold text-xs text-white'>{answer}</span> </div> </div> <div> <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3> <div className="space-y-3 text-gray-800"> {explanation.map((item, index) => { if (item.type === 'text') { return <p key={index}>{item.content}</p>; } if (item.type === 'formula') { return <p key={index} className="font-sans text-gray-900 text-center bg-slate-100 p-3 border border-slate-200 rounded">{item.content}</p>; } if (item.type === 'video') { return ( <p key={index} className="font-semibold pt-2"> Video Explanation: <Link href={item.content} target="_blank" className="text-blue-600 hover:underline">{item.content}</Link> </p> ); } return null; })} </div> </div> </div> ); };
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => { return ( <div className="flex justify-center items-center gap-2 mt-8"> {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => ( <button key={num} onClick={() => onPageChange(num)} className={`px-4 py-2 text-sm font-semibold border rounded-md transition-colors ${currentPage === num ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`} > {num} </button> ))} </div> ); };


// --- MAIN PAGE COMPONENT ---
export default function CompoundInterestPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Compound Interest</span></p>
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