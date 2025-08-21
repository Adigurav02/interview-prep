"use client";

import { Pencil, Lightbulb, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";

const promptCards = [
    { title: "Master Your Interviews", question: "What common questions can I expect in a financial analyst interview at Boeing?" },
    { title: "Upgrade Your Resume", question: "What should I highlight if I'm switching industries?" },
    { title: "Get Your Dream Offer", question: "How do I negotiate a higher offer when switching companies?" },
    { title: "Make Your Next Move", question: "How can I smoothly transition into a product manager role?" }
];

const popularQuestions = [
    "What are top tech companies asking SWEs right now?",
    "How do I explain a career switch confidently?",
    "What should my resume highlight for product roles?"
];

export default function CareerGuidePage() {
    return (
        <div className="bg-white min-h-screen w-full flex text-gray-800">
            {/* Sidebar */}
            <aside className="w-1/4 bg-[#2C313D] text-white p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Interview GPT</h2>
                    <button className="text-gray-400 hover:text-white">
                        <Pencil size={18} />
                    </button>
                </div>
                <div className="flex-grow text-center text-gray-400 text-sm pt-16">
                    <p>Your conversations will appear here once you start chatting!</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="w-3/4 flex flex-col">
                <div className="flex-grow p-6 md:p-10 max-w-4xl mx-auto w-full flex flex-col">
                    
                    {/* Welcome Section */}
                    <div className="text-center pt-12">
                        <div className="inline-block p-2 bg-gradient-to-br from-green-300 to-emerald-500 rounded-full shadow-lg mb-4">
                             <div className="w-12 h-12 bg-white/50 rounded-full backdrop-blur-sm"></div>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900">Welcome to Interview GPT</h1>
                        <p className="text-gray-600 mt-2">
                            You can ask me anything related to job interviews, resume building, career growth, and more!
                        </p>
                    </div>

                    {/* Prompt Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
                        {promptCards.map(card => (
                            <button key={card.title} className="bg-white border border-gray-200 rounded-lg p-4 text-left hover:shadow-lg hover:border-gray-300 transition-all">
                                <h3 className="font-semibold text-gray-800">{card.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{card.question}</p>
                            </button>
                        ))}
                    </div>

                    {/* Popular Questions */}
                    <div className="bg-yellow-50/70 border border-yellow-200 rounded-lg p-6 mt-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Lightbulb size={20} className="text-yellow-600" />
                            <h3 className="font-semibold text-gray-800">Popular Questions to Get You Started:</h3>
                        </div>
                        <div className="space-y-3">
                            {popularQuestions.map(q => (
                                <button key={q} className="text-sm text-gray-700 hover:text-black">
                                    → {q}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex-grow" /> 
                </div>

                {/* Chat Input at the bottom */}
                <div className="p-6 md:p-10 pt-4 max-w-4xl mx-auto w-full">
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                             <Pencil size={18} className="text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Ask anything about your interview prep or career move or select a topic to explore pre-designed recommendations!"
                            className="w-full pl-12 pr-16 py-4 bg-white border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}