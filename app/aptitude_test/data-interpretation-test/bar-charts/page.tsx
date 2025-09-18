"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image'; // Using the Next.js Image component
import { ArrowLeft, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Bar Chart page ---

const barChartData = {
  title: "Sales of Books (in thousand numbers) from Six Branches - B1, B2, B3, B4, B5 and B6 of a publishing Company in 2000 and 2001.",
  description: "The bar graph given below shows the sales of books (in thousand number) from six branches of a publishing company during two consecutive years 2000 and 2001.",
  // ================================================================= //
  // /// *** CODE CORRECTION *** ///
  // This path is now correct because your image is in the `public` folder.
  // ================================================================= //
  imageUrl: "/bar-chart-sales.png" 
};

const generalQuestions = [
  {
    question: "What is the ratio of the total sales of branch B2 for both years to the total sales of branch B4 for both years?",
    options: ["2:3", "3:5", "4:5", "7:9"],
    answer: "D",
    explanation: [
      { type: 'text', content: 'Total sales of B2 = (75 + 65) = 140' },
      { type: 'text', content: 'Total sales of B4 = (85 + 95) = 180' },
      { type: 'formula', content: 'Required ratio = 140 / 180 = 14 / 18 = 7 / 9' },
    ]
  },
  {
    question: "Total sales of branch B6 for both the years is what percent of the total sales of branches B3 for both the years?",
    options: ["68.54%", "71.11%", "73.17%", "75.55%"],
    answer: "C",
    explanation: [
      { type: 'text', content: 'Total sales of B6 = (70 + 80) = 150' },
      { type: 'text', content: 'Total sales of B3 = (95 + 110) = 205' },
      { type: 'formula', content: 'Required percentage = [ (150 / 205) * 100 ] %' },
      { type: 'formula', content: '= 73.17%.' },
    ]
  },
  {
    question: "What percent of the average sales of branches B1, B2 and B3 in 2001 is the average sales of branches B1, B3 and B6 in 2000?",
    options: ["75%", "77.5%", "82.5%", "87.5%"],
    answer: "D",
    explanation: [
      { type: 'text', content: 'Average sales (in thousand number) of branches B1, B3 and B6 in 2000:' },
      { type: 'formula', content: '= 1/3 * (80 + 95 + 70) = 245/3' },
      { type: 'text', content: 'Average sales (in thousand number) of branches B1, B2 and B3 in 2001:' },
      { type: 'formula', content: '= 1/3 * (105 + 65 + 110) = 280/3' },
      { type: 'formula', content: 'Required percentage = [ (245/3) / (280/3) * 100 ] % = (245/280 * 100)% = 87.5%.' },
    ]
  },
  {
    question: "What is the average sales of all the branches (in thousand numbers) for the year 2000?",
    options: ["73", "80", "83", "88"],
    answer: "B",
    explanation: [
        { type: 'text', content: 'Average sales of all the six branches (in thousand numbers) for the year 2000:' },
        { type: 'formula', content: '= 1/6 * [80 + 75 + 95 + 85 + 75 + 70]' },
        { type: 'formula', content: '= 480 / 6 = 80.' },
    ]
  },
  {
    question: "Total sales of branches B1, B3 and B5 together for both the years (in thousand numbers) is?",
    options: ["250", "310", "435", "560"],
    answer: "D",
    explanation: [
      { type: 'text', content: 'Total sales of branches B1, B3 and B5 for both the years (in thousand numbers):' },
      { type: 'formula', content: '= (80 + 105) + (95 + 110) + (75 + 95)' },
      { type: 'formula', content: '= 185 + 205 + 170 = 560.' },
    ]
  }
];

// --- Reusable Components (Unchanged) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { return ( <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn"> <div className="flex items-center gap-2"> <p className="font-bold text-gray-900">Answer: Option</p> <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"> <span className='font-sans font-semibold text-xs text-white'>{answer}</span> </div> </div> <div> <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3> <div className="space-y-3 text-gray-800"> {explanation.map((item, index) => { if (item.type === 'text') { return <p key={index}>{item.content}</p>; } if (item.type === 'formula') { return <p key={index} className="font-sans text-gray-900 text-center bg-slate-100 p-3 border border-slate-200 rounded">{item.content}</p>; } return null; })} </div> </div> </div> ); };

// --- MAIN PAGE COMPONENT ---
export default function BarChartPage() {
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
                <h1 className="text-4xl font-extrabold text-gray-900">Bar Charts</h1>
            </div>
          </div>

          {/* Bar Chart Section */}
          <div className="mb-12 border border-gray-200 p-6 rounded-lg">
            <h2 className="text-lg font-bold text-green-700 mb-2">Directions to Solve</h2>
            <p className="mb-6 text-gray-700">{barChartData.description}</p>
            <div className="relative w-full max-w-3xl mx-auto">
                 <Image 
                    src={barChartData.imageUrl} 
                    alt={barChartData.title}
                    width={800} 
                    height={450} 
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