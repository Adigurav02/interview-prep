"use client";

import { useState } from 'react';
import Image from 'next/image';
import { CheckSquare, Square } from 'lucide-react';

// --- DATA: This data is specific to the Number Puzzles page ---

const subPageLinks = ["Number puzzles"];

const puzzles = [
  {
    id: 1,
    title: "What number comes inside the circle?",
    // CORRECTED: Updated to use your local image path
    imageUrl: "/num1.png",
    answer: 6,
    explanation: "Looking at the diagram in rows, the central circle equals half the sum of the numbers in the other circles to the left and right of the centre."
  },
  {
    id: 2,
    title: "Which number replaces the question mark?",
    // CORRECTED: Updated to use your local image path
    imageUrl: "/num2.png",
    answer: 9,
    explanation: "The number at the centre of each triangle equals the sum of the lower two numbers minus the top number."
  },
  {
    id: 3,
    title: "Which number completes the puzzle?",
    // CORRECTED: Updated to use your local image path
    imageUrl: "/num3.png",
    answer: 19,
    explanation: "As you move diagonally down, numbers follow the sequence of Prime Numbers."
  }
];

// --- MAIN PAGE COMPONENT ---
export default function NumberPuzzlesPage() {
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
                    <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Number puzzles</span></p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <aside className="md:col-span-1">
                            <nav className="space-y-1">
                                {subPageLinks.map(linkText => (
                                    <button key={linkText} className={`w-full flex items-center gap-3 p-2 rounded-md text-left text-sm font-medium transition-colors ${linkText === 'Number puzzles' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                                        {linkText === 'Number puzzles' ? <CheckSquare size={16} /> : <Square size={16} />}
                                        {linkText}
                                    </button>
                                ))}
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="md:col-span-3">
                            <div className="space-y-8">
                                {puzzles.map((puzzle) => {
                                    const isAnswerVisible = visibleAnswers.includes(puzzle.id);
                                    return (
                                        <div key={puzzle.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                                            <p className="font-semibold text-gray-800 mb-4">{puzzle.id}.</p>
                                            
                                            <div className="text-center">
                                                <p className="text-gray-700 mb-4">{puzzle.title}</p>
                                                <div className="relative inline-block">
                                                    <Image 
                                                        src={puzzle.imageUrl} 
                                                        alt={puzzle.title} 
                                                        width={300} 
                                                        height={200}
                                                        className="w-auto h-auto max-w-full"
                                                    />
                                                </div>
                                            </div>

                                            <div 
                                                className={`mt-6 transition-opacity duration-500 ${isAnswerVisible ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <span className="font-semibold text-green-600">Answer:</span>
                                                    <span className="font-bold text-gray-800">{puzzle.answer}</span>
                                                </div>
                                                <div className="flex items-start gap-4 mt-2">
                                                    <span className="font-semibold text-green-600">Explanation:</span>
                                                    <p className="text-gray-800">{puzzle.explanation}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="text-right mt-4">
                                                <button 
                                                    onClick={() => toggleAnswer(puzzle.id)} 
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    {isAnswerVisible ? 'Hide Answer & Explanation' : 'Show Answer & Explanation'}
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