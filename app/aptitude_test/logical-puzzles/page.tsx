"use client";

import { useState } from 'react';
import Image from 'next/image';
import { CheckSquare, Square } from 'lucide-react';

// --- DATA: This data is specific to the Logical Puzzles page ---

const subPageLinks = ["Logical puzzles"];

const puzzles = [
  {
    id: 1,
    title: "What is missing in the last grid?",
    imageUrl: "/images/img1.png",
    // CORRECTED: Updated answer and explanation
    answer: "D",
    explanation: "The number of black dots in each grid increases by 1 each time, starting with the top left grid and working to the right, top row then bottom row."
  },
  {
    id: 2,
    title: "Which letter replaces the question mark?",
    imageUrl: "/images/img2.png",
    // CORRECTED: Updated answer and explanation
    answer: "Q",
    explanation: "Adding the three numbers in each square together gives the numerical value of the letter at the centre of each square."
  },
  {
    id: 3,
    title: "Which tool will make the last scale balance?",
    imageUrl: "/images/img3.png",
    // CORRECTED: Updated answer and explanation
    answer: "Hammer",
    explanation: "The Hammer = 1, the File = 3 and the Axe = 5"
  }
];

// --- MAIN PAGE COMPONENT ---
export default function LogicalPuzzlesPage() {
    const [visibleAnswers, setVisibleAnswers] = useState<number[]>([]);

    const toggleAnswer = (id: number) => {
        setVisibleAnswers(prev => 
            prev.includes(id) ? prev.filter(puzzleId => puzzleId !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-white min-h-screen">
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="border border-gray-200 rounded-lg p-6">
                    <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Logical puzzles</span></p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <aside className="md:col-span-1">
                            <nav className="space-y-1">
                                {subPageLinks.map(linkText => (
                                    <button key={linkText} className={`w-full flex items-center gap-3 p-2 rounded-md text-left text-sm font-medium transition-colors ${linkText === 'Logical puzzles' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                                        {linkText === 'Logical puzzles' ? <CheckSquare size={16} /> : <Square size={16} />}
                                        {linkText}
                                    </button>
                                ))}
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="md:col-span-3">
                            <div className="space-y-12">
                                {puzzles.map((puzzle) => {
                                    const isAnswerVisible = visibleAnswers.includes(puzzle.id);
                                    return (
                                        <div key={puzzle.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                                            <p className="font-semibold text-gray-800 mb-4">{puzzle.id}.</p>
                                            
                                            <div className="text-center">
                                                <p className="text-gray-700 mb-4">{puzzle.title}</p>
                                                <div className="relative inline-block my-4">
                                                    <Image 
                                                        src={puzzle.imageUrl} 
                                                        alt={puzzle.title} 
                                                        width={400} 
                                                        height={250}
                                                        className="w-auto h-auto max-w-full"
                                                    />
                                                </div>
                                            </div>

                                            {/* Answer and Explanation Section */}
                                            <div className={`mt-6 transition-all duration-300 ease-in-out overflow-hidden ${isAnswerVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="flex items-start gap-4">
                                                    <span className="font-semibold text-green-600 min-w-[100px]">Answer</span>
                                                    <span>:</span>
                                                    <span className="font-bold text-gray-800">{puzzle.answer}</span>
                                                </div>
                                                <div className="flex items-start gap-4 mt-2">
                                                    <span className="font-semibold text-green-600 min-w-[100px]">Explanation</span>
                                                    <span>:</span>
                                                    <p className="text-gray-800">{puzzle.explanation}</p>
                                                </div>
                                            </div>
                                            
                                            {/* Toggle Button */}
                                            <div className="text-center mt-4">
                                                <button 
                                                    onClick={() => toggleAnswer(puzzle.id)} 
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    {isAnswerVisible ? 'Hide Answer & Explanation' : 'View Answer & Explanation'}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}