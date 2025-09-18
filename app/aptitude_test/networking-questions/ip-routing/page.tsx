"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the IP Routing page ---

const subPageLinks = [
    "IP Routing - Section 1",
    "IP Routing - Section 2",
];

const generalQuestions = [
  {
    question: "Which of the following statements are true regarding the command ip route 172.16.4.0 255.255.255.0 192.168.4.2 ?\n1. The command is used to establish a static route.\n2. The default administrative distance is used.\n3. The command is used to configure the default route.\n4. The subnet mask for the source address is 255.255.255.0.",
    options: ["1 and 2", "2 and 4", "3 and 4", "All of the above"],
    answer: "A",
    explanation: [
      { type: 'text', content: "Although answer D almost seems right, it is not; the mask is the mask used on the remote network, not the source network. Since there is no number at the end of the static route, it is using the default administrative distance of 1." }
    ]
  },
  {
    question: "Which command displays RIP routing updates?",
    options: ["show ip route", "debug ip rip", "show protocols", "debug ip route"],
    answer: "B",
    explanation: [
      { type: 'highlighted-text', content: "The debug ip rip command is used to show the Internet Protocol (IP) Routing Information Protocol (RIP) updates being sent and received on the router." }
    ]
  },
  {
    question: "Which statement is true regarding classless routing protocols?\n1. The use of discontiguous networks is not allowed.\n2. The use of variable length subnet masks is permitted.\n3. RIPV1 is a classless routing protocol.\n4. IGRP supports classless routing within the same autonomous system.\n5. RIPV2 supports classless routing.",
    options: ["1, 3 and 5", "3 and 4", "2 and 5", "None of the above"],
    answer: "C",
    explanation: [
      { type: 'text', content: "Classful routing means that all hosts in the internetwork use the same mask. Classless routing means that you can use Variable Length Subnet Masks (VLSMs) and can also support discontiguous networking." }
    ]
  },
  {
    question: "You have the following routing table. Which of the following networks will not be placed in the neighbor routing table?\n\nR    192.168.30.0/24 [120/1] via 192.168.40.1, 00:00:12, Serial0\nC    192.168.40.0/24 is directly connected, Serial0\n     172.16.0.0/14 is subnetted, 1 subnets\nC    172.16.30.0 is directly connected, Loopback0\nR    192.168.20.0/24 [120/1] via 192.168.40.1, 00:00:12, Serial0\nR    10.0.0.0/8 [120/15] via 192.168.40.1, 00:00:07, Serial0\nC    192.168.50.0/24 is directly connected, Ethernet0",
    options: ["172.16.30.0", "192.168.30.0", "10.0.0.0", "All of them will be placed in the neighbor routing table."],
    answer: "C",
    explanation: [
        { type: 'text', content: "The network 10.0.0.0 cannot be placed in the next router's routing table because it already is at 15 hops. One more hop would make the route 16 hops, and that is not valid in RIP networking."}
    ]
  },
  {
    question: "What is split horizon?",
    options: [
        "Information about a route should not be sent back in the direction from which the original update came.",
        "It splits the traffic when you have a large bus (horizon) physical network.",
        "It holds the regular updates from broadcasting to a downed link.",
        "It prevents regular update messages from reinstating a route that has gone down."
    ],
    answer: "A",
    explanation: [
        { type: 'text', content: "A split horizon will not advertise a route back to the same router it learned the route from." }
    ]
  }
];

const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { 
    const renderHighlightedText = (text: string) => {
        const keywords = ['debug ip rip'];
        const regex = new RegExp(`(${keywords.join('|')})`, 'g');
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
                        if (item.type === 'discuss') {
                            return (
                                <p key={index} className="leading-relaxed" style={{ color: '#111827' }}>
                                    {item.content} <Link href="#" className="text-blue-600 hover:underline">Let's discuss.</Link>
                                </p>
                            );
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
export default function IpRoutingPage() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">IP Routing</span></p>
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