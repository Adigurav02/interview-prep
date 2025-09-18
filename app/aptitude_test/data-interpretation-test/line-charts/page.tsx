"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from 'next/image'; // Using the Next.js Image component
import { ArrowLeft, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Line Chart page ---

const lineChartData = {
  title: "Exports from Three Companies Over the Years (in Rs. crore)",
  description: "Study the following line graph and answer the questions.",
  // ================================================================= //
  // /// *** CODE CORRECTION *** ///
  // Updated to use the correct local image path as you specified.
  // ================================================================= //
  imageUrl: "/line.png" 
};

const generalQuestions = [
  {
    question: "For which of the following pairs of years the total exports from the three Companies together are equal?",
    options: ["1995 and 1998", "1996 and 1998", "1997 and 1998", "1995 and 1996"],
    answer: "D",
    explanation: [
      { type: 'text', content: 'Total exports of the three Companies X, Y and Z together, during various years are:' },
      { type: 'text', content: 'In 1993 = Rs. (30 + 80 + 60) crores = Rs. 170 crores.' },
      { type: 'text', content: 'In 1994 = Rs. (60 + 40 + 90) crores = Rs. 190 crores.' },
      { type: 'text', content: 'In 1995 = Rs. (40 + 60 + 120) crores = Rs. 220 crores.' },
      { type: 'text', content: 'In 1996 = Rs. (70 + 60 + 90) crores = Rs. 220 crores.' },
      { type: 'text', content: 'In 1997 = Rs. (100 + 80 + 60) crores = Rs. 240 crores.' },
      { type: 'text', content: 'In 1998 = Rs. (50 + 100 + 80) crores = Rs. 230 crores.' },
      { type: 'text', content: 'In 1999 = Rs. (120 + 140 + 100) crores = Rs. 360 crores.' },
      { type: 'text', content: 'Clearly, the total exports of the three Companies X, Y and Z together are same during the years 1995 and 1996.' },
    ]
  },
  {
    question: "Average annual exports during the given period for Company Y is approximately what percent of the average annual exports for Company Z?",
    options: ["87.12%", "89.64%", "91.21%", "93.33%"],
    answer: "D",
    explanation: [
      { type: 'text', content: 'From the graph: Exports of Company Y were 80, 40, 60, 60, 80, 100, 140. Total = 560.' },
      { type: 'text', content: 'From the graph: Exports of Company Z were 60, 90, 120, 90, 60, 80, 100. Total = 600.' },
      { type: 'text', content: 'Average annual exports of Company Y = 560 / 7 = 80 crores.' },
      { type: 'text', content: 'Average annual exports of Company Z = 600 / 7 crores.' },
      { type: 'formula', content: 'Required percentage = [ 80 / (600/7) ] x 100 %' },
      { type: 'formula', content: '= [ (80 * 7) / 600 ] x 100 % = 93.33%.' },
    ]
  },
  {
    question: "In which year was the difference between the exports from Companies X and Y the minimum?",
    options: ["1994", "1995", "1996", "1997"],
    answer: "C",
    explanation: [
      { type: 'text', content: 'The difference between the exports from the Companies X and Y during the various years are:' },
      { type: 'text', content: 'In 1993 = Rs. (80 - 30) crores = Rs. 50 crores.' },
      { type: 'text', content: 'In 1994 = Rs. (60 - 40) crores = Rs. 20 crores.' },
      { type: 'text', content: 'In 1995 = Rs. (60 - 40) crores = Rs. 20 crores.' },
      { type: 'text', content: 'In 1996 = Rs. (70 - 60) crores = Rs. 10 crores.' },
      { type: 'text', content: 'In 1997 = Rs. (100 - 80) crores = Rs. 20 crores.' },
      { type: 'text', content: 'Clearly, the difference is minimum in the year 1996.' },
    ]
  },
  {
    question: "What was the difference between the average exports of the three Companies in 1993 and the average exports in 1998?",
    options: ["Rs. 15.33 crores", "Rs. 18.67 crores", "Rs. 20 crores", "Rs. 22.17 crores"],
    answer: "C",
    explanation: [
        { type: 'text', content: 'Average exports of the three Companies in 1993:' },
        { type: 'formula', content: '= Rs. [ 1/3 * (30 + 80 + 60) ] crores = Rs. (170/3) crores.' },
        { type: 'text', content: 'Average exports of the three Companies in 1998:' },
        { type: 'formula', content: '= Rs. [ 1/3 * (50 + 100 + 80) ] crores = Rs. (230/3) crores.' },
        { type: 'formula', content: 'Difference = Rs. [ (230/3) - (170/3) ] crores = Rs. (60/3) crores = Rs. 20 crores.' },
    ]
  },
  {
    question: "In how many of the given years, were the exports from Company Z more than the average annual exports over the given years?",
    options: ["2", "3", "4", "5"],
    answer: "C",
    explanation: [
      { type: 'text', content: 'Average annual exports of Company Z during the given period:' },
      { type: 'formula', content: '= 1/7 * (60 + 90 + 120 + 90 + 60 + 80 + 100) crores = Rs. 85.71 crores.' },
      { type: 'text', content: 'From the analysis of graph the exports of Company Z are more than the average annual exports of Company Z (i.e., Rs. 85.71 crores) during the years 1994, 1995, 1996 and 1999, i.e., during 4 of the given years.' },
    ]
  }
];

// --- Reusable Components (Unchanged) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { return ( <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn"> <div className="flex items-center gap-2"> <p className="font-bold text-gray-900">Answer: Option</p> <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"> <span className='font-sans font-semibold text-xs text-white'>{answer}</span> </div> </div> <div> <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3> <div className="space-y-3 text-gray-800"> {explanation.map((item, index) => { if (item.type === 'text') { return <p key={index}>{item.content}</p>; } if (item.type === 'formula') { return <p key={index} className="font-sans text-gray-900 text-center bg-slate-100 p-3 border border-slate-200 rounded">{item.content}</p>; } return null; })} </div> </div> </div> ); };

// --- MAIN PAGE COMPONENT ---
export default function LineChartPage() {
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
                <h1 className="text-4xl font-extrabold text-gray-900">Line Charts</h1>
            </div>
          </div>

          {/* Line Chart Section */}
          <div className="mb-12 border border-gray-200 p-6 rounded-lg">
            <h2 className="text-lg font-bold text-green-700 mb-2">Directions to Solve</h2>
            <p className="mb-6 text-gray-700">{lineChartData.description}</p>
            <div className="relative w-full max-w-2xl mx-auto">
                 <Image 
                    src={lineChartData.imageUrl} 
                    alt={lineChartData.title}
                    width={800} 
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