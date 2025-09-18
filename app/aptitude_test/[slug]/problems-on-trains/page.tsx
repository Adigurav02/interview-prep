"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- MOCK DATA (This data is specific to this page) ---
const formulasContent = [
  { type: 'heading', text: '1. km/hr to m/s conversion:' },
  { type: 'formula', text: 'a km/hr = ( a x 5/18 ) m/s.' },
  { type: 'heading', text: '2. m/s to km/hr conversion:' },
  { type: 'formula', text: 'a m/s = ( a x 18/5 ) km/hr.' },
  { type: 'heading', text: '3. Formulas for finding Speed, Time and Distance' },
  { type: 'text', text: '4. Time taken by a train of length l metres to pass a pole or standing man or a signal post is equal to the time taken by the train to cover l metres.' },
  { type: 'text', text: '5. Time taken by a train of length l metres to pass a stationery object of length b metres is the time taken by the train to cover (l + b) metres.' },
  { type: 'text', text: '6. Suppose two trains or two objects bodies are moving in the same direction at u m/s and v m/s, where u > v, then their relative speed is = (u - v) m/s.' },
  { type: 'text', text: '7. Suppose two trains or two objects bodies are moving in opposite directions at u m/s and v m/s, then their relative speed is = (u + v) m/s.' },
  { type: 'textWithFormula', text: '8. If two trains of length a metres and b metres are moving in opposite directions at u m/s and v m/s, then:', formula: 'The time taken by the trains to cross each other = ( (a + b) / (u + v) ) sec.' },
  { type: 'textWithFormula', text: '9. If two trains of length a metres and b metres are moving in the same direction at u m/s and v m/s, then:', formula: 'The time taken by the faster train to cross the slower train = ( (a + b) / (u - v) ) sec.' },
  { type: 'textWithFormula', text: '10. If two trains (or bodies) start at the same time from points A and B towards each other and after crossing they take a and b sec in reaching B and A respectively, then:', formula: "(A's speed) : (B's speed) = (√b : √a)" },
];

const generalQuestions = [
  { question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?", options: ["120 metres", "180 metres", "324 metres", "150 metres"], answer: "D", explanation: [ { type: 'text', content: 'Speed = [ 60 x 5/18 ] m/sec = [ 50/3 ] m/sec.' }, { type: 'text', content: 'Length of the train = (Speed x Time).' }, { type: 'formula', content: '∴ Length of the train = [ 50/3 x 9 ] m = 150 m.' } ] },
  { question: "A train 125 m long passes a man, running at 5 km/hr in the same direction in which the train is going, in 10 seconds. The speed of the train is:", options: ["45 km/hr", "50 km/hr", "54 km/hr", "55 km/hr"], answer: "B", explanation: [ { type: 'formula', content: 'Speed of the train relative to man = [ 125/10 ] m/sec' }, { type: 'formula', content: '= [ 25/2 ] m/sec.' }, { type: 'formula', content: '= [ 25/2 x 18/5 ] km/hr' }, { type: 'text', content: '= 45 km/hr.' }, { type: 'text', content: 'Let the speed of the train be x km/hr. Then, relative speed = (x - 5) km/hr.' }, { type: 'formula', content: '∴ x - 5 = 45  ⇒ x = 50 km/hr.' } ] },
  { question: "The length of the bridge, which a train 130 metres long and travelling at 45 km/hr can cross in 30 seconds, is:", options: ["200 m", "225 m", "245 m", "250 m"], answer: "C", explanation: [ { type: 'formula', content: 'Speed = [ 45 x 5/18 ] m/sec = [ 25/2 ] m/sec.' }, { type: 'text', content: 'Time = 30 sec.' }, { type: 'text', content: 'Let the length of the bridge be x metres.' }, { type: 'formula', content: 'Then, (130 + x) / 30 = 25/2' }, { type: 'formula', content: '⇒ 2(130 + x) = 750' }, { type: 'formula', content: '⇒ x = 245 m.' }, { type: 'video', content: 'https://youtu.be/M_d8WufJWKc' } ] },
  { question: "Two trains running in opposite directions cross a man standing on the platform in 27 seconds and 17 seconds respectively and they cross each other in 23 seconds. The ratio of their speeds is:", options: ["1 : 3", "3 : 2", "3 : 4", "None of these"], answer: "B", explanation: [ { type: "text", content: "Let the speeds of the two trains be x m/sec and y m/sec respectively." }, { type: "text", content: "Then, length of the first train = 27x metres, and length of the second train = 17y metres." }, { type: "formula", content: "When they cross each other: (27x + 17y) / (x + y) = 23" }, { type: "formula", content: "⇒ 27x + 17y = 23x + 23y" }, { type: "formula", content: "⇒ 4x = 6y" }, { type: "formula", content: "⇒ x / y = 3 / 2" }, { type: "text", content: "∴ The ratio of their speeds is 3 : 2." } ] },
  { question: "A train passes a station platform in 36 seconds and a man standing on the platform in 20 seconds. If the speed of the train is 54 km/hr, what is the length of the platform?", options: ["120 m", "240 m", "300 m", "None of these"], answer: "B", explanation: [ { type: "text", content: "Speed = (54 × 5/18) m/sec = 15 m/sec." }, { type: "formula", content: "Length of the train = (15 × 20) m = 300 m." }, { type: "text", content: "Let the length of the platform be x metres." }, { type: "formula", content: "(x + 300) / 36 = 15" }, { type: "formula", content: "⇒ x + 300 = 540" }, { type: "formula", content: "⇒ x = 240 m" }, { type: "text", content: "∴ Length of the platform = 240 metres." } ] }
];

const subPageLinks = [ "Problems on Trains - Formulas", "Problems on Trains - General Questions"];
const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Unchanged) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { return ( <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn"> <div className="flex items-center gap-2"> <p className="font-bold text-gray-900">Answer: Option</p> <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"> <span className='font-sans font-semibold text-xs text-white'>{answer}</span> </div> </div> <div> <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3> <div className="space-y-3 text-gray-800"> {explanation.map((item, index) => { if (item.type === 'text') { return <p key={index}>{item.content}</p>; } if (item.type === 'formula') { return <p key={index} className="font-sans text-gray-900 text-center bg-slate-100 p-3 border border-slate-200 rounded">{item.content}</p>; } if (item.type === 'video') { return ( <p key={index} className="font-semibold pt-2"> Video Explanation: <Link href={item.content} target="_blank" className="text-blue-600 hover:underline">{item.content}</Link> </p> ); } return null; })} </div> </div> </div> ); };
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => { return ( <div className="flex justify-center items-center gap-2 mt-8"> {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => ( <button key={num} onClick={() => onPageChange(num)} className={`px-4 py-2 text-sm font-semibold border rounded-md transition-colors ${currentPage === num ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`} > {num} </button> ))} </div> ); };


// --- MAIN PAGE COMPONENT ---
export default function ProblemsOnTrainsPage() {
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
    if (selectedAnswers[questionIndex]) return; // Prevents changing the answer
    
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Problems On Trains</span></p>
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
              {activeSubPage.includes('formulas') && (
                <div className="space-y-6 text-gray-800">
                  {formulasContent.map((item, index) => (
                    <div key={index}>
                      {item.type === 'heading' && <h2 className="text-xl font-bold text-gray-900">{item.text}</h2>}
                      {item.type === 'formula' && <p className="font-sans text-gray-800 bg-slate-100 p-4 rounded-md border border-slate-200 text-center">{item.text}</p>}
                      {item.type === 'text' && <p className="text-gray-700">{item.text}</p>}
                      {item.type === 'textWithFormula' && (
                        <div>
                           <p className="text-gray-700">{item.text}</p>
                           <p className="font-sans text-gray-800 bg-slate-100 p-4 rounded-md border border-slate-200 text-center mt-2">{item.formula}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {activeSubPage.includes('general-questions') && (
                <div className="space-y-8">
                  {currentQuestions.map((q, index) => {
                    const questionIndex = indexOfFirstQuestion + index;
                    const userSelectedOption = selectedAnswers[questionIndex];
                    const isAnswerVisible = visibleAnswers.includes(questionIndex) || !!userSelectedOption;

                    return (
                      <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                        <p className="mb-4 text-gray-900 font-medium">{questionIndex + 1}. {q.question}</p>
                        <div className="space-y-3">
                          {q.options.map((option, i) => {
                            const optionChar = String.fromCharCode(65 + i);
                            const isCorrect = optionChar === q.answer;
                            const isSelected = userSelectedOption === optionChar;
                            
                            // ================================================================= //
                            // /// *** CODE CORRECTION *** ///
                            // Added `text-gray-800` to the default style to make text visible.
                            // ================================================================= //
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
                                 <span>{option}</span>
                                 {icon}
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
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}