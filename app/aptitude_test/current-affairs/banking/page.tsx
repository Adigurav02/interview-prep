"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the Banking Current Affairs page ---

const subPageLinks = ["Banking - Latest Current Affairs"];

const generalQuestions = [
  {
    question: "Which bank signed an MoU with DPIIT to support startups under the Startup India initiative?",
    options: ["ICICI Bank", "HDFC Bank", "Axis Bank", "State Bank of India"],
    answer: "A",
    explanation: [
      { type: 'text', content: "ICICI Bank has partnered with the Department for Promotion of Industry and Internal Trade (DPIIT) to support DPIIT-recognised startups under the Startup India initiative. The MoU, signed on September 4, 2025, introduces a Startup Engagement Programme that will provide accelerator access, structured mentorship, pilot opportunities, and ecosystem networking for startups. ICICI Bank's Mumbai-based accelerator will serve as a hub for product-based startups, offering workspaces and opportunities to connect with industry leaders, investors, and clients. This collaboration not only empowers early- and growth-stage startups but also helps them test their solutions in real-world environments, enhancing innovation and scalability." },
      { type: 'date', content: 'Date : 2025-09-05' }
    ]
  },
  {
    question: "Which Indian IT company has partnered with Mastercard to integrate Mastercard Move into its Finacle platform for faster cross-border payments?",
    options: ["Infosys", "Wipro", "HCLTech", "Tech Mahindra"],
    answer: "A",
    explanation: [
      { type: 'text', content: "Infosys has partnered with Mastercard to strengthen global cross-border payment solutions by integrating Mastercard Move into its Finacle banking platform. Mastercard Move is a portfolio of advanced money transfer capabilities that supports real-time, secure, and scalable transactions across more than 200 countries and 150 currencies. By embedding this system within Infosys Finacle, financial institutions can reduce integration complexities, improve payment speed and reliability, and enhance risk management. This collaboration highlights the growing role of digital payments in banking, while also supporting the increasing global demand for remittances, particularly in Asia, where India is a leading beneficiary of cross-border money flows." },
      { type: 'date', content: 'Date : 2025-08-30' }
    ]
  },
  {
    question: "In which city did Punjab National Bank inaugurate its first startup focused branch?",
    options: ["Mumbai", "Bengaluru", "Hyderabad", "New Delhi"],
    answer: "D",
    explanation: [
      { type: 'text', content: "Punjab National Bank (PNB) inaugurated its first startup focused branch in New Delhi to encourage entrepreneurship and innovation. The branch has been set up under the framework of the Startup India initiative, which promotes the growth of startups across the country. This specialised branch aims to offer comprehensive financial solutions, tailored banking facilities, and advisory services for entrepreneurs. By situating it in the national capital, PNB intends to provide easier access to resources, credit, and financial support, strengthening the startup ecosystem and contributing to the growth of emerging businesses in India." },
      { type: 'date', content: 'Date : 2025-08-28' }
    ]
  },
  {
    question: "Which bank became the first public sector bank in India to migrate its corporate website to the secure '.bank.in' domain?",
    options: ["Bank of Baroda", "Punjab National Bank", "Canara Bank", "Indian Bank"],
    answer: "B",
    explanation: [
        { type: 'text', content: "Punjab National Bank (PNB) has become the first public sector bank in India to migrate its corporate website to the highly secure '.bank.in' domain, complying with the RBI's directive on enhancing cybersecurity in the banking sector. This transition was supported by the Institute for Development and Research in Banking Technology (IDRBT), ensuring stronger digital security and trust in online banking services. The initiative highlights PNB's commitment to safeguarding customer data and adapting to modern technological advancements. With its roots established by Dyal Singh Majithia and Lala Lajpat Rai, PNB continues to uphold its legacy under the leadership of MD & CEO Ashok Chandra." },
        { type: 'date', content: 'Date : 2025-08-24' }
    ]
  },
  {
    question: "Which bank has inaugurated a Centre of Excellence for MSMEs in Gurugram?",
    options: ["Punjab National Bank", "State Bank of India", "Bank of Baroda", "HDFC Bank"],
    answer: "B",
    explanation: [
      { type: 'text', content: "The State Bank of India (SBI) has launched a Centre of Excellence for MSMEs at its State Bank Academy in Gurugram. This initiative is aimed at strengthening the MSME ecosystem by focusing on skill development, innovation, and knowledge sharing. It will provide significant support to MSME promoters, startups, and other stakeholders in the sector. Moreover, the Centre of Excellence is expected to foster collaboration between academia, industry, government institutions, and banking professionals. By doing so, SBI is contributing to the growth and sustainability of the MSME sector, which is a vital component of India's economic development and employment generation." },
      { type: 'date', content: 'Date : 2025-08-23' }
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
export default function BankingPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Banking - Latest Current Affairs</span></p>
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