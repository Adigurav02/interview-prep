"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, ClipboardPaste } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const questionOptions = [5, 10, 15, 20, 25, 30];

export default function ResumeAiPage() {
  const [resumeText, setResumeText] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setResumeText(text);
        toast.success("Resume pasted successfully!");
      } else {
        toast.error("Your clipboard is empty.");
      }
    } catch (err) {
      toast.error("Could not read from clipboard. Please paste manually.");
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleGenerateClick = async () => {
    if (!resumeText.trim()) {
      toast.error("Please paste or write your resume first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedQuestions([]);

    try {
      const response = await fetch('/api/generate-resume-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, numQuestions }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An unknown error occurred.");
      }

      setGeneratedQuestions(data.questions || []);
      toast.success("Questions generated successfully!");

    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen w-full p-4 sm:p-8 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <Sparkles className="mx-auto h-12 w-12 text-[#10B981] mb-4" />
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">AI Question Generator</h1>
          <p className="mt-4 text-lg text-slate-600">
            Paste your resume below and our AI will generate personalized interview questions to help you prepare.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-gray-200/80 rounded-2xl shadow-xl p-8">
            <div className="relative">
              <Button 
                onClick={handlePaste} 
                variant="outline" 
                className="absolute top-3 right-3 z-10 bg-white hover:bg-slate-100 text-slate-600 border-slate-300"
              >
                <ClipboardPaste className="mr-2 h-4 w-4" />
                Paste Resume
              </Button>
              <Textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume here..."
                className="w-full h-60 p-4 border-2 border-slate-200 rounded-xl shadow-inner bg-slate-50 focus-visible:ring-2 focus-visible:ring-[#10B981] text-slate-800"
              />
            </div>

            <div className="my-8">
              <p className="text-center font-semibold text-slate-700 mb-4">How many questions would you like to generate?</p>
              <div className="flex justify-center flex-wrap gap-3">
                {questionOptions.map(num => (
                  <button
                    key={num}
                    onClick={() => setNumQuestions(num)}
                    className={cn(
                      "h-10 w-10 flex items-center justify-center rounded-full font-semibold transition-all duration-200",
                      numQuestions === num
                        ? "bg-[#10B981] text-white shadow-md scale-110"
                        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <Button
                onClick={handleGenerateClick}
                disabled={isLoading}
                size="lg"
                className="w-full max-w-sm bg-[#10B981] hover:bg-[#059669] text-white font-bold py-7 text-lg rounded-xl shadow-lg transition-transform active:scale-95"
              >
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                {isLoading ? 'Generating...' : 'Create Questions'}
              </Button>
            </div>
        </div>


        {error && <div className="mt-8 p-4 text-sm text-red-800 rounded-lg bg-red-100 text-center" role="alert">{error}</div>}

        <AnimatePresence>
          {generatedQuestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Your Personalized Questions</h2>
              {/* --- THIS IS THE CORRECTED SECTION --- */}
              <div className="bg-white border border-gray-200/80 rounded-2xl shadow-lg p-8 prose prose-slate max-w-none prose-li:text-slate-800">
                <ol className="list-decimal list-inside space-y-5">
                  {generatedQuestions.map((q, index) => (
                    <li key={index} className="pl-2 leading-relaxed">{q}</li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}