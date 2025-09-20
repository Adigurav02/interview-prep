"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, Sparkles, Copy, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

// Define the structure for a chat message
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ResumeGeneratorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justCopied, setJustCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Automatically scroll to the bottom of the chat view
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus the input field when the chat starts
  useEffect(() => {
    if (messages.length > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages.length]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, history: messages }),
      });

      if (!response.ok) throw new Error((await response.json()).error || 'API request failed');

      const data = await response.json();
      const aiMessage: Message = { role: 'assistant', content: data.reply };
      
      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 500);

    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  
  const handleCopyText = async () => {
    const lastAiMessage = messages.filter(m => m.role === 'assistant').pop();
    if (!lastAiMessage || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(lastAiMessage.content);
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy text.");
    }
  };

  const handleDownloadPdf = async () => {
    const lastAiMessage = messages.filter(m => m.role === 'assistant').pop();
    if (!lastAiMessage) {
      setError("No resume content to download.");
      return;
    }
    setIsGeneratingPdf(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: lastAiMessage.content }),
      });
      if (!response.ok) throw new Error('Failed to generate PDF.');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const messageVariants = { hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } } };

  return (
    <div className="flex flex-col h-screen bg-[#1F1F1F] text-gray-200 overflow-hidden">

      {messages.length === 0 ? (
        // --- SIMPLIFIED Welcome Screen ---
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-semibold text-gray-300 mb-8"
          >
            Let's build your standout resume.
          </motion.h1>
          <motion.div
             initial={{ opacity: 0, y: 20, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="w-full max-w-xl"
          >
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell me about your experience, skills, or the job you want..."
                className="w-full pl-5 pr-14 py-4 bg-[#333333] border border-gray-700 text-gray-200 placeholder:text-gray-400 rounded-full focus:ring-2 focus:ring-white/50 focus:outline-none transition-shadow shadow-lg"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>

      ) : (
        
        // --- Existing Chat Interface ---
        <>
          <header className="bg-black/30 backdrop-blur-lg border-b border-gray-700/50 p-4 flex justify-between items-center sticky top-0 z-10 shrink-0">
            <div className="text-center flex-1">
              <h1 className="text-xl md:text-2xl font-bold text-gray-100 tracking-wide">AI Resume Architect</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleCopyText} disabled={justCopied} className={cn("disabled:bg-gray-700 flex items-center gap-2 transition-all duration-300 rounded-lg shadow-lg", justCopied ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-gray-600 hover:bg-gray-700 text-white')}>
                {justCopied ? <Check size={18} /> : <Copy size={18} />}
                {justCopied ? 'Copied!' : 'Copy'}
              </Button>
              <Button onClick={handleDownloadPdf} disabled={isGeneratingPdf} className="bg-teal-500 hover:bg-teal-600 text-white flex items-center gap-2 transition-all duration-300 rounded-lg shadow-lg disabled:bg-gray-700">
                {isGeneratingPdf ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                {isGeneratingPdf ? 'Downloading...' : 'Download'}
              </Button>
            </div>
          </header>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {messages.map((m, index) => (
              <motion.div key={index} variants={messageVariants} layout className={cn("flex items-start gap-3 md:gap-4 w-full", { "justify-end": m.role === 'user' })}>
                {m.role === 'assistant' && (<div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 border-2 border-gray-600 shadow-md"><Bot size={20} /></div>)}
                <div className={cn("prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-100 prose-strong:text-white rounded-2xl border w-full max-w-2xl px-5 py-3 shadow-lg", { "bg-teal-600/20 border-teal-500/50": m.role === 'user' }, { "bg-gray-800/60 border-gray-700/50": m.role === 'assistant' })}><ReactMarkdown>{m.content}</ReactMarkdown></div>
                {m.role === 'user' && (<div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-teal-500 border-2 border-teal-400 text-white shadow-md"><User size={20} /></div>)}
              </motion.div>
            ))}
            <AnimatePresence>
              {isLoading && (<motion.div variants={messageVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-start gap-3 md:gap-4"><div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 border-2 border-gray-600"><Bot size={20} /></div><div className="bg-gray-800/60 flex items-center space-x-1.5 p-4 rounded-xl border border-gray-700/50"><motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-2 bg-gray-400 rounded-full"/><motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 bg-gray-400 rounded-full"/><motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full"/></div></motion.div>)}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </motion.div>
          
          <div className="bg-black/30 backdrop-blur-lg border-t border-gray-700/50 p-4 sticky bottom-0 shrink-0">
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="relative">
                <Textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Continue the conversation..." className="w-full resize-none pr-14 pl-4 py-3 bg-gray-800 border-2 border-gray-600 text-gray-200 placeholder:text-gray-500 rounded-lg focus-visible:ring-2 focus-visible:ring-teal-500" rows={1} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(e as any); } }}/>
                <Button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white disabled:bg-gray-700" size="icon"><Send size={20} /></Button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}