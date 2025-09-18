"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Declarations and Initializations page ---

const subPageLinks = [
    "C - Declarations and Initializations - Section 1",
];

const generalQuestions = [
  {
    question: "Which of the following statements should be used to obtain a remainder after dividing 3.14 by 2.1?",
    options: [
        "rem = 3.14 % 2.1;", 
        "rem = mod(3.14, 2.1);", 
        "rem = fmod(3.14, 2.1);", 
        "Remainder cannot be obtain in floating point division."
    ],
    answer: "C",
    explanation: [
      { type: 'text', content: "fmod(x,y) - Calculates x modulo y, the remainder of x/y." },
      { type: 'text', content: "This function is the same as the modulus operator. But fmod() performs floating point divisions." },
      { type: 'code', title: 'Example:', code: '#include <stdio.h>\n#include <math.h>\n\nint main()\n{\n   printf("fmod of 3.14/2.1 is %lf\\n", fmod(3.14,2.1) );\n   return 0;\n}', output: 'fmod of 3.14/2.1 is 1.040000' }
    ]
  },
  {
    question: "What are the types of linkages?",
    options: [
        "Internal and External", 
        "External, Internal and None", 
        "External and None", 
        "Internal"
    ],
    answer: "B",
    explanation: [
      { type: 'text', content: "External Linkage -> means global, non-static variables and functions." },
      { type: 'text', content: "Internal Linkage -> means static variables and functions with file scope." },
      { type: 'text', content: "None Linkage -> means Local variables." }
    ]
  },
  {
    question: "Which of the following special symbol allowed in a variable name?",
    options: ["* (asterisk)", "| (pipeline)", "- (hyphen)", "_ (underscore)"],
    answer: "D",
    explanation: [
        { type: 'text', content: 'Variable names in C are made up of letters (upper and lower case) and digits. The underscore character ("_") is also permitted. Names must not begin with a digit.' },
        { type: 'list', title: 'Examples of valid (but not very descriptive) C variable names:', items: ['foo', 'Bar', 'BAZ', '_foo_bar', '_foo42', '_', 'QuUx'] }
    ]
  },
  {
    question: "Is there any difference between following declarations?\n1 : extern int fun();\n2 : int fun();",
    options: [
        "Both are identical",
        "No difference, except extern int fun(); is probably in another file",
        "int fun(); is overrided with extern int fun();",
        "None of these"
    ],
    answer: "B",
    explanation: [
        { type: 'code', code: 'extern int fun();', content: 'declaration in C is to indicate the existence of a global function and it is defined externally to the current module or in another file.' },
        { type: 'code', code: 'int fun();', content: 'declaration in C is to indicate the existence of a function inside the current module or in the same file.' }
    ]
  },
  {
    question: "How would you round off a value from 1.66 to 2.0?",
    options: ["ceil(1.66)", "floor(1.66)", "roundup(1.66)", "roundto(1.66)"],
    answer: "A",
    explanation: [
        { type: 'code', title: '/* Example for ceil() and floor() functions: */', code: '#include<stdio.h>\n#include<math.h>\n\nint main()\n{\n   printf("\\n Result : %f", ceil(1.44) );\n   printf("\\n Result : %f", ceil(1.66) );\n   printf("\\n Result : %f", floor(1.44) );\n   printf("\\n Result : %f", floor(1.66) );\n\n   return 0;\n}', output: '// Output:\n// Result : 2.000000\n// Result : 2.000000\n// Result : 1.000000\n// Result : 1.000000'}
    ]
  }
];

const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Modified for code blocks) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { 
    return (
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900">Answer: Option</p>
                <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className='font-sans font-semibold text-xs text-white'>{answer}</span>
                </div>
            </div>
            <div>
                <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3>
                <div className="space-y-4 text-gray-800">
                    {explanation.map((item, index) => {
                        if (item.type === 'text') {
                            return <p key={index} className="leading-relaxed" style={{ color: '#111827' }}>{item.content}</p>;
                        }
                        if (item.type === 'list') {
                            return (
                                <div key={index}>
                                    <p className="font-semibold" style={{ color: '#111827' }}>{item.title}</p>
                                    <ul className="list-disc list-inside pl-2 space-y-1">
                                        {item.items.map((li, i) => <li key={i} style={{ color: '#111827' }}>{li}</li>)}
                                    </ul>
                                </div>
                            );
                        }
                        if (item.type === 'code') {
                            return (
                                <div key={index} className="bg-gray-100 p-4 rounded-md">
                                    {item.title && <p className="font-semibold mb-2 text-gray-700">{item.title}</p>}
                                    {item.code && <pre className="text-sm whitespace-pre-wrap font-mono text-gray-800">{item.code}</pre>}
                                    {item.content && <p className="leading-relaxed mt-2" style={{ color: '#111827' }}>{item.content}</p>}
                                    {item.output && <pre className="text-sm whitespace-pre-wrap font-mono text-green-700 mt-2 border-t border-gray-200 pt-2">{item.output}</pre>}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => { 
    return (
        <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button 
                    key={num} 
                    onClick={() => onPageChange(num)}
                    className={`px-4 py-2 text-sm font-semibold border rounded-md transition-colors ${currentPage === num ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                >
                    {num}
                </button>
            ))}
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function DeclarationsAndInitializationsPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">C - Declarations and Initializations</span></p>
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
                <div className="space-y-8">
                  {currentQuestions.map((q, index) => {
                    const questionIndex = indexOfFirstQuestion + index;
                    const userSelectedOption = selectedAnswers[questionIndex];
                    const isAnswerVisible = visibleAnswers.includes(questionIndex) || !!userSelectedOption;

                    return (
                      <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                        <p className="mb-4 text-gray-900 font-medium whitespace-pre-wrap">{questionIndex + 1}. {q.question}</p>
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
                                 <span className="whitespace-pre-wrap">{option}</span>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}