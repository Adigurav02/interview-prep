"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Art and Culture Current Affairs page ---

const subPageLinks = ["Art and Culture - Latest Current Affairs"];

const generalQuestions = [
  {
    question: "Which city hosted the Global Spiritual Conclave aimed at boosting spiritual tourism?",
    options: ["Ujjain", "Varanasi", "Haridwar", "Nashik"],
    answer: "A",
    explanation: [
      { type: 'text', content: "The Global Spiritual Conclave was held in Ujjain, Madhya Pradesh, with the objective of promoting spiritual tourism, preserving cultural heritage, and encouraging dialogue on responsible hospitality. Organised by the Tourism Department with support from the Ministry of Tourism, the event was inaugurated by Union Minister Gajendra Singh Shekhawat in the presence of Chief Minister Mohan Yadav. Ujjain, being one of India's most significant spiritual and cultural centers, was chosen as the venue to highlight its heritage and potential as a global hub for spiritual tourism, making the conclave an important step in strengthening India's cultural tourism landscape." },
      { type: 'date', content: 'Date : 2025-08-27' }
    ]
  },
  {
    question: "Which Indian state's traditional bullfighting sport 'Dhirio' was banned in 1996 under the Prevention of Cruelty to Animals Act?",
    options: ["Kerala", "Karnataka", "Goa", "Maharashtra"],
    answer: "C",
    explanation: [
      { type: 'text', content: "Goa's traditional bullfighting sport Dhirio, where two bulls lock horns in combat, was banned by the Bombay High Court in 1996 following a fatal incident and animal cruelty concerns. Rooted in Portuguese colonial heritage, this harvest-season event was once central to Goan village culture. Unlike Spanish bullfights, Dhirio pits bulls against each other without human combatants. While some MLAs advocate for its legalization (citing cultural preservation and tourism potential), the ban remains under India's animal welfare laws, mirroring debates around Tamil Nadu's Jallikattu. The sport continues to influence Goan diaspora betting cultures despite the prohibition." },
      { type: 'date', content: 'Date : 2025-08-17' }
    ]
  },
  {
    question: "Which organization released special picture postcards and a golden cancellation to mark the 50th anniversary of the film Sholay in 2025?",
    options: ["Film Federation of India", "India Post", "Ministry of Culture", "National Film Development Corporation"],
    answer: "B",
    explanation: [
      { type: 'text', content: "To celebrate the 50th anniversary of the legendary film Sholay on August 15, 2025, India Post released two exclusive picture postcards, a presentation pack, and a golden cancellation. This tribute was unveiled by the Maharashtra Postal Circle in the presence of the Sippy family and other dignitaries. The release highlighted the unique legacy of Sholay, which originally premiered on August 15, 1975, and remains a milestone in Indian cinema. By merging philately with cultural heritage, India Post not only honored a cinematic masterpiece but also reinforced its tradition of commemorating significant national icons, events, and achievements through postal memorabilia." },
      { type: 'date', content: 'Date : 2025-08-16' }
    ]
  },
  {
    question: "In which Indian state is the historically significant village of Topra Kalan, known for its connection to the Ashokan Pillar, located?",
    options: ["Uttar Pradesh", "Punjab", "Rajasthan", "Haryana"],
    answer: "D",
    explanation: [
        { type: 'text', content: 'Topra Kalan is situated in Yamunanagar district, Haryana, approximately 14 km from Yamunanagar city and 90 km from Chandigarh. It is historically notable as the original location of the Delhi-Topra Ashokan Pillar, which was moved to Delhi in the 14th century by Sultan Firoz Shah Tughlaq. Archaeological evidence from the site, including Painted Grey Ware, Black-and-Red Ware, stamped pottery, and structural remains, suggests continuous occupation from the late Vedic period around 1500 BCE through the Mauryan era and into medieval times. Ground Penetrating Radar surveys have revealed a well-planned, multi-layered settlement, reinforcing its significance as a cultural and Buddhist heritage site.' },
        { type: 'date', content: 'Date : 2025-08-10' }
    ]
  },
  {
    question: "In which state is the Saaral Vizha 2025 monsoon cultural festival celebrated?",
    options: ["Kerala", "Karnataka", "Andhra Pradesh", "Tamil Nadu"],
    answer: "D",
    explanation: [
      { type: 'text', content: "Saaral Vizha 2025 is a vibrant monsoon cultural festival celebrated in Courtallam, located in the Tenkasi district of Tamil Nadu. Known for its scenic waterfalls and misty monsoon climate, the region hosts this event annually during July. The festival blends natural beauty with cultural richness, featuring classical and folk performances, exhibitions, and public competitions. It promotes Tamil Nadu's traditional art forms such as Bharatanatyam, Nagaswaram, and silambam, while also serving as a platform for community engagement and cultural revival. The event underscores Tamil Nadu's commitment to preserving its heritage through inclusive governance and public participation." },
      { type: 'date', content: 'Date : 2025-07-21' }
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
export default function ArtAndCulturePage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Art and Culture - Latest Current Affairs</span></p>
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