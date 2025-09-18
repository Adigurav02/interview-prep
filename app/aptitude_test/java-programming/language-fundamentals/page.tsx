"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Java Language Fundamentals page ---

const subPageLinks = [
    "Java - Language Fundamentals - Section 1",
];

const generalQuestions = [
  {
    question: "Which four options describe the correct default values for array elements of the types indicated?\n\n1. int -> 0\n2. String -> \"null\"\n3. Dog -> null\n4. char -> '\\u0000'\n5. float -> 0.0f\n6. boolean -> true",
    options: [
        "1, 2, 3, 4", 
        "1, 3, 4, 5", 
        "2, 4, 5, 6", 
        "3, 4, 5, 6"
    ],
    answer: "B",
    explanation: [
      { type: 'text', content: "(1), (3), (4), (5) are the correct statements." },
      { type: 'highlighted-text', content: "(2) is wrong because the default value for a String (and any other object reference) is null, with no quotes." },
      { type: 'highlighted-text', content: "(6) is wrong because the default value for boolean elements is false." }
    ]
  },
  {
    question: "Which one of these lists contains only Java programming language keywords?",
    options: [
        "class, if, void, long, Int, continue", 
        "goto, instanceof, native, finally, default, throws", 
        "try, virtual, throw, final, volatile, transient", 
        "strictfp, constant, super, implements, do",
        "byte, break, assert, switch, include"
    ],
    answer: "B",
    explanation: [
      { type: 'highlighted-text', content: "All the words in option B are among the 49 Java keywords. Although goto reserved as a keyword in Java, goto is not used and has no function." },
      { type: 'highlighted-text', content: "Option A is wrong because the keyword for the primitive int starts with a lowercase i." },
      { type: 'highlighted-text', content: "Option C is wrong because \"virtual\" is a keyword in C++, but not Java." },
      { type: 'highlighted-text', content: "Option D is wrong because \"constant\" is not a keyword. Constants in Java are marked static and final." },
      { type: 'highlighted-text', content: "Option E is wrong because \"include\" is a keyword in C, but not in Java." },
    ]
  },
  {
    question: "Which will legally declare, construct, and initialize an array?",
    options: [
        "int [] myList = {\"1\", \"2\", \"3\"};", 
        "int [] myList = {5, 8, 2};", 
        "int myList [][] = {4,9,7,0};", 
        "int myList [] = {4, 3, 7};"
    ],
    answer: "D",
    explanation: [
      { type: 'text', content: "The only legal array declaration and assignment statement is Option D" },
      { type: 'highlighted-text', content: "Option A is wrong because it initializes an int array with String literals." },
      { type: 'text', content: "Option B is wrong because it use something other than curly braces for the initialization." },
      { type: 'text', content: "Option C is wrong because it provides initial values for only one dimension, although the declared array is a two-dimensional array." }
    ]
  },
  {
    question: "Which is a reserved word in the Java programming language?",
    options: ["method", "native", "subclasses", "reference", "array"],
    answer: "B",
    explanation: [
      { type: 'highlighted-text', content: "The word \"native\" is a valid keyword, used to modify a method declaration." },
      { type: 'text', content: "Option A, D and E are not keywords. Option C is wrong because the keyword for subclassing in Java is extends, not 'subclasses'." }
    ]
  },
  {
    question: "Which is a valid keyword in java?",
    options: ["interface", "string", "Float", "unsigned"],
    answer: "A",
    explanation: [
      { type: 'highlighted-text', content: "interface is a valid keyword." },
      { type: 'highlighted-text', content: "Option B is wrong because although \"string\" is a class type in Java, \"string\" is not a keyword." },
      { type: 'highlighted-text', content: "Option C is wrong because \"Float\" is a class type. The keyword for the Java primitive is float." },
      { type: 'highlighted-text', content: "Option D is wrong because \"unsigned\" is a keyword in C/C++ but not in Java." },
    ]
  }
];

const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Modified for highlighted text) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { 
    // Function to find and wrap specific keywords in a string
    const renderHighlightedText = (text: string) => {
        const keywords = ['String', 'null', 'false', 'goto', 'int', 'virtual', 'constant', 'static', 'final', 'include', 'native', 'interface', 'string', 'Float', 'float', 'unsigned'];
        const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
        const parts = text.split(regex);
        return parts.map((part, i) => 
            keywords.includes(part) ? <strong key={i} className="font-semibold text-red-600">{part}</strong> : part
        );
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
                <div className="space-y-3 text-gray-800">
                    {explanation.map((item, index) => {
                        if (item.type === 'text') {
                            return <p key={index} className="leading-relaxed" style={{ color: '#111827' }}>{item.content}</p>;
                        }
                        if (item.type === 'highlighted-text') {
                            return <p key={index} className="leading-relaxed" style={{ color: '#111827' }}>{renderHighlightedText(item.content)}</p>;
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
export default function LanguageFundamentalsPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Java - Language Fundamentals</span></p>
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