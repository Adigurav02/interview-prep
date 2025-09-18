"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Profit and Loss page ---

const formulasContent = [
  { type: 'heading', text: 'IMPORTANT FACTS' },
  { type: 'text', text: 'Cost Price (C.P.): The price at which an article is purchased.' },
  { type: 'text', text: 'Selling Price (S.P.): The price at which an article is sold.' },
  { type: 'text', text: 'Profit or Gain: If S.P. is greater than C.P., the seller has a profit or gain.' },
  { type: 'text', text: 'Loss: If S.P. is less than C.P., the seller has incurred a loss.' },
  { type: 'heading', text: 'IMPORTANT FORMULAE' },
  { type: 'formula', content: '1. Gain = (S.P.) - (C.P.)' },
  { type: 'formula', content: '2. Loss = (C.P.) - (S.P.)' },
  { type: 'text', text: '3. Loss or gain is always reckoned on C.P.' },
  { type: 'formula', content: '4. Gain % = (Gain * 100) / C.P.' },
  { type: 'formula', content: '5. Loss % = (Loss * 100) / C.P.' },
  { type: 'formula', content: '6. Selling Price = [(100 + Gain %) / 100] * C.P.' },
  { type: 'formula', content: '7. Selling Price = [(100 - Loss %) / 100] * C.P.' },
  { type: 'formula', content: '8. Cost Price = [100 / (100 + Gain %)] * S.P.' },
  { type: 'formula', content: '9. Cost Price = [100 / (100 - Loss %)] * S.P.' },
  { type: 'text', text: '10. If an article is sold at a gain of say 35%, then S.P. = 135% of C.P.' },
  { type: 'text', text: '11. If an article is sold at a loss of say 35%, then S.P. = 65% of C.P.' },
  { type: 'text', text: '12. When a person sells two similar items, one at a gain of say x%, and the other at a loss of x%, then the seller always incurs a loss given by: (Common Loss and Gain % / 10)² %' },
  { type: 'text', text: '13. If a trader professes to sell his goods at cost price, but uses false weights, then Gain % = [Error / (True Value - Error)] * 100 %' },
];

const generalQuestions = [
  {
    question: "Alfred buys an old scooter for Rs. 4700 and spends Rs. 800 on its repairs. If he sells the scooter for Rs. 5800, his gain percent is:",
    options: ["4 4/7%", "5 5/11%", "10%", "12%"],
    answer: "B",
    explanation: [
      { type: 'text', content: 'Cost Price (C.P.) = Rs. (4700 + 800) = Rs. 5500.' },
      { type: 'text', content: 'Selling Price (S.P.) = Rs. 5800.' },
      { type: 'text', content: 'Gain = (S.P.) - (C.P.) = Rs. (5800 - 5500) = Rs. 300.' },
      { type: 'formula', content: 'Gain % = (300 / 5500 * 100)% = 5 5/11%' },
    ]
  },
  {
    question: "The cost price of 20 articles is the same as the selling price of x articles. If the profit is 25%, then the value of x is:",
    options: ["15", "16", "18", "25"],
    answer: "B",
    explanation: [
      { type: 'text', content: 'Let C.P. of each article be Re. 1. Then, C.P. of x articles = Rs. x.' },
      { type: 'text', content: 'S.P. of x articles = Rs. 20.' },
      { type: 'text', content: 'Profit = Rs. (20 - x).' },
      { type: 'formula', content: '((20 - x) / x) * 100 = 25' },
      { type: 'formula', content: '⇒ 2000 - 100x = 25x' },
      { type: 'formula', content: '⇒ 125x = 2000' },
      { type: 'formula', content: '⇒ x = 16' },
    ]
  },
  {
    question: "If selling price is doubled, the profit triples. Find the profit percent.",
    options: ["66 2/3", "100", "105 1/3", "120"],
    answer: "B",
    explanation: [
      { type: 'text', content: 'Let C.P. be Rs. x and S.P. be Rs. y.' },
      { type: 'text', content: 'Then, 3(y - x) = (2y - x) ⇒ y = 2x.' },
      { type: 'text', content: 'Profit = Rs. (y - x) = Rs. (2x - x) = Rs. x.' },
      { type: 'formula', content: 'Profit % = (x/x * 100)% = 100%' },
    ]
  },
  {
    question: "In a certain store, the profit is 320% of the cost. If the cost increases by 25% but the selling price remains constant, approximately what percentage of the selling price is the profit?",
    options: ["30%", "70%", "100%", "250%"],
    answer: "B",
    explanation: [
      { type: 'text', content: 'Let C.P. = Rs. 100. Then, Profit = Rs. 320, S.P. = Rs. 420.' },
      { type: 'text', content: 'New C.P. = 125% of Rs. 100 = Rs. 125.' },
      { type: 'text', content: 'New S.P. = Rs. 420.' },
      { type: 'text', content: 'Profit = Rs. (420 - 125) = Rs. 295.' },
      { type: 'formula', content: 'Required percentage = (295/420 * 100)% = 1475/21 % = 70% (approximately).' },
    ]
  },
  {
    question: "A vendor bought toffees at 6 for a rupee. How many for a rupee must he sell to gain 20%?",
    options: ["3", "4", "5", "6"],
    answer: "C",
    explanation: [
      { type: 'text', content: 'C.P. of 6 toffees = Re. 1' },
      { type: 'text', content: 'S.P. of 6 toffees = 120% of Re. 1 = Rs. 6/5' },
      { type: 'text', content: 'For Rs. 6/5, toffees sold = 6.' },
      { type: 'formula', content: 'For Re. 1, toffees sold = (6 * 5/6) = 5.' },
    ]
  }
];

const subPageLinks = [ "Profit and Loss - Formulas", "Profit and Loss - General Questions" ];
const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Unchanged) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { return ( <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn"> <div className="flex items-center gap-2"> <p className="font-bold text-gray-900">Answer: Option</p> <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"> <span className='font-sans font-semibold text-xs text-white'>{answer}</span> </div> </div> <div> <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3> <div className="space-y-3 text-gray-800"> {explanation.map((item, index) => { if (item.type === 'text') { return <p key={index}>{item.content}</p>; } if (item.type === 'formula') { return <p key={index} className="font-sans text-gray-900 text-center bg-slate-100 p-3 border border-slate-200 rounded">{item.content}</p>; } if (item.type === 'video') { return ( <p key={index} className="font-semibold pt-2"> Video Explanation: <Link href={item.content} target="_blank" className="text-blue-600 hover:underline">{item.content}</Link> </p> ); } return null; })} </div> </div> </div> ); };
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => { return ( <div className="flex justify-center items-center gap-2 mt-8"> {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => ( <button key={num} onClick={() => onPageChange(num)} className={`px-4 py-2 text-sm font-semibold border rounded-md transition-colors ${currentPage === num ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`} > {num} </button> ))} </div> ); };


// --- MAIN PAGE COMPONENT ---
export default function ProfitAndLossPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Profit and Loss</span></p>
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
                <div className="space-y-4 text-gray-800">
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