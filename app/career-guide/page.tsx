"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Updated icons for new content
import { Send, Bot, User, Loader2, Sparkles, MessageSquare, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// --- NEW, FOCUSED CONTENT FOR THE WELCOME SCREEN ---
const promptCards = [
    { 
        icon: <MessageSquare size={24} className="text-blue-400" />,
        title: "Nail the Interview", 
        question: "How should I answer 'What is your greatest weakness'?" 
    },
    { 
        icon: <DollarSign size={24} className="text-emerald-400" />,
        title: "Salary Negotiation", 
        question: "Give me some tips for negotiating a higher salary." 
    },
    { 
        icon: <TrendingUp size={24} className="text-rose-400" />,
        title: "Career Pathing", 
        question: "What are the steps to move from a junior to a senior developer role?" 
    },
];

export default function CareerGuidePage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const handleSendMessage = async (messageText?: string) => {
        const textToSend = messageText || input;
        if (!textToSend.trim() || isLoading) return;

        const newUserMessage: Message = { role: 'user', content: textToSend };
        setMessages(prev => [...prev, newUserMessage]); 
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/career-guide', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: textToSend, history: messages }),
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

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } } };

    return (
        <div className="flex flex-col h-screen bg-[#111827] text-gray-200 overflow-hidden animated-gradient">
            <AnimatePresence>
                {messages.length === 0 ? (
                    <motion.div 
                        key="welcome"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-center h-full w-full p-4"
                    >
                        <Sparkles className="w-14 h-14 mb-4 text-blue-400" />
                        <h1 className="text-4xl font-bold text-gray-100 mb-2">Interview GPT</h1>
                        <p className="text-lg text-gray-400 mb-12">Your personal AI career coach.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full mb-8">
                            {promptCards.map((card, index) => (
                                <motion.button
                                    key={card.title}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    onClick={() => handleSendMessage(card.question)}
                                    className="bg-gray-800/50 border border-gray-700/80 rounded-xl p-6 text-left hover:bg-gray-700/60 transition-colors duration-300"
                                >
                                    <div className="flex items-center gap-4">
                                        {card.icon}
                                        <h3 className="font-semibold text-gray-200">{card.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-2">{card.question}</p>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="chat"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col h-full"
                    >
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                            {messages.map((m, index) => (
                                <motion.div key={index} variants={itemVariants} layout className={cn("flex items-start gap-3 md:gap-4 w-full", { "justify-end": m.role === 'user' })}>
                                    {m.role === 'assistant' && (<div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 border-2 border-gray-600 shadow-md"><Bot size={20} /></div>)}
                                    <div className={cn("prose prose-invert prose-p:text-gray-300 prose-headings:text-gray-100 prose-strong:text-white rounded-2xl border w-full max-w-2xl px-5 py-3 shadow-lg", { "bg-blue-600/30 border-blue-500/50": m.role === 'user' }, { "bg-gray-800/60 border-gray-700/50": m.role === 'assistant' })}><ReactMarkdown>{m.content}</ReactMarkdown></div>
                                    {m.role === 'user' && (<div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 border-2 border-blue-500 text-white shadow-md"><User size={20} /></div>)}
                                </motion.div>
                            ))}
                            <AnimatePresence>
                                {isLoading && (<motion.div variants={itemVariants} initial="hidden" animate="visible" exit="hidden" className="flex items-start gap-3 md:gap-4"><div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-700 border-2 border-gray-600"><Bot size={20} /></div><div className="bg-gray-800/60 flex items-center space-x-1.5 p-4 rounded-xl border border-gray-700/50"><motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-2 bg-gray-400 rounded-full"/><motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 bg-gray-400 rounded-full"/><motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full"/></div></motion.div>)}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="bg-gray-900/50 backdrop-blur-lg border-t border-gray-700/50 p-4 sticky bottom-0 shrink-0">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative">
                        <Textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask for interview tips, salary advice, and more..."
                            className="w-full resize-none pr-14 pl-4 py-3 bg-gray-800 border-2 border-gray-600 text-gray-200 placeholder:text-gray-500 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500"
                            rows={1}
                            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } }}
                        />
                        <Button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-700" size="icon">
                            <Send size={20} />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}