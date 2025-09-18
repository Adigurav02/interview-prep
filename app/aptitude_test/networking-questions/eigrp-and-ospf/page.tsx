"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the EIGRP and OSPF page ---

const subPageLinks = [
    "EIGRP and OSPF - Section 1",
    "EIGRP and OSPF - Section 2",
];

const generalQuestions = [
  {
    question: "With which network type will OSPF establish router adjacencies but not perform the DR/BDR election process?",
    options: ["Point-to-point", "Backbone area 0", "Broadcast multi-access", "Non-broadcast multi-access"],
    answer: "A",
    explanation: [
      { type: 'highlighted-text', content: "No DR is assigned on any type of point-to-point link. No DR/BDR is assigned on the NBMA point-to-multipoint due to the hub/spoke topology. DR and BDR are elected on broadcast and non-broadcast multi-access networks. Frame Relay is a non-broadcast multi-access (NBMA) network by default." }
    ]
  },
  {
    question: "Which of the following describe the process identifier that is used to run OSPF on a router?\n1. It is locally significant.\n2. It is globally significant.\n3. It is used to identify a unique instance of an OSPF database.\n4. It is an optional parameter required only if multiple OSPF processes are running on the router.",
    options: ["1, 2 and 4", "1 and 3", "3 and 5", "All of the above"],
    answer: "B",
    explanation: [
      { type: 'text', content: "The Process ID for OSPF on a router is only locally significant and you can use the same number on each router, or each router can have a different number-it just doesn't matter. The numbers you can use are from 1 to 65,535. Don't get this confused with area numbers, which can be from 0 to 4.2 billion." }
    ]
  },
  {
    question: "A network administrator needs to configure a router with a distance-vector protocol that allows classless routing. Which of the following satisfies those requirements?",
    options: ["IGRP", "OSPF", "RIPV1", "EIGRP", "IS-IS"],
    answer: "D",
    explanation: [
      { type: 'highlighted-text', content: "In this question, we're calling EIGRP just plain old distance vector. EIGRP is an \"advanced\" distance-vector routing protocol, sometimes called a hybrid routing protocol because it uses the characteristics of both distance-vector and link-state routing protocols." }
    ]
  },
  {
    question: "What is the administrative distance of OSPF?",
    options: ["90", "100", "110", "120"],
    answer: "C",
    explanation: [
        { type: 'text', content: "The administrative distance (AD) is a very important parameter in a routing protocol. The lower the AD, the more trusted the route. If you have IGRP and OSPF running, by default IGRP routes would be placed in the routing table because IGRP has a lower AD of 100. OSPF has an AD of 110. RIPv1 and RIPv2 both have an AD of 120, and EIGRP is the lowest, at 90."}
    ]
  },
  {
    question: "Your company is running IGRP using an AS of 10. You want to configure EIGRP on the network but want to migrate slowly to EIGRP and don't want to configure redistribution. What command would allow you to migrate over time to EIGRP without configuring redistribution?",
    options: ["router eigrp 11", "router eigrp 10", "router eigrp 10 redistribute igrp", "router igrp combine eigrp 10"],
    answer: "B",
    explanation: [
        { type: 'highlighted-text', content: "If you enable EIGRP on a router with the same autonomous system (AS) number, EIGRP will automatically redistribute IGRP into EIGRP. You will see the IGRP injected routes as external (EX) routes with an EIGRP AD of 170. This is a nice feature that lets you migrate slowly to EIGRP with no extra configuration." }
    ]
  }
];

const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { 
    const renderHighlightedText = (text: string) => {
        const keywords = ['NBMA', 'EIGRP', 'IGRP', 'OSPF', 'RIPv1', 'RIPv2'];
        const regex = new RegExp(`(\\b${keywords.join('\\b|\\b')}\\b)`, 'g');
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
export default function EigrpAndOspfPage() {
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
  
  // ================================================================= //
  // /// *** THIS IS THE CORRECTED LINE *** ///
  // Changed `perPage` to the correctly defined `questionsPerPage`
  // ================================================================= //
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = generalQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(generalQuestions.length / questionsPerPage);

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="border border-gray-200 rounded-lg p-6">
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">EIGRP and OSPF</span></p>
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
                        <p className="mb-4 text-gray-900 font-medium whitespace-pre-wrap">{questionIndex + 1}. {q.question}</p>
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