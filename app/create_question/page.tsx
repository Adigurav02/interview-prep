"use client";

import { useState } from 'react';
import { X, Plus, Terminal } from 'lucide-react';
import { Button } from "@/components/ui/button";

const MAX_CHAR_LIMIT = 200;

// ====================================
// ===== CREATE QUESTION MODAL COMPONENT =====
// ====================================
const CreateQuestionModal = ({ onClose, onQuestionCreate }: { onClose: () => void, onQuestionCreate: (questionText: string) => void }) => {
  const [questionText, setQuestionText] = useState('');
  const isButtonDisabled = questionText.trim().length === 0;

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length <= MAX_CHAR_LIMIT) {
      setQuestionText(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isButtonDisabled) {
      onQuestionCreate(questionText);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-500/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative text-gray-800">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-2">Create Question</h2>
        <p className="text-gray-600 mb-8">
          Don't see a question on our site? Enter in your own interview question you want to practice, and start practicing it today.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="interview-question" className="block text-sm font-semibold text-gray-800 mb-2">
              Your interview question <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                id="interview-question"
                value={questionText}
                onChange={handleTextChange}
                placeholder="Enter your question here."
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow"
              />
              <p className="absolute bottom-2 right-3 text-sm text-gray-400">
                {questionText.length}/{MAX_CHAR_LIMIT}
              </p>
            </div>
          </div>
          <Button 
            type="submit"
            disabled={isButtonDisabled}
            className="w-full bg-green-400 text-green-900 font-bold py-3 text-base hover:bg-green-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Create question
          </Button>
        </form>
      </div>
    </div>
  );
};


// ====================================
// ===== MAIN PAGE COMPONENT =====
// ====================================
export default function PracticeCustomQuestionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdQuestions, setCreatedQuestions] = useState<{ text: string, tags: string[], status: string }[]>([]);

  const handleCreateQuestion = (questionText: string) => {
    const newQuestion = {
      text: questionText,
      tags: ["Custom"], // Default tag for user-created questions
      status: "Not Practiced",
    };
    setCreatedQuestions(prev => [...prev, newQuestion]);
    setIsModalOpen(false); // Close modal after creation
  };

  return (
    <>
      {isModalOpen && <CreateQuestionModal onClose={() => setIsModalOpen(false)} onQuestionCreate={handleCreateQuestion} />}
      <div className="bg-white min-h-screen w-full text-gray-800">
        <main className="max-w-7xl mx-auto p-6 md:p-10">
          
          {/* Page Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Practice any interview question</h1>
              <p className="text-gray-600 mt-1">
                Don't see a question on our site? Enter in your own interview question you want to practice, and start practicing it today.
              </p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2">
              <Plus size={16}/> Create a question
            </Button>
          </div>

          {/* Questions Table */}
          <div className="w-full">
            {/* Table Header */}
            <div className="grid grid-cols-10 bg-emerald-500 text-white font-semibold text-sm rounded-t-lg p-4">
              <div className="col-span-6">QUESTION</div>
              <div className="col-span-1">TAGS</div>
              <div className="col-span-2 text-center">STATUS</div>
              <div className="col-span-1 text-center">ACTIONS</div>
            </div>

            {/* Table Body */}
            <div className="border border-t-0 border-gray-200 rounded-b-lg">
              {createdQuestions.length === 0 ? (
                // Empty State
                <div className="p-10 text-center border-2 border-dashed border-gray-200 m-4 rounded-lg">
                  <div className="flex items-center justify-center gap-3 text-gray-600">
                    <Terminal size={20}/>
                    <p className="font-semibold">No Questions Yet!</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Start practicing by creating your first question. ☝️</p>
                </div>
              ) : (
                // List of Questions
                createdQuestions.map((q, index) => (
                  <div key={index} className="grid grid-cols-10 p-4 items-center border-b border-gray-200 last:border-b-0">
                    <div className="col-span-6 font-medium text-gray-800 pr-4">{q.text}</div>
                    <div className="col-span-1 flex flex-wrap gap-1">
                      {q.tags.map((tag) => <span key={tag} className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{tag}</span>)}
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{q.status}</span>
                    </div>
                    <div className="col-span-1 text-center font-bold text-gray-400">...</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}