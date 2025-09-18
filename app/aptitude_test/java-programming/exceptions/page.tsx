"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Java Exceptions page ---

const subPageLinks = [
    "Java - Exceptions - Section 1",
];

const generalQuestions = [
  {
    question: "What will be the output of the program?\n\npublic class Foo\n{\n    public static void main(String[] args)\n    {\n        try\n        {\n            return;\n        }\n        finally\n        {\n            System.out.println(\"Finally\");\n        }\n    }\n}",
    options: ["Finally", "Compilation fails.", "The code runs with no output.", "An exception is thrown at runtime."],
    answer: "A",
    explanation: [
      { type: 'text', content: "If you put a finally block after a try and its associated catch blocks, then once execution enters the try block, the code in that finally block will definitely be executed except in the following circumstances:" },
      { type: 'list', items: ["An exception arising in the finally block itself.", "The death of the thread.", "The use of System.exit()", "Turning off the power to the CPU."] },
      { type: 'text', content: "I suppose the last three could be classified as VM shutdown." },
    ]
  },
  {
    question: "What will be the output of the program?\n\ntry\n{\n    int x = 0;\n    int y = 5 / x;\n}\ncatch (Exception e)\n{\n    System.out.println(\"Exception\");\n}\ncatch (ArithmeticException ae)\n{\n    System.out.println(\"Arithmetic Exception\");\n}\nSystem.out.println(\"finished\");",
    options: ["finished", "Exception", "Compilation fails.", "Arithmetic Exception"],
    answer: "C",
    explanation: [
      { type: 'highlighted-text', content: "Compilation fails because ArithmeticException has already been caught. ArithmeticException is a subclass of java.lang.Exception, by the time the ArithmeticException has been specified it has already been caught by the Exception class." },
      { type: 'highlighted-text', content: "If ArithmeticException appears before Exception, then the file will compile. When catching exceptions the more specific exceptions must be listed before the more general (the subclasses must be caught before the superclasses)." },
    ]
  },
  {
    question: "What will be the output of the program?\n\npublic class X\n{\n    public static void main(String [] args)\n    {\n        try\n        {\n            badMethod();\n            System.out.print(\"A\");\n        }\n        catch (Exception ex)\n        {\n            System.out.print(\"B\");\n        }\n        finally\n        {\n            System.out.print(\"C\");\n        }\n        System.out.print(\"D\");\n    }\n    public static void badMethod()\n    {\n        throw new Error(); /* Line 22 */\n    }\n}",
    options: ["ABCD", "Compilation fails.", "C is printed before exiting with an error message.", "D BC is printed before exiting with an error message."],
    answer: "C",
    explanation: [
      { type: 'highlighted-text', content: "Error is thrown but not recognised line(22) because the only catch attempts to catch an Exception and Exception is not a superclass of Error. Therefore only the code in the finally statement can be run before exiting with a runtime error (Exception in thread \"main\" java.lang.Error)." },
    ]
  },
  {
    question: "What will be the output of the program?\n\npublic class X\n{\n    public static void main(String [] args)\n    {\n        try\n        {\n            badMethod();\n            System.out.print(\"A\");\n        }\n        catch (RuntimeException ex) /* Line 10 */\n        {\n            System.out.print(\"B\");\n        }\n        catch (Exception ex1)\n        {\n            System.out.print(\"C\");\n        }\n        finally\n        {\n            System.out.print(\"D\");\n        }\n        System.out.print(\"E\");\n    }\n    public static void badMethod()\n    {\n        throw new RuntimeException();\n    }\n}",
    options: ["BD", "BCD", "BDE", "BCDE"],
    answer: "C",
    explanation: [
      { type: 'text', content: "A Run time exception is thrown and caught in the catch statement on line 10. All the code after the finally statement is run because the exception has been caught." }
    ]
  },
  {
    question: "What will be the output of the program?\n\npublic class RTExcept\n{\n    public static void throwit ()\n    {\n        System.out.print(\"throwit \");\n        throw new RuntimeException();\n    }\n    public static void main(String [] args)\n    {\n        try\n        {\n            System.out.print(\"hello \");\n            throwit();\n        }\n        catch (Exception re )\n        {\n            System.out.print(\"caught \");\n        }\n        finally\n        {\n            System.out.print(\"finally \");\n        }\n        System.out.println(\"after \");\n    }\n}",
    options: ["hello throwit caught", "Compilation fails", "hello throwit RuntimeException caught after", "hello throwit caught finally after"],
    answer: "D",
    explanation: [
      { type: 'highlighted-text', content: "The main() method properly catches and handles the RuntimeException in the catch block, finally runs (as it always does), and then the code returns to normal." },
      { type: 'text', content: "A, B and C are incorrect based on the program logic described above. Remember that properly handled exceptions do not cause the program to stop executing." },
    ]
  }
];

const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Modified for highlighted text and lists) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { 
    const renderHighlightedText = (text: string) => {
        const keywords = ['System.exit()', 'ArithmeticException', 'java.lang.Exception', 'Exception', 'Error', 'finally', 'main()', 'RuntimeException'];
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
                        if (item.type === 'list') {
                            return (
                                <ul key={index} className="list-disc list-inside space-y-1 pl-2">
                                    {item.items.map((li, i) => <li key={i} style={{ color: '#111827' }}>{li}</li>)}
                                </ul>
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
export default function ExceptionsPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Java - Exceptions</span></p>
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