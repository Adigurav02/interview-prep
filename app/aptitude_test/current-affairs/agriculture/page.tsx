"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Agriculture Current Affairs page ---

const subPageLinks = ["Agriculture - Latest Current Affairs"];

const generalQuestions = [
  {
    question: "By which year does Niti Aayog aim to double India's pulses production to 51.57 million tonnes?",
    options: ["2047", "2035", "2050", "2030"],
    answer: "A",
    explanation: [
      { type: 'text', content: "Niti Aayog has set a long-term vision to double India's pulses production by 2047, raising output to 51.57 million tonnes. This plan is designed to secure the country's nutritional and food requirements while ensuring surplus production in the decades ahead. The strategy involves achieving self-sufficiency in pulses by 2030 and then scaling up production further through technological innovations, climate-smart agriculture, and region-specific cultivation models. By focusing on seed quality, advanced farming tools, and resilience against climate stress, the roadmap highlights a holistic approach to strengthening India's agricultural sector and empowering farmers for sustainable growth." },
      { type: 'date', content: 'Date : 2025-09-07' }
    ]
  },
  {
    question: "Which Indian state became the leading producer of processed potatoes in 2024-25?",
    options: ["Punjab", "Gujarat", "Uttar Pradesh", "Haryana"],
    answer: "B",
    explanation: [
      { type: 'text', content: "Gujarat emerged as the top producer of processed potatoes in India during 2024-25, a significant milestone in the agricultural sector. This achievement is largely attributed to the state's modern farming techniques, effective government support, and strong infrastructure, including advanced cold storage facilities. Districts like Banaskantha, Sabarkantha, and Aravalli have shown exceptional performance, particularly Banaskantha, which recorded 18.70 lakh tonnes of output. The potatoes grown—such as Lady Rosetta and Kufri Chipsona—are ideal for making French fries and chips, aligning with global standards. Gujarat's success is also boosting exports and reducing India's dependency on potato imports." },
      { type: 'date', content: 'Date : 2025-07-15' }
    ]
  },
  {
    question: "Which Indian state has recorded a 20% increase in cotton cultivation in 2025 as part of a crop diversification strategy?",
    options: ["Gujarat", "Maharashtra", "Haryana", "Punjab"],
    answer: "D",
    explanation: [
      { type: 'text', content: "Punjab has experienced a significant 20% rise in cotton cultivation in 2025, expanding from 2.49 lakh acres to 2.98 lakh acres—an increase of over 49,000 acres. This growth is part of the state's broader effort to diversify crops and reduce reliance on paddy. Districts such as Fazilka, Mansa, Bathinda, and Sri Muktsar Sahib have led the increase, supported by government measures like a 33% subsidy on cotton seeds and mandatory digital registration for farmers. The initiative aims to promote sustainable agricultural practices and improve the state's ecological balance by reducing water-intensive crops." },
      { type: 'date', content: 'Date : 2025-06-11' }
    ]
  },
  {
    question: "How many Kharif crops received an MSP hike for the 2025-26 season as per the latest Cabinet approval?",
    options: ["10", "12", "14", "16"],
    answer: "C",
    explanation: [
        { type: 'text', content: 'The Cabinet Committee on Economic Affairs, chaired by Prime Minister Narendra Modi, approved a hike in the Minimum Support Price (MSP) for 14 Kharif crops for the 2025-26 marketing season. This policy decision aims to ensure fair and remunerative prices for farmers and is part of the broader strategy to double farmers\' income. The MSP revision includes significant increases for crops like nigerseed, ragi, cotton, and sesamum. This comprehensive coverage of 14 crops reflects the government\'s continued commitment to agricultural sustainability, profitability, and nutrition security, particularly through support for climate-resilient and nutri-cereal varieties.' },
        { type: 'date', content: 'Date : 2025-05-29' }
    ]
  },
  {
    question: "For which crop has Dhanuka Agritech launched the herbicide DINKAR?",
    options: ["Wheat", "Maize", "Paddy", "Sugarcane"],
    answer: "C",
    explanation: [
      { type: 'text', content: "Dhanuka Agritech Limited has launched a specialized herbicide named DINKAR, designed specifically for use in transplanted paddy cultivation. This product aims to enhance weed management and overall productivity in paddy fields. The launch event was notable for the presence of Japanese dignitaries from Hokko Chemical Industry Co., Ltd., highlighting international collaboration in agricultural technology. By targeting paddy, one of India's most widely cultivated and water-intensive crops, DINKAR is expected to significantly aid farmers in improving yield and reducing labor-intensive manual weeding. This innovation reflects ongoing advancements in agri-tech tailored to the specific needs of Indian agriculture." },
      { type: 'date', content: 'Date : 2025-05-20' }
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
export default function AgriculturePage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Agriculture - Latest Current Affairs</span></p>
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