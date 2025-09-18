"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the C Functions page ---

const subPageLinks = [
    "C - Functions - Section 1",
];

const generalQuestions = [
  {
    question: "The keyword used to transfer control from a function back to the calling function is",
    options: ["switch", "goto", "go back", "return"],
    answer: "D",
    explanation: [
      { type: 'text', content: "The keyword return is used to transfer control from a function back to the calling function." },
      { 
        type: 'code', 
        title: 'Example:', 
        code: '#include<stdio.h>\n\nint add(int, int); /* Function prototype */\n\nint main()\n{\n   int a = 4, b = 3, c;\n   c = add(a, b);\n   printf("c = %d\\n", c);\n   return 0;\n}\n\nint add(int a, int b)\n{\n   /* returns the value and control back to main() function */\n   return (a+b);\n}',
        output: 'c = 7' 
      }
    ]
  },
  {
    question: "What is the notation for following functions?\n\n1.  int f(int a, float b)\n    {\n        /* Some code */\n    }\n\n2.  int f(a, b)\n    int a; float b;\n    {\n        /* Some code */\n    }",
    options: [
        "1. KR Notation\n2. ANSI Notation", 
        "1. Pre ANSI C Notation\n2. KR Notation", 
        "1. ANSI Notation\n2. KR Notation", 
        "1. ANSI Notation\n2. Pre ANSI Notation"
    ],
    answer: "C",
    explanation: [
      { type: 'text', content: "KR Notation means Kernighan and Ritchie Notation." }
    ]
  },
  {
    question: "How many times the program will print \"IndiaBIX\"?\n\n#include<stdio.h>\n\nint main()\n{\n    printf(\"IndiaBIX\");\n    main();\n    return 0;\n}",
    options: ["Infinite times", "32767 times", "65535 times", "Till stack overflows"],
    answer: "D",
    explanation: [
      { type: 'highlighted-text', content: "A call stack or function stack is used for several related purposes, but the main reason for having one is to keep track of the point to which each active subroutine should return control when it finishes executing." },
      { type: 'highlighted-text', content: "A stack overflow occurs when too much memory is used on the call stack." },
      { type: 'highlighted-text', content: "Here function main() is called repeatedly and its return address is stored in the stack. After stack memory is full, it shows stack overflow error." }
    ]
  }
];

const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Modified for code and highlighted text) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { 
    // Function to render text with highlighted parts
    const renderHighlightedText = (text: string) => {
        const parts = text.split(/(call stack|function stack|stack overflow|main\(\))/g);
        return parts.map((part, i) => {
            if (['call stack', 'function stack', 'stack overflow', 'main()'].includes(part)) {
                return <strong key={i} className="font-semibold text-red-600">{part}</strong>;
            }
            return part;
        });
    };

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
                        if (item.type === 'highlighted-text') {
                            return <p key={index} className="leading-relaxed" style={{ color: '#111827' }}>{renderHighlightedText(item.content)}</p>;
                        }
                        if (item.type === 'code') {
                            return (
                                <div key={index} className="bg-gray-100 p-4 rounded-md">
                                    {item.title && <p className="font-semibold mb-2 text-gray-700">{item.title}</p>}
                                    {item.code && <pre className="text-sm whitespace-pre-wrap font-mono text-gray-800">{item.code}</pre>}
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
export default function FunctionsPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">C - Functions</span></p>
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