"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Awards and Honours Current Affairs page ---

const subPageLinks = ["Awards and Honours - Latest Current Affairs"];

const generalQuestions = [
  {
    question: "Who has been reappointed as the non-executive chairman of Yes Bank by RBI for the term September 2025 to May 2027?",
    options: ["Shaktikanta Das", "Uday Kotak", "R Gandhi", "Aditya Puri"],
    answer: "C",
    explanation: [
      { type: 'text', content: "R Gandhi, a former Deputy Governor of the Reserve Bank of India, has been reappointed as the part-time non-executive chairman of Yes Bank for the period from September 20, 2025, to May 13, 2027. With over 37 years of experience in central banking, Gandhi has contributed significantly to regulation, payment systems, and currency management in India. His leadership at Yes Bank is seen as vital in ensuring governance stability and reinforcing investor confidence, especially after the bank's restructuring phase following the 2020 crisis. His regulatory credibility and oversight strengthen the bank's long-term planning and compliance framework." },
      { type: 'date', content: 'Date : 2025-09-07' }
    ]
  },
  {
    question: "Who recently assumed charge as the new Mines Secretary?",
    options: ["Piyush Goyal", "V.L. Kantha Rao", "Ramesh Singh", "Sanjay Verma"],
    answer: "B",
    explanation: [
      { type: 'text', content: "Piyush Goyal, a 1994 batch IAS officer from the Nagaland cadre, has been appointed as the new Mines Secretary. He took charge after V.L. Kantha Rao and brings with him rich administrative experience, having previously served as the CEO of NATGRID. His leadership comes at a pivotal moment when India is emphasizing the development of critical minerals such as lithium, cobalt, nickel, and rare earths. These resources are central to supporting India's clean energy transition, ensuring greater self-reliance in strategic sectors, and helping the country progress toward its ambitious net-zero emission targets." },
      { type: 'date', content: 'Date : 2025-09-06' }
    ]
  },
  {
    question: "Who has recently taken oath as the new Chief Justice of the Bombay High Court?",
    options: ["C P Radhakrishnan", "Justice Shree Chandrashekhar", "Justice V.K. Rao", "Justice S.K. Mehta"],
    answer: "B",
    explanation: [
      { type: 'text', content: "Justice Shree Chandrashekhar has been sworn in as the new Chief Justice of the Bombay High Court. The oath was administered by Maharashtra Governor C P Radhakrishnan at Raj Bhavan in Mumbai. Before this elevation, he had been serving as the Acting Chief Justice of the Bombay High Court and had also held the role of Acting Chief Justice of the Jharkhand High Court. His appointment reflects his significant judicial experience and contributions. As Chief Justice, he is expected to bring stability and guidance to one of India's most prominent High Courts, playing a crucial role in upholding justice and strengthening the legal system." },
      { type: 'date', content: 'Date : 2025-09-06' }
    ]
  },
  {
    question: "Who will be honoured with the Prof. V.K. Gokak Award in Bengaluru on September 7, 2025?",
    options: ["K. S. Nisar Ahmed", "Girish Karnad", "U. R. Ananthamurthy", "Anand V. Patil"],
    answer: "D",
    explanation: [
        { type: 'text', content: 'Anand V. Patil, a celebrated writer known for his outstanding contributions to children\'s literature, will receive the Prof. V.K. Gokak Award in Bengaluru on September 7, 2025. He has previously been honoured with the Kendra Sahitya Akademi\'s Bal Sahitya Award, and his works have played a key role in nurturing creativity and values among young readers. The award, instituted in memory of Prof. Vinayaka Krishna Gokak, a Jnanpith awardee and a towering figure in Kannada literature, honours writers who significantly enrich Indian literary traditions. This recognition underscores Patil\'s role in advancing children\'s literature and preserving linguistic heritage.' },
        { type: 'date', content: 'Date : 2025-09-05' }
    ]
  },
  {
    question: "Who has been appointed as the new Chief Executive Officer (CEO) of the Food Safety and Standards Authority of India (FSSAI) in September 2025?",
    options: ["Sanjay Sudhir", "Harsh Vardhan Shringla", "T. S. Tirumurti", "Rajit Punhani"],
    answer: "D",
    explanation: [
      { type: 'text', content: "Rajit Punhani, a 1991-batch IAS officer of the Bihar cadre, has been appointed as the new CEO of the Food Safety and Standards Authority of India (FSSAI) from September 1, 2025. With over three decades of administrative experience, he has served in diverse roles at the Centre, state governments, and international platforms. His contributions include spearheading pension and insurance schemes for unorganised workers, reforming indirect taxes leading to the GST framework, and launching health initiatives such as the world's largest maternal messaging program. His leadership at FSSAI comes at a crucial time as India focuses on food safety reforms, regulatory modernization, and public health priorities." },
      { type: 'date', content: 'Date : 2025-09-03' }
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
export default function AwardsAndHonoursPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Awards and Honours - Latest Current Affairs</span></p>
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