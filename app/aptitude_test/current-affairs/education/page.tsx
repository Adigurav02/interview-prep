"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Education Current Affairs page ---

const subPageLinks = ["Education - Latest Current Affairs"];

const generalQuestions = [
  {
    question: "Which institution secured the top position in the NIRF Rankings 2025 for the seventh consecutive year?",
    options: ["IIT Delhi", "IISC Bengaluru", "IIT Madras", "IIT Mumbai"],
    answer: "C",
    explanation: [
      { type: 'text', content: "IIT Madras has once again topped the National Institutional Ranking Framework (NIRF) 2025, maintaining its position as India's leading educational institution for the seventh consecutive year. Released by the Ministry of Education, the 10th edition of NIRF Rankings-assessed institutions across 17 categories, including engineering, law, medicine, management, agriculture, and sustainable development. IIT Madras stood out not only in the overall category but also in engineering, innovation, and sustainable development, showcasing its consistent excellence in teaching, research, and innovation. This recognition strengthens its global reputation and aligns with India's vision of 'Viksit Bharat 2047' by promoting world class education and research." },
      { type: 'date', content: 'Date : 2025-09-04' }
    ]
  },
  {
    question: "Which new Indian Institute of Management (IIM) is set to be established with a ₹550 crore grant under the IIM Amendment Bill 2025?",
    options: ["IIM Patna", "IIM Ranchi", "IIM Guwahati", "IIM Nagpur"],
    answer: "C",
    explanation: [
      { type: 'text', content: "The Lok Sabha has passed the Indian Institutes of Management (Amendment) Bill, 2025, approving the establishment of IIM Guwahati in Assam with a central financial grant of ₹550 crore. This move is significant as it brings premier management education to the Northeast, addressing a long-standing regional demand. Guwahati, already a key educational and economic hub, will now host one of India's most prestigious institutions, thereby fostering inclusive growth, attracting talent, and boosting local development. IIM Guwahati is expected to strengthen higher education infrastructure, encourage entrepreneurship, create jobs, and integrate the Northeast more effectively into India's academic and economic framework." },
      { type: 'date', content: 'Date : 2025-08-20' }
    ]
  },
  {
    question: "What is the primary objective of the ₹4,200 crore MERITE scheme approved by the Union Cabinet?",
    options: ["To Promote Rural Employment", "To Boost Technical Education and Research", "To Strengthen Healthcare Infrastructure", "To Expand Renewable Energy Capacity"],
    answer: "B",
    explanation: [
      { type: 'text', content: "The Multidisciplinary Education and Research Improvement in Technical Education (MERITE) scheme, with an outlay of ₹4,200 crore, has been introduced to enhance the quality, equity, and governance of technical education in India. Covering 275 institutions—175 engineering colleges and 100 polytechnics—the scheme will be implemented from 2025 to 2030 with support from the World Bank. Its focus is on boosting research, innovation, and employability skills through the establishment of research hubs, industry-academia collaborations, and modernised curricula. Additionally, MERITE aims to strengthen governance, promote multidisciplinary learning, and prepare institutions for digital transformation, benefiting over 7.5 lakh students nationwide." },
      { type: 'date', content: 'Date : 2025-08-13' }
    ]
  },
  {
    question: "Which institution launched 'Gyanodaya' -- a Centre for Pedagogical Innovation and Publishing?",
    options: ["IIM Kozhikode", "IIM Ahmedabad", "IIM Bangalore", "IIM Calcutta"],
    answer: "A",
    explanation: [
        { type: 'text', content: "IIM Kozhikode has launched 'Gyanodaya', a Centre for Pedagogical Innovation and Publishing, as part of its Vision 2047. This initiative is aligned with the National Education Policy (NEP) and aims to transform the landscape of management education. Gyanodaya focuses on blending Indian knowledge systems with contemporary teaching methodologies, emphasising inclusivity, innovation, and global relevance. Key components include the development of peer-reviewed academic materials, the introduction of novel pedagogical models, and the publication of original case studies and research. Operated through IIMK's in-house manuscript platform Pandulipi, Gyanodaya is positioned as a global hub for educational research and knowledge dissemination." },
        { type: 'date', content: 'Date : 2025-07-17' }
    ]
  },
  {
    question: "Which Indian city was ranked the world's most affordable student city in the QS Best Student Cities Rankings 2026?",
    options: ["Mumbai", "Bengaluru", "New Delhi", "Chennai"],
    answer: "C",
    explanation: [
      { type: 'text', content: "In the QS Best Student Cities Rankings 2026, New Delhi was recognised as the world's most affordable student city, earning a top score of 96.5 on the affordability index. This achievement reflects the city's low cost of education and living, combined with its academic strengths through institutions like IIT Delhi and the University of Delhi. Delhi also performed well in employer activity, ranking within the global top 50 for graduate employability. Alongside Delhi, other Indian cities like Mumbai, Bengaluru, and Chennai also climbed in rankings, highlighting India's growing presence as a global education hub under initiatives like NEP 2020 and Study in India." },
      { type: 'date', content: 'Date : 2025-07-16' }
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
export default function EducationPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Education - Latest Current Affairs</span></p>
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