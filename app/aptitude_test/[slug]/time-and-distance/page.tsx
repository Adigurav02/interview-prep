"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Time and Distance page ---

const formulasContent = [
  { type: 'heading', text: '1. Speed, Time and Distance:' },
  { type: 'formula', text: 'Speed = (Distance / Time), Time = (Distance / Speed), Distance = (Speed x Time)' },
  { type: 'heading', text: '2. km/hr to m/sec conversion:' },
  { type: 'formula', text: 'x km/hr = (x * 5/18) m/sec' },
  { type: 'heading', text: '3. m/sec to km/hr conversion:' },
  { type: 'formula', text: 'x m/sec = (x * 18/5) km/hr' },
  { type: 'heading', text: '4. Ratio of Speeds and Times:' },
  { type: 'text', text: 'If the ratio of the speeds of A and B is a : b, then the ratio of the times taken by them to cover the same distance is 1/a : 1/b or b : a.' },
  { type: 'heading', text: '5. Average Speed:' },
  { type: 'text', text: 'Suppose a man covers a certain distance at x km/hr and an equal distance at y km/hr. Then, the average speed during the whole journey is (2xy / (x+y)) km/hr.' },
];

const generalQuestions = [
  {
    question: "A person crosses a 600 m long street in 5 minutes. What is his speed in km per hour?",
    options: ["3.6", "7.2", "8.4", "10"],
    answer: "B",
    explanation: [
      { type: 'formula', content: 'Speed = (600 / (5 * 60)) m/sec' },
      { type: 'text', content: '= 2 m/sec.' },
      { type: 'text', content: 'Converting m/sec to km/hr (see important formulas section):' },
      { type: 'formula', content: '= (2 * 18/5) km/hr' },
      { type: 'text', content: '= 7.2 km/hr.' },
    ]
  },
  {
    question: "An aeroplane covers a certain distance at a speed of 240 kmph in 5 hours. To cover the same distance in 1 2/3 hours, it must travel at a speed of:",
    options: ["300 kmph", "360 kmph", "600 kmph", "720 kmph"],
    answer: "D",
    explanation: [
      { type: 'formula', content: 'Distance = (240 * 5) = 1200 km.' },
      { type: 'text', content: 'Speed = Distance / Time' },
      { type: 'text', content: 'Time = 1 2/3 hours = 5/3 hours.' },
      { type: 'formula', content: 'Required speed = 1200 / (5/3) km/hr.' },
      { type: 'formula', content: '= (1200 * 3/5) km/hr = 720 kmph.' },
    ]
  },
  {
    question: "If a person walks at 14 km/hr instead of 10 km/hr, he would have walked 20 km more. The actual distance travelled by him is:",
    options: ["50 km", "56 km", "70 km", "80 km"],
    answer: "A",
    explanation: [
      { type: 'text', content: 'Let the actual distance travelled be x km.' },
      { type: 'formula', content: 'Then, x/10 = (x + 20)/14' },
      { type: 'formula', content: '⇒ 14x = 10x + 200' },
      { type: 'formula', content: '⇒ 4x = 200' },
      { type: 'formula', content: '⇒ x = 50 km.' },
    ]
  },
  {
    question: "A train can travel 50% faster than a car. Both start from point A at the same time and reach point B 75 kms away from A at the same time. On the way, however, the train lost about 12.5 minutes while stopping at the stations. The speed of the car is:",
    options: ["100 kmph", "110 kmph", "120 kmph", "130 kmph"],
    answer: "C",
    explanation: [
      { type: 'text', content: 'Let the speed of the car be x kmph.' },
      { type: 'text', content: 'Then, speed of the train = 150% of x = (150/100)x = (3/2)x kmph.' },
      { type: 'text', content: 'Time taken by car = 75/x hrs.' },
      { type: 'text', content: 'Time taken by train = 75 / (3/2)x = 50/x hrs.' },
      { type: 'formula', content: '(75/x) - (50/x) = 12.5 / 60' },
      { type: 'formula', content: '⇒ 25/x = 125 / 600 = 5/24' },
      { type: 'formula', content: '⇒ x = (25 * 24) / 5 = 120 kmph.' },
    ]
  },
  {
    question: "Excluding stoppages, the speed of a bus is 54 kmph and including stoppages, it is 45 kmph. For how many minutes does the bus stop per hour?",
    options: ["9", "10", "12", "20"],
    answer: "B",
    explanation: [
      { type: 'text', content: 'Due to stoppages, it covers (54 - 45) = 9 km less per hour.' },
      { type: 'formula', content: 'Time taken to cover 9 km = (9 / 54) * 60 min' },
      { type: 'text', content: '= 10 min.' },
    ]
  }
];

const subPageLinks = [ "Time and Distance - Formulas", "Time and Distance - General Questions"];
const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Unchanged) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { return ( <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn"> <div className="flex items-center gap-2"> <p className="font-bold text-gray-900">Answer: Option</p> <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"> <span className='font-sans font-semibold text-xs text-white'>{answer}</span> </div> </div> <div> <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3> <div className="space-y-3 text-gray-800"> {explanation.map((item, index) => { if (item.type === 'text') { return <p key={index}>{item.content}</p>; } if (item.type === 'formula') { return <p key={index} className="font-sans text-gray-900 text-center bg-slate-100 p-3 border border-slate-200 rounded">{item.content}</p>; } if (item.type === 'video') { return ( <p key={index} className="font-semibold pt-2"> Video Explanation: <Link href={item.content} target="_blank" className="text-blue-600 hover:underline">{item.content}</Link> </p> ); } return null; })} </div> </div> </div> ); };
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => { return ( <div className="flex justify-center items-center gap-2 mt-8"> {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => ( <button key={num} onClick={() => onPageChange(num)} className={`px-4 py-2 text-sm font-semibold border rounded-md transition-colors ${currentPage === num ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`} > {num} </button> ))} </div> ); };


// --- MAIN PAGE COMPONENT ---
export default function TimeAndDistancePage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Time and Distance</span></p>
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