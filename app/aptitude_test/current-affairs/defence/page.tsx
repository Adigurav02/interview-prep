"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Defence Current Affairs page ---

const subPageLinks = ["Defence - Latest Current Affairs"];

const generalQuestions = [
  {
    question: "In which Indian state is the 14th edition of Exercise MAITREE between India and Thailand being conducted in 2025?",
    options: ["Assam", "Meghalaya", "Manipur", "Nagaland"],
    answer: "B",
    explanation: [
      { type: 'text', content: "The 14th edition of Exercise MAITREE between the Indian Army and the Royal Thai Army began on September 1, 2025, at the Joint Training Node (JTN) in Umroi, Meghalaya. This exercise, first initiated in 2006, is aimed at improving interoperability, trust, and joint operational capabilities in counter-terrorism and semi-urban warfare. India is represented by the Madras Regiment, while Thailand has deployed personnel from the 1st Infantry Battalion, 14th Infantry Brigade. With training modules covering tactical drills, arms handling, and UN Charter-based operations, the exercise highlights the deepening defence cooperation between India and Thailand in the Indo-Pacific region." },
      { type: 'date', content: 'Date : 2025-09-03' }
    ]
  },
  {
    question: "In which state did the Indian Army conduct the Yudh Kaushal 3.0 exercise?",
    options: ["Arunachal Pradesh", "Sikkim", "Uttarakhand", "Himachal Pradesh"],
    answer: "A",
    explanation: [
      { type: 'text', content: "The Indian Army successfully conducted the Yudh Kaushal 3.0 exercise in Arunachal Pradesh's high-altitude terrain, demonstrating its preparedness for modern multi-domain warfare. The drill emphasised the integration of cutting-edge technologies, drone-based surveillance, precision strikes, and AI-enabled operational concepts. Specialised units like ASHNI platoons were deployed to showcase tactical agility and innovation. The exercise also highlighted India's Atmanirbhar Bharat initiative by incorporating domestically developed defence technologies. Alongside Yudh Kaushal 3.0, a parallel exercise named Achook Prahar was conducted to test inter-agency coordination with the Indo-Tibetan Border Police (ITBP), reinforcing joint operational effectiveness in challenging border regions." },
      { type: 'date', content: 'Date : 2025-09-02' }
    ]
  },
  {
    question: "Who has been appointed as the Air Officer-in-Charge Maintenance at the Indian Air Force Headquarters?",
    options: ["Air Marshal Sanjiv Ghuratia", "Air Marshal Vivek Ram Chaudhari", "Air Marshal Raghunath Nambiar", "Air Marshal Harjit Singh Arora"],
    answer: "A",
    explanation: [
      { type: 'text', content: "Air Marshal Sanjiv Ghuratia, AVSM, VSM, has taken charge as the Air Officer-in-Charge Maintenance (AOM) at the Indian Air Force Headquarters. With a distinguished service career spanning 37 years, he is recognised for his deep technical expertise and leadership in aviation logistics and maintenance. Commissioned in 1988 in the Aeronautical Engineering branch, he has pursued higher studies at institutions such as BITS Pilani, Madras University, and Bhopal University. He has also served on the UN mission in Congo and received commendations for his contributions. Decorated with the Vishisht Seva Medal and the Ati Vishisht Seva Medal, his appointment underscores the IAF's focus on technical excellence and operational readiness." },
      { type: 'date', content: 'Date : 2025-09-02' }
    ]
  },
  {
    question: "What is the name of the new commando battalions being raised by the Indian Army to enhance strike capabilities?",
    options: ["Garuda", "Bhairav", "Vajra", "Trishul"],
    answer: "B",
    explanation: [
        { type: 'text', content: 'The Indian Army is raising five new commando battalions named "Bhairav" to significantly boost its strike capabilities. Each battalion will consist of 250 soldiers selected from existing infantry units. These specialised units are being deployed with the objective of strengthening India\'s response along sensitive borders with China and Pakistan while also relieving the Para-Special Forces from certain operational pressures. The Bhairav battalions will be equipped with cutting-edge technology, including drones, surveillance systems, and tactical gadgets. They are planned to be strategically stationed across the Northern Command, the western desert region, and the eastern hilly terrain to ensure rapid and effective responses.' },
        { type: 'date', content: 'Date : 2025-09-02' }
    ]
  },
  {
    question: "In which state was the joint, high-altitude exercise Achook Prahar conducted by the Indian Army and ITBP?",
    options: ["Sikkim", "Himachal Pradesh", "Arunachal Pradesh", "Uttarakhand"],
    answer: "C",
    explanation: [
      { type: 'text', content: "The Indian Army and the Indo-Tibetan Border Police (ITBP) successfully carried out the high-altitude exercise Achook Prahar in Arunachal Pradesh. This exercise was conducted under simulated combat conditions to test interoperability, layered defence systems, and rapid response mechanisms in the eastern sector. It highlighted the preparedness of the armed forces to respond to potential challenges in difficult terrains. The exercise also follows earlier integrated drills such as Prachand Prahar and Poorvi Prahar conducted in the same region, reinforcing India's strategic focus and operational readiness along its eastern borders." },
      { type: 'date', content: 'Date : 2025-09-01' }
    ]
  }
];

const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components (Unchanged) ---
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
                <div className="space-y-3 text-gray-800">
                    {explanation.map((item, index) => {
                        if (item.type === 'text') {
                            return <p key={index} className="leading-relaxed">{item.content}</p>;
                        }
                        if (item.type === 'date') {
                            return <p key={index} className="text-sm text-gray-500 mt-4 font-medium">{item.content}</p>;
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
export default function DefencePage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Defence - Latest Current Affairs</span></p>
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}