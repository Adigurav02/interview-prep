"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the C Strings page ---

const subPageLinks = [
    "C - Strings - Section 1",
];

const generalQuestions = [
  {
    question: "Which of the following function sets first n characters of a string to a given character?",
    options: ["strinit()", "strnset()", "strset()", "strcset()"],
    answer: "B",
    explanation: [
      { type: 'declaration', declaration: 'char *strnset(char *s, int ch, size_t n);', content: 'Sets the first n characters of s to ch' },
      { 
        type: 'code', 
        title: 'Example:', 
        code: '#include <stdio.h>\n#include <string.h>\n\nint main(void)\n{\n   char string = "abcdefghijklmnopqrstuvwxyz";\n   char letter = \'X\';\n\n   printf("string before strnset: %s\\n", string);\n   strnset(string, letter, 13);\n   printf("string after strnset: %s\\n", string);\n\n   return 0;\n}',
        output: 'string before strnset: abcdefghijklmnopqrstuvwxyz\nstring after strnset: XXXXXXXXXXXXXnopqrstuvwxyz' 
      }
    ]
  },
  {
    question: "If the two strings are identical, then strcmp() function returns",
    options: ["-1", "1", "0", "Yes"],
    answer: "C",
    explanation: [
      { type: 'declaration', declaration: 'strcmp(const char *s1, const char *s2);', content: '' },
      { type: 'text', content: 'The strcmp return an int value that is' },
      { type: 'text', content: 'if s1 < s2 returns a value < 0' },
      { type: 'text', content: 'if s1 == s2 returns 0' },
      { type: 'text', content: 'if s1 > s2 returns a value > 0' },
    ]
  },
  {
    question: "How will you print \\n on the screen?",
    options: ["print(\"\\n\");", "echo \"\\n\";", "printf(\"\\n\");", "printf(\"\\\\n\");"],
    answer: "D",
    explanation: [
      { type: 'text', content: "The statement printf(\"\\\\n\"); prints \\n on the screen." }
    ]
  },
  {
    question: "The library function used to find the last occurrence of a character in a string is",
    options: ["strnstr()", "laststr()", "strrchr()", "strstr()"],
    answer: "C",
    explanation: [
        { type: 'declaration', declaration: 'char *strrchr(const char *s, int c);', content: '' },
        { type: 'text', content: 'It scans a string s in the reverse direction, looking for a specific character c.' },
        {
            type: 'code',
            title: 'Example:',
            code: '#include <string.h>\n#include <stdio.h>\n\nint main(void)\n{\n   char text[] = "I learn through IndiaBIX.com";\n   char *ptr, c = \'i\';\n\n   ptr = strrchr(text, c);\n   if (ptr)\n      printf("The position of \'%c\' is: %d\\n", c, ptr-text);\n   else\n      printf("The character was not found\\n");\n   return 0;\n}',
            output: 'The position of \'i\' is: 19'
        }
    ]
  },
  {
    question: "Which of the following function is used to find the first occurrence of a given string in another string?",
    options: ["strchr()", "strrchr()", "strstr()", "strnset()"],
    answer: "C",
    explanation: [
        { type: 'text', content: 'The function strstr() finds the first occurrence of a substring in another string' },
        { type: 'declaration', declaration: 'char *strstr(const char *s1, const char *s2);', content: '' },
        { type: 'text', title: 'Return Value:', content: 'On success, strstr returns a pointer to the element in s1 where s2 begins (points to s2 in s1).\nOn error (if s2 does not occur in s1), strstr returns null.'},
        {
            type: 'code',
            title: 'Example:',
            code: '#include <stdio.h>\n#include <string.h>\n\nint main(void)\n{\n   char *str1 = "IndiaBIX", *str2 = "ia", *ptr;\n\n   ptr = strstr(str1, str2);\n   printf("The substring is: %s\\n", ptr);\n   return 0;\n}',
            output: 'The substring is: iaBIX'
        }
    ]
  }
];

const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Modified for declarations and code blocks) ---
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
                            return <p key={index} className="leading-relaxed" style={{ color: '#111827' }}>{item.title && <strong className='font-semibold'>{item.title} </strong>}{item.content}</p>;
                        }
                        if (item.type === 'declaration') {
                             return (
                                <div key={index}>
                                    <h4 className='font-semibold text-gray-800'>Declaration:</h4>
                                    <pre className='text-sm whitespace-pre-wrap font-mono text-red-600 bg-gray-100 p-2 rounded-md'>{item.declaration}</pre>
                                    {item.content && <p className="leading-relaxed mt-2" style={{ color: '#111827' }}>{item.content}</p>}
                                </div>
                             );
                        }
                        if (item.type === 'code') {
                            return (
                                <div key={index}>
                                    {item.title && <p className="font-semibold mb-2" style={{ color: '#111827' }}>{item.title}</p>}
                                    <div className="bg-gray-100 p-4 rounded-md">
                                        <pre className="text-sm whitespace-pre-wrap font-mono text-gray-800">{item.code}</pre>
                                        {item.output && <pre className="text-sm whitespace-pre-wrap font-mono text-green-700 mt-2 border-t border-gray-200 pt-2"><strong>Output:</strong><br/>{item.output}</pre>}
                                    </div>
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
export default function StringsPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">C - Strings</span></p>
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