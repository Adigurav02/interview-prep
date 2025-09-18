"use client";

import { useState } from 'react';
import Link from "next/link";
import { CheckSquare, Square, BookOpen, Check, X } from 'lucide-react';

// --- DATA: This data is specific to the IPv6 page ---

const subPageLinks = [
    "IPv6 - Section 1",
    "IPv6 - Section 2",
];

const generalQuestions = [
  {
    question: "Which of the following is true when describing a multicast address?",
    options: [
        "Packets addressed to a unicast address are delivered to a single interface.", 
        "Packets are delivered to all interfaces identified by the address. This is also called a one-to-many address.", 
        "Identifies multiple interfaces and is only delivered to one address. This address can also be called one-to-one-of-many.", 
        "These addresses are meant for nonrouting purposes, but they are almost globally unique so it is unlikely they will have an address overlap."
    ],
    answer: "B",
    explanation: [
      { type: 'highlighted-text', content: "Packets addressed to a multicast address are delivered to all interfaces identified by the multicast address, the same as in IPv4. It is also called a one-to-many address. You can always tell a multicast address in IPv6 because multicast addresses always start with FF." }
    ]
  },
  {
    question: "Which of the following is true when describing a unicast address?",
    options: [
        "Packets addressed to a unicast address are delivered to a single interface.", 
        "These are your typical publicly routable addresses, just like a regular publicly routable address in IPv4.", 
        "These are like private addresses in IPv4 in that they are not meant to be routed.", 
        "These addresses are meant for nonrouting purposes, but they are almost globally unique so it is unlikely they will have an address overlap."
    ],
    answer: "A",
    explanation: [
      { type: 'text', content: "Packets addressed to a unicast address are delivered to a single interface. For load balancing, multiple interfaces can use the same address." }
    ]
  },
  {
    question: "To enable OSPFv3, which of the following would you use?",
    options: [
        "Router(config-if)# ipv6 ospf 10 area 0.0.0.0",
        "Router(config)# ipv6 router rip 1",
        "Router(config)# ipv6 router eigrp 10",
        "Router(config-rtr)# no shutdown",
        "Router(config-if)# ipv6 eigrp 10"
    ],
    answer: "A",
    explanation: [
      { type: 'highlighted-text', content: "To enable OSPFv3, you enable the protocol as with RIPng. The command string is ipv6 ospf <process-id> area <area-id>." }
    ]
  },
  {
    question: "What multicast addresses does RIPng use?",
    options: ["FF02::A", "FF02::9", "FF02::5", "FF02::6"],
    answer: "B",
    explanation: [
        { type: 'highlighted-text', content: "RIPng uses the multicast IPv6 address of FF02::9. If you remember the multicast addresses for IPv4, the numbers at the end of each IPv6 address are the same."}
    ]
  },
  {
    question: "Which statement(s) about IPv6 addresses are true?\n1. Leading zeros are required.\n2. Two colons (::) are used to represent successive hexadecimal fields of zeros.\n3. Two colons (::) are used to separate fields.\n4. A single interface will have multiple IPv6 addresses of different types.",
    options: ["1 and 3", "2 and 4", "1, 3 and 4", "All of the above"],
    answer: "B",
    explanation: [
        { type: 'text', content: "In order to shorten the written length of an IPv6 address, successive fields of zeros may be replaced by double colons. In trying to shorten the address further, leading zeros may also be removed. Just as with IPv4, a single device's interface can have more than one address; with IPv6 there are more types of addresses and the same rule applies. There can be link-local, global unicast, and multicast addresses all assigned to the same interface." }
    ]
  }
];

const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- Reusable Components ---
const Explanation = ({ answer, explanation }: { answer: string, explanation: any[] }) => { 
    const renderHighlightedText = (text: string) => {
        const keywords = ['FF', 'ipv6 ospf <process-id> area <area-id>', 'FF02::9'];
        const regex = new RegExp(`(${keywords.join('|').replace(/</g, '&lt;').replace(/>/g, '&gt;')})`, 'g');
        const parts = text.split(regex);
        return parts.map((part, i) => 
            keywords.includes(part.replace(/&lt;/g, '<').replace(/&gt;/g, '>')) 
            ? <code key={i} className="font-semibold text-red-600 bg-red-50 px-1 rounded">{part}</code> 
            : part
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
export default function Ipv6Page() {
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
          <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">IPv6</span></p>
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