"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image'; // Using the Next.js Image component for optimization
import { ArrowLeft, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Pie Chart page ---

const pieChartData = {
  title: "Various Expenditures (in percentage) Incurred in Publishing a Book",
  description: "The following pie-chart shows the percentage distribution of the expenditure incurred in publishing a book. Study the pie-chart and the answer the questions based on it.",
  // ================================================================= //
  // /// *** CODE CORRECTION *** ///
  // Updated to use the correct local image path as you specified.
  // ================================================================= //
  imageUrl: "/pie-chart.png" 
};

const generalQuestions = [
  {
    question: "If for a certain quantity of books, the publisher has to pay Rs. 30,600 as printing cost, then what will be amount of royalty to be paid for these books?",
    options: ["Rs. 19,450", "Rs. 21,200", "Rs. 22,950", "Rs. 26,150"],
    answer: "C",
    explanation: [
      { type: 'text', content: 'Let the amount of Royalty to be paid for these books be Rs. r.' },
      { type: 'text', content: 'From the chart, Printing Cost is 20% and Royalty is 15%.' },
      { type: 'formula', content: 'Then, 20 : 15 = 30600 : r' },
      { type: 'formula', content: '=> r = Rs. ( (30600 * 15) / 20 ) = Rs. 22,950.' },
    ]
  },
  {
    question: "What is the central angle of the sector corresponding to the expenditure incurred on Royalty?",
    options: ["15°", "24°", "54°", "48°"],
    answer: "C",
    explanation: [
      { type: 'text', content: 'Central angle corresponding to Royalty (15%):' },
      { type: 'formula', content: '= (15 / 100) * 360°' },
      { type: 'formula', content: '= 54°.' },
    ]
  },
  {
    question: "The price of the book is marked 20% above the C.P. If the marked price of the book is Rs. 180, then what is the cost of the paper used in a single copy of the book?",
    options: ["Rs. 36", "Rs. 37.50", "Rs. 42", "Rs. 44.25"],
    answer: "B",
    explanation: [
      { type: 'text', content: 'Marked price = 120% of C.P. So, 120% of C.P. = Rs. 180.' },
      { type: 'text', content: 'Cost of paper = 25% of C.P.' },
      { type: 'text', content: 'Let the cost of paper be Rs. n. The ratio of percentages will equal the ratio of their costs.' },
      { type: 'formula', content: '120 : 25 = 180 : n' },
      { type: 'formula', content: '=> n = Rs. ( (25 * 180) / 120 ) = Rs. 37.50.' },
    ]
  },
  {
    question: "If 5500 copies are published and the transportation cost on them amounts to Rs. 82500, then what should be the selling price of the book so that the publisher can earn a profit of 25%?",
    options: ["Rs. 187.50", "Rs. 191.50", "Rs. 175", "Rs. 180"],
    answer: "A",
    explanation: [
        { type: 'text', content: 'For a 25% profit, the Selling Price (S.P.) should be 125% of the Cost Price (C.P.).' },
        { type: 'text', content: 'From the chart, Transportation Cost = 10% of C.P.' },
        { type: 'text', content: 'So, 10% of C.P. for 5500 copies = Rs. 82500.' },
        { type: 'formula', content: 'Let the required S.P. for 5500 copies be Rs. x. The ratio of percentages will equal the ratio of costs.' },
        { type: 'formula', content: '10 : 125 = 82500 : x' },
        { type: 'formula', content: '=> x = Rs. ( (125 * 82500) / 10 ) = Rs. 1,031,250.' },
        { type: 'formula', content: 'S.P. of one book = Rs. (1,031,250 / 5500) = Rs. 187.50.' },
    ]
  },
  {
    question: "Royalty on the book is less than the printing cost by:",
    options: ["5%", "33 1/5%", "20%", "25%"],
    answer: "D",
    explanation: [
      { type: 'text', content: 'Printing Cost = 20% of Total Cost.' },
      { type: 'text', content: 'Royalty = 15% of Total Cost.' },
      { type: 'text', content: 'Difference = 20% - 15% = 5% of Total Cost.' },
      { type: 'formula', content: 'Percentage difference = (Difference / Printing Cost) * 100' },
      { type: 'formula', content: '= ( (5% of Total Cost) / (20% of Total Cost) ) * 100 = (5/20) * 100 = 25%.' },
    ]
  }
];

// --- Reusable Components (Unchanged) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { return ( <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn"> <div className="flex items-center gap-2"> <p className="font-bold text-gray-900">Answer: Option</p> <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"> <span className='font-sans font-semibold text-xs text-white'>{answer}</span> </div> </div> <div> <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3> <div className="space-y-3 text-gray-800"> {explanation.map((item, index) => { if (item.type === 'text') { return <p key={index}>{item.content}</p>; } if (item.type === 'formula') { return <p key={index} className="font-sans text-gray-900 text-center bg-slate-100 p-3 border border-slate-200 rounded">{item.content}</p>; } return null; })} </div> </div> </div> ); };

// --- MAIN PAGE COMPONENT ---
export default function PieChartPage() {
  const [visibleAnswers, setVisibleAnswers] = useState<number[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string | null>>({});

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
  
  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <Link href="/aptitude_test/data-interpretation-test" className="text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft size={28} />
            </Link>
            <div>
                <p className="text-sm font-semibold text-green-600">Data Interpretation Test</p>
                <h1 className="text-4xl font-extrabold text-gray-900">Pie Charts</h1>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className="mb-12 border border-gray-200 p-6 rounded-lg">
            <p className="mb-6 text-gray-700">{pieChartData.description}</p>
            <div className="relative w-full max-w-md mx-auto">
                 <Image 
                    src={pieChartData.imageUrl} 
                    alt={pieChartData.title}
                    width={500} 
                    height={500} 
                    className="w-full h-auto"
                 />
            </div>
          </div>
          
          {/* Questions Section */}
          <div className="space-y-12">
            {generalQuestions.map((q, index) => {
              const userSelectedOption = selectedAnswers[index];
              const isAnswerVisible = visibleAnswers.includes(index) || !!userSelectedOption;

              return (
                <div key={index}>
                  <p className="mb-4 text-gray-900 font-medium text-lg">{index + 1}. {q.question}</p>
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
                            onClick={() => handleOptionClick(index, optionChar)}
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
                      onClick={() => handleToggleAnswer(index)}
                      className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <BookOpen size={16} className="text-gray-600"/>
                    </button>
                  </div>
                  {isAnswerVisible && <Explanation answer={q.answer} explanation={q.explanation} />}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}