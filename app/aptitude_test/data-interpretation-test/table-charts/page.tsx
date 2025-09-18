"use client";

import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Table Chart page ---
const tableData = {
  title: "Expenditures of a Company (in Lakh Rupees) per Annum Over the given Years.",
  headers: ["Year", "Salary", "Fuel and Transport", "Bonus", "Interest on Loans", "Taxes"],
  rows: [
    [1998, 288, 98, 3.00, 23.4, 83],
    [1999, 342, 112, 2.52, 32.5, 108],
    [2000, 324, 101, 3.84, 41.6, 74],
    [2001, 336, 133, 3.68, 36.4, 88],
    [2002, 420, 142, 3.96, 49.4, 98]
  ]
};

const generalQuestions = [
  { question: "What is the average amount of interest per year which the company had to pay during this period?", options: ["Rs. 32.43 lakhs", "Rs. 33.72 lakhs", "Rs. 34.18 lakhs", "Rs. 36.66 lakhs"], answer: "D", explanation: [ { type: 'text', content: 'Average amount of interest paid by the Company during the given period:' }, { type: 'formula', content: '= Rs. [ (23.4 + 32.5 + 41.6 + 36.4 + 49.4) / 5 ] lakhs' }, { type: 'formula', content: '= Rs. [ 183.3 / 5 ] lakhs' }, { type: 'formula', content: '= Rs. 36.66 lakhs.' }, ] },
  { question: "The total amount of bonus paid by the company during the given period is approximately what percent of the total amount of salary paid during this period?", options: ["0.1%", "0.5%", "1%", "1.25%"], answer: "C", explanation: [ { type: 'text', content: 'Total bonus = (3.00 + 2.52 + 3.84 + 3.68 + 3.96) = 17 lakhs.' }, { type: 'text', content: 'Total salary = (288 + 342 + 324 + 336 + 420) = 1710 lakhs.' }, { type: 'formula', content: 'Required percentage = [ (17 / 1710) * 100 ] %' }, { type: 'formula', content: '≈ 1%' }, ] },
  { question: "Total expenditure on all these items in 1998 was approximately what percent of the total expenditure in 2002?", options: ["62%", "66%", "69%", "71%"], answer: "C", explanation: [ { type: 'text', content: 'Total expenditure in 1998 = (288 + 98 + 3.00 + 23.4 + 83) = 495.4 lakhs.' }, { type: 'text', content: 'Total expenditure in 2002 = (420 + 142 + 3.96 + 49.4 + 98) = 713.36 lakhs.' }, { type: 'formula', content: 'Required percentage = [ (495.4 / 713.36) * 100 ] %' }, { type: 'formula', content: '≈ 69.45% ≈ 69%' }, ] },
  { question: "The total expenditure of the company over these items during the year 2000 is?", options: ["Rs. 544.44 lakhs", "Rs. 501.11 lakhs", "Rs. 446.46 lakhs", "Rs. 478.87 lakhs"], answer: "A", explanation: [ { type: 'text', content: 'Total expenditure during 2000:' }, { type: 'formula', content: '= Rs. (324 + 101 + 3.84 + 41.6 + 74) lakhs' }, { type: 'formula', content: '= Rs. 544.44 lakhs.' }, ] },
  { question: "The ratio between the total expenditure on Taxes for all the years and the total expenditure on Fuel and Transport for all the years respectively is approximately?", options: ["4:7", "10:13", "15:18", "5:8"], answer: "B", explanation: [ { type: 'text', content: 'Total expenditure on Taxes = (83 + 108 + 74 + 88 + 98) = 451 lakhs.' }, { type: 'text', content: 'Total expenditure on Fuel and Transport = (98 + 112 + 101 + 133 + 142) = 586 lakhs.' }, { type: 'formula', content: 'Required Ratio = 451 / 586 ≈ 0.77' }, { type: 'text', content: 'Checking the options, 10 / 13 ≈ 0.769, which is the closest.' }, { type: 'formula', content: 'So the approximate ratio is 10:13.' }, ] }
];

// --- Reusable Components (Unchanged) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { return ( <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn"> <div className="flex items-center gap-2"> <p className="font-bold text-gray-900">Answer: Option</p> <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"> <span className='font-sans font-semibold text-xs text-white'>{answer}</span> </div> </div> <div> <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3> <div className="space-y-3 text-gray-800"> {explanation.map((item, index) => { if (item.type === 'text') { return <p key={index}>{item.content}</p>; } if (item.type === 'formula') { return <p key={index} className="font-sans text-gray-900 text-center bg-slate-100 p-3 border border-slate-200 rounded">{item.content}</p>; } return null; })} </div> </div> </div> ); };

// --- MAIN PAGE COMPONENT ---
export default function TableChartPage() {
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
        {/* CORRECTED: Removed the outer border and padding for a cleaner layout */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <Link href="/aptitude_test/data-interpretation-test" className="text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft size={28} />
            </Link>
            <div>
                <p className="text-sm font-semibold text-green-600">Data Interpretation Test</p>
                <h1 className="text-4xl font-extrabold text-gray-900">
                    Table Charts
                </h1>
            </div>
          </div>

          {/* Table Section */}
          <div className="mb-12 border-b border-gray-200 pb-8">
            <p className="mb-4 text-gray-700">Study the following table and answer the questions based on it.</p>
            <h2 className="text-lg font-semibold text-center mb-4 text-gray-800">{tableData.title}</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-center">
                <thead className="bg-gray-50">
                  <tr>
                    {tableData.headers.map(header => (
                      // CORRECTED: Added text-gray-900 for visible header text
                      <th key={header} className="p-3 border border-gray-200 font-semibold text-gray-900">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.rows.map((row, rIndex) => (
                    <tr key={rIndex} className="hover:bg-gray-50">
                      {row.map((cell, cIndex) => (
                        // CORRECTED: Added text-gray-800 for visible cell text
                        <td key={cIndex} className="p-3 border border-gray-200 text-gray-800">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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