"use client";

import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { ChevronRight, Terminal, Loader2, XCircle, CheckCircle, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Challenge {
    title: string;
    language: string;
    difficulty: string;
    instructions: string;
    boilerplateCode: string;
    correctSolution: string;
    commonMistake?: string; 
    explanation?: string;
}

const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
        case 'Very Easy': return 'bg-sky-100 text-sky-800';
        case 'Easy': return 'bg-green-100 text-green-800';
        case 'Medium': return 'bg-yellow-100 text-yellow-800';
        case 'Hard': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const TestResultPanel = ({ status, explanation, correctSolution, language }: { 
    status: 'idle' | 'running' | 'success' | 'error' | 'mistake', 
    explanation: string, 
    correctSolution: string,
    language: string
}) => {
    const handleCopy = () => navigator.clipboard.writeText(correctSolution);
    const langDetails = getLanguageDetails(language);

    if (status === 'idle') return <div className="flex items-center text-sm text-gray-500"><Terminal size={16} className="mr-2" /><span>Awaiting Submission</span></div>;
    if (status === 'running') return <div className="flex items-center text-sm text-indigo-600"><Loader2 size={16} className="mr-2 animate-spin" /><span>Running...</span></div>;
    if (status === 'success') return <div className="flex items-center text-sm font-semibold text-green-600"><CheckCircle size={16} className="mr-1.5" /><span>Correct Solution</span></div>;
    
    if (status === 'error' || status === 'mistake') {
        return (
            <div className="w-full text-left">
                <div className="flex items-center text-sm font-semibold text-red-500 mb-3"><XCircle size={18} className="mr-2" />Incorrect Solution</div>
                <div className="pl-7">
                    {status === 'mistake' && (
                        <>
                            <p className="font-semibold text-gray-700 mb-2">Reason:</p>
                            <div className="prose prose-sm text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: explanation }} />
                        </>
                    )}
                    <p className="font-semibold text-gray-700 mb-2 flex items-center"><CheckCircle size={16} className="mr-2 text-green-500"/>Correct solution:</p>
                    <div className="border rounded-lg overflow-hidden relative group">
                        <Editor height="80px" language={langDetails.name} theme="vs-dark" value={correctSolution} options={{ readOnly: true, domReadOnly: true, minimap: { enabled: false }, fontSize: 13 }} />
                        <button onClick={handleCopy} title="Copy solution" className="absolute top-2 right-2 p-1.5 bg-gray-700 rounded-md text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Copy size={14} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

const getLanguageDetails = (lang: string) => {
    const lowerLang = lang.toLowerCase();
    switch (lowerLang) {
        case 'python': return { ext: 'py', name: 'python' };
        case 'javascript': return { ext: 'js', name: 'javascript' };
        case 'typescript': return { ext: 'ts', name: 'typescript' };
        case 'java': return { ext: 'java', name: 'java' };
        case 'go': return { ext: 'go', name: 'go' };
        case 'ruby': return { ext: 'rb', name: 'ruby' };
        case 'php': return { ext: 'php', name: 'php' };
        case 'c++': return { ext: 'cpp', name: 'cpp' };
        case 'c': return { ext: 'c', name: 'c' };
        case 'sql': return { ext: 'sql', name: 'sql' };
        default: return { ext: 'txt', name: 'plaintext' };
    }
}

export const ChallengeWindow = ({ challenge }: { challenge: Challenge }) => {
    const [code, setCode] = useState(challenge.boilerplateCode);
    const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error' | 'mistake'>('idle');

    useEffect(() => {
        setCode(challenge.boilerplateCode);
        setTestStatus('idle');
    }, [challenge]);

    const handleRunCode = () => {
        setTestStatus('running');
        setTimeout(() => {
            const formattedUserCode = code.replace(/\s+/g, "").toLowerCase();
            const formattedSolution = challenge.correctSolution.replace(/\s+/g, '').toLowerCase();
            const formattedMistake = challenge.commonMistake?.replace(/\s+/g, '').toLowerCase();

            if (formattedUserCode === formattedSolution) {
                setTestStatus('success');
            } else if (challenge.commonMistake && formattedUserCode === formattedMistake) {
                setTestStatus('mistake');
            } else {
                setTestStatus('error');
            }
        }, 1000);
    };
    
    return (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden my-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{challenge.title}</h3>
                    <div className="flex items-center gap-3 mb-5">
                        <span className={cn('px-3 py-1 text-xs font-semibold rounded-full', getDifficultyClass(challenge.difficulty))}>{challenge.difficulty}</span>
                    </div>
                    {/* --- THIS IS THE CORRECTED LINE --- */}
                    <div className="text-base text-slate-700 font-medium space-y-2">
                        <p>{challenge.instructions}</p>
                    </div>
                </div>
                <div className="flex flex-col bg-[#1E1E1E] text-white min-h-[400px]">
                    <div className="flex items-center h-10 px-4 bg-[#252526] border-b border-gray-700 shrink-0">
                        <span className="text-sm font-mono text-gray-400">main.{getLanguageDetails(challenge.language).ext}</span>
                    </div>
                    <div className="relative flex-1">
                        <Editor
                            height="100%"
                            language={getLanguageDetails(challenge.language).name}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            options={{ fontSize: 14, minimap: { enabled: false }, contextmenu: false, scrollBeyondLastLine: false }}
                        />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-[#f3f4f6] border-t border-slate-200 shrink-0 min-h-[60px]">
                         <TestResultPanel 
                            status={testStatus} 
                            explanation={challenge.explanation || ""} 
                            correctSolution={challenge.correctSolution}
                            language={challenge.language}
                         />
                        <button
                            onClick={handleRunCode}
                            disabled={testStatus === 'running'}
                            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                        >
                            {testStatus === 'running' ? <Loader2 size={16} className="animate-spin"/> : 'Run'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};