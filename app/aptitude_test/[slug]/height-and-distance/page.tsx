"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Height and Distance page ---

const formulasContent = [
  { type: 'heading', text: '1. Trigonometry:' },
  { type: 'text', text: 'In a right-angled triangle OAB, where ∠BOA = θ:' },
  { type: 'formula', content: 'i. sin θ = Perpendicular/Hypotenuse = AB/OB' },
  { type: 'formula', content: 'ii. cos θ = Base/Hypotenuse = OA/OB' },
  { type: 'formula', content: 'iii. tan θ = Perpendicular/Base = AB/OA' },
  { type: 'formula', content: 'iv. cosec θ = 1/sin θ = OB/AB' },
  { type: 'formula', content: 'v. sec θ = 1/cos θ = OB/OA' },
  { type: 'formula', content: 'vi. cot θ = 1/tan θ = OA/AB' },
  { type: 'heading', text: '2. Trigonometrical Identities:' },
  { type: 'text', text: '1. sin²θ + cos²θ = 1' },
  { type: 'text', text: '2. 1 + tan²θ = sec²θ' },
  { type: 'text', text: '3. 1 + cot²θ = cosec²θ' },
  { type: 'heading', text: '3. Values of T-ratios:' },
  { type: 'table', content: [
      ['θ', '0°', '30°', '45°', '60°', '90°'],
      ['sin θ', '0', '1/2', '1/√2', '√3/2', '1'],
      ['cos θ', '1', '√3/2', '1/√2', '1/2', '0'],
      ['tan θ', '0', '1/√3', '1', '√3', 'not defined']
  ]},
  { type: 'heading', text: '4. Angle of Elevation:' },
  { type: 'text', text: 'Suppose a man from a point O looks up at an object P, placed above the level of his eye. Then, the angle which the line of sight makes with the horizontal through O, is called the angle of elevation of P as seen from O.' },
  { type: 'heading', text: '5. Angle of Depression:' },
  { type: 'text', text: 'Suppose a man from a point O looks down at an object P, placed below the level of his eye, then the angle which the line of sight makes with the horizontal through O, is called the angle of depression of P as seen from O.' },
];

const generalQuestions = [
  {
    question: "Two ships are sailing in the sea on the two sides of a lighthouse. The angle of elevation of the top of the lighthouse is observed from the ships are 30° and 45° respectively. If the lighthouse is 100 m high, the distance between the two ships is:",
    options: ["173 m", "200 m", "273 m", "300 m"],
    answer: "C",
    explanation: [
      { type: 'text', content: 'Let AB be the lighthouse and C and D be the positions of the ships.' },
      { type: 'text', content: 'Then, AB = 100 m, ∠ACB = 30° and ∠ADB = 45°.' },
      { type: 'formula', content: 'AB/AC = tan 30° = 1/√3  ⇒ AC = AB * √3 = 100√3 m.' },
      { type: 'formula', content: 'AB/AD = tan 45° = 1 ⇒ AD = AB = 100 m.' },
      { type: 'formula', content: 'CD = (AC + AD) = (100√3 + 100) m' },
      { type: 'formula', content: '= 100(√3 + 1) = 100(1.73 + 1) = 100 * 2.73 = 273 m.' },
    ]
  },
  {
    question: "A man standing at a point P is watching the top of a tower, which makes an angle of elevation of 30° with the man's eye. The man walks some distance towards the tower to watch its top and the angle of the elevation becomes 60°. What is the distance between the base of the tower and the point P?",
    options: ["4√3 units", "8 units", "12 units", "Data inadequate"],
    answer: "D",
    explanation: [
      { type: 'text', content: 'Let AB be the tower and the two positions of the man be C and D.' },
      { type: 'text', content: 'One of AB, AC or CD must have been given to find the required distance.' },
      { type: 'text', content: 'So, the data is inadequate.' },
    ]
  },
  {
    question: "The angle of elevation of a ladder leaning against a wall is 60° and the foot of the ladder is 4.6 m away from the wall. The length of the ladder is:",
    options: ["2.3 m", "4.6 m", "7.8 m", "9.2 m"],
    answer: "D",
    explanation: [
      { type: 'text', content: 'Let AB be the wall and BC be the ladder.' },
      { type: 'text', content: 'Then, ∠ACB = 60° and AC = 4.6 m.' },
      { type: 'formula', content: 'AC/BC = cos 60° = 1/2' },
      { type: 'formula', content: '⇒ BC = 2 * AC = (2 * 4.6) m = 9.2 m.' },
    ]
  },
  {
    question: "An observer 1.6 m tall is 20√3 away from a tower. The angle of elevation from his eye to the top of the tower is 30°. The height of the tower is:",
    options: ["21.6 m", "23.2 m", "24.72 m", "None of these"],
    answer: "A",
    explanation: [
      { type: 'text', content: 'Let AB be the observer and CD be the tower.' },
      { type: 'text', content: 'Draw BE ⊥ CD. Then, CE = AB = 1.6 m, BE = AC = 20√3 m.' },
      { type: 'formula', content: 'DE/BE = tan 30° = 1/√3' },
      { type: 'formula', content: '⇒ DE = BE / √3 = 20√3 / √3 = 20 m.' },
      { type: 'formula', content: '∴ CD = CE + DE = (1.6 + 20) m = 21.6 m.' },
    ]
  },
  {
    question: "From a point P on a level ground, the angle of elevation of the top tower is 30°. If the tower is 100 m high, the distance of point P from the foot of the tower is:",
    options: ["149 m", "156 m", "173 m", "200 m"],
    answer: "C",
    explanation: [
      { type: 'text', content: 'Let AB be the tower.' },
      { type: 'text', content: 'Then, ∠APB = 30° and AB = 100 m.' },
      { type: 'formula', content: 'AB/AP = tan 30° = 1/√3' },
      { type: 'formula', content: '⇒ AP = (AB * √3) m = 100√3 m' },
      { type: 'formula', content: '= (100 * 1.73) m = 173 m.' },
    ]
  }
];

const subPageLinks = [ "Height and Distance - Formulas", "Height and Distance - General Questions"];
const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Unchanged) ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { return ( <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 animate-fadeIn"> <div className="flex items-center gap-2"> <p className="font-bold text-gray-900">Answer: Option</p> <div className="w-6 h-6 border-2 border-green-600 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0"> <span className='font-sans font-semibold text-xs text-white'>{answer}</span> </div> </div> <div> <h3 className="font-bold text-gray-900 mb-2">Explanation:</h3> <div className="space-y-3 text-gray-800"> {explanation.map((item, index) => { if (item.type === 'text') { return <p key={index}>{item.content}</p>; } if (item.type === 'formula') { return <p key={index} className="font-sans text-gray-900 text-center bg-slate-100 p-3 border border-slate-200 rounded">{item.content}</p>; } if (item.type === 'video') { return ( <p key={index} className="font-semibold pt-2"> Video Explanation: <Link href={item.content} target="_blank" className="text-blue-600 hover:underline">{item.content}</Link> </p> ); } return null; })} </div> </div> </div> ); };
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => { return ( <div className="flex justify-center items-center gap-2 mt-8"> {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => ( <button key={num} onClick={() => onPageChange(num)} className={`px-4 py-2 text-sm font-semibold border rounded-md transition-colors ${currentPage === num ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`} > {num} </button> ))} </div> ); };


// --- MAIN PAGE COMPONENT ---
export default function HeightAndDistancePage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Height and Distance</span></p>
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
                    {formulasContent.map((item, index) => {
                        if (item.type === 'heading') return <h2 key={index} className="text-xl font-bold text-gray-900 pt-4">{item.text}</h2>;
                        if (item.type === 'formula') return <p key={index} className="font-sans text-gray-800 bg-slate-100 p-4 rounded-md border border-slate-200 text-center">{item.content}</p>;
                        if (item.type === 'text') return <p key={index} className="text-gray-700">{item.text}</p>;
                        if (item.type === 'table') {
                            return (
                                <div key={index} className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-200 text-center">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                {item.content[0].map((header, hIndex) => <th key={hIndex} className="p-2 border border-gray-200">{header}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.content.slice(1).map((row, rIndex) => (
                                                <tr key={rIndex}>
                                                    {row.map((cell, cIndex) => <td key={cIndex} className="p-2 border border-gray-200 font-mono">{cell}</td>)}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            );
                        }
                        return null;
                    })}
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