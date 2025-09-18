"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Operators and Assignments page ---

const subPageLinks = [
    "Java - Operators and Assignments - Section 1",
];

const generalQuestions = [
  {
    question: "What will be the output of the program?\n\nclass PassA\n{\n    public static void main(String [] args)\n    {\n        PassA p = new PassA();\n        p.start();\n    }\n\n    void start()\n    {\n        long [] a1 = {3,4,5};\n        long [] a2 = fix(a1);\n        System.out.print(a1[0] + a1[1] + a1[2] + \" \");\n        System.out.println(a2[0] + a2[1] + a2[2]);\n    }\n\n    long [] fix(long [] a3)\n    {\n        a3[1] = 7;\n        return a3;\n    }\n}",
    options: ["12 15", "15 15", "3 4 5 3 7 5", "3 7 5 3 7 5"],
    answer: "B",
    explanation: [
      { type: 'text', content: "Output: 15 15" },
      { type: 'highlighted-text', content: "The reference variables a1 and a3 refer to the same long array object. When the [1] element is updated in the fix() method, it is updating the array referred to by a1. The reference variable a2 refers to the same array object." },
      { type: 'text', content: "So Output: 3+7+5+\" \"+3+7+5" },
      { type: 'text', content: "Output: 15 15 Because Numeric values will be added" },
    ]
  },
  {
    question: "What will be the output of the program?\n\nclass Test\n{\n    public static void main(String [] args)\n    {\n        Test p = new Test();\n        p.start();\n    }\n\n    void start()\n    {\n        boolean b1 = false;\n        boolean b2 = fix(b1);\n        System.out.println(b1 + \" \" + b2);\n    }\n\n    boolean fix(boolean b1)\n    {\n        b1 = true;\n        return b1;\n    }\n}",
    options: ["true true", "false true", "true false", "false false"],
    answer: "B",
    explanation: [
      { type: 'highlighted-text', content: "The boolean b1 in the fix() method is a different boolean than the b1 in the start() method. The b1 in the start() method is not updated by the fix() method." }
    ]
  },
  {
    question: "What will be the output of the program?\n\nclass PassS\n{\n    public static void main(String [] args)\n    {\n        PassS p = new PassS();\n        p.start();\n    }\n\n    void start()\n    {\n        String s1 = \"slip\";\n        String s2 = fix(s1);\n        System.out.println(s1 + \" \" + s2);\n    }\n\n    String fix(String s1)\n    {\n        s1 = s1 + \"stream\";\n        System.out.print(s1 + \" \");\n        return \"stream\";\n    }\n}",
    options: ["a slip stream", "b slipstream stream", "c stream slip stream", "d slipstream slip stream"],
    answer: "D",
    explanation: [
      { type: 'highlighted-text', content: "When the fix() method is first entered, start()'s s1 and fix()'s s1 reference variables both refer to the same String object (with a value of \"slip\"). fix()'s s1 is reassigned to a new object that is created when the concatenation occurs (this second String object has a value of \"slipstream\"). When the program returns to start(), another String object is created, referred to by s2 and with a value of \"stream\"." },
    ]
  },
  {
    question: "What will be the output of the program?\n\nclass BitShift\n{\n    public static void main(String [] args)\n    {\n        int x = 0x80000000;\n        System.out.print(x + \" and \");\n        x = x >>> 31;\n        System.out.println(x);\n    }\n}",
    options: ["-2147483648 and 1", "0x80000000 and 0x00000001", "-2147483648 and -1", "1 and -2147483648"],
    answer: "A",
    explanation: [
      { type: 'highlighted-text', content: "Option A is correct. The >>> operator moves all bits to the right, zero filling the left bits. The bit transformation looks like this:" },
      { type: 'text', content: "Before: 1000 0000 0000 0000 0000 0000 0000 0000" },
      { type: 'text', content: "After: 0000 0000 0000 0000 0000 0000 0000 0001" },
      { type: 'highlighted-text', content: "Option C is incorrect because the >> operator zero fills the left bits, which in this case changes the sign of x, as shown." },
      { type: 'highlighted-text', content: "Option B is incorrect because the output method print() always displays integers in base 10." },
      { type: 'text', content: "Option D is incorrect because this is the reverse order of the two output numbers." }
    ]
  },
  {
    question: "What will be the output of the program?\n\nclass Equals\n{\n    public static void main(String [] args)\n    {\n        int x = 100;\n        double y = 100.1;\n        boolean b = (x = y); /* Line 7 */\n        System.out.println(b);\n    }\n}",
    options: ["true", "false", "Compilation fails", "An exception is thrown at runtime"],
    answer: "C",
    explanation: [
      { type: 'highlighted-text', content: "The code will not compile because in line 7, the line will work only if we use (x==y) in the line. The == operator compares values to produce a boolean, whereas the = operator assigns a value to variables." },
      { type: 'text', content: "Option A, B, and D are incorrect because the code does not get as far as compiling. If we corrected this code, the output would be false." }
    ]
  }
];

const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Modified for highlighted text) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { 
    const renderHighlightedText = (text: string) => {
        const keywords = ['a1', 'a3', 'fix()', 'a2', 'b1', 'start()', 'print()'];
        const regex = new RegExp(`(${keywords.join('|')})`, 'g');
        const parts = text.split(regex);
        return parts.map((part, i) => 
            keywords.includes(part) ? <code key={i} className="font-semibold text-red-600 bg-red-50 px-1 rounded">{part}</code> : part
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
export default function OperatorsAndAssignmentsPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Java - Operators and Assignments</span></p>
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
                        <div className="mb-4 text-gray-900 font-medium whitespace-pre-wrap bg-gray-100 p-4 rounded-md">
                          <p className='mb-4'>{questionIndex + 1}. {q.question.split('\n\n')[0]}</p>
                          <pre className="text-sm font-mono">{q.question.split('\n\n')[1]}</pre>
                        </div>
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