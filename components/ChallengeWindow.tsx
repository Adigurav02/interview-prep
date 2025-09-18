"use client";

import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { ChevronRight, Terminal, Loader2, XCircle, CheckCircle } from 'lucide-react';

export interface Challenge {
    title: string;
    language: string;
    difficulty: string;
    xp: number;
    instructions: string;
    boilerplateCode: string;
    correctSolution: string;
}

const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
        case 'Very Easy': return 'bg-sky-100 text-sky-700 border-sky-200';
        case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
        case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-gray-100 text-gray-700';
    }
};

const TestResultPanel = ({ status, correctSolution }: { status: 'idle' | 'running' | 'success' | 'error', correctSolution: string }) => {
    if (status === 'idle') {
        return ( <div className="flex items-center text-sm text-gray-500"><Terminal size={16} className="mr-2" /><span>Test Cases</span></div> );
    }
    if (status === 'running') {
        return ( <div className="flex items-center text-sm text-gray-500"><Loader2 size={16} className="mr-2 animate-spin" /><span>Running...</span></div> );
    }
    if (status === 'success') {
        return ( <div className="flex items-center text-sm font-semibold text-green-600"><CheckCircle size={16} className="mr-1.5" /><span>Great! All test cases passed.</span></div> );
    }
    if (status === 'error') {
        return (
            <div className="w-full">
                 <div className="flex items-center text-sm font-semibold text-red-600 mb-4"><XCircle size={16} className="mr-1.5" /><span>One or more test cases failed. See the correct solution below.</span></div>
                <div className="border rounded-lg overflow-hidden">
                    <Editor height="80px" language="python" theme="vs-dark" value={correctSolution} options={{ readOnly: true, domReadOnly: true, minimap: { enabled: false }, fontSize: 13, scrollBeyondLastLine: false, contextmenu: false }} />
                </div>
            </div>
        );
    }
    return null;
}

export const ChallengeWindow = ({ challenge }: { challenge: Challenge }) => {
    const [code, setCode] = useState(challenge.boilerplateCode);
    const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');

    const handleRunCode = () => {
        setTestStatus('running');
        setTimeout(() => {
            const solutionLogic = challenge.correctSolution.replace(/^(.*?){|}(\s*)$/g, "").trim();
            const userCode = code.replace(/^(.*?){|}(\s*)$/g, "").trim();
            const isCorrect = userCode.includes(solutionLogic);

            if (isCorrect) {
                setTestStatus('success');
            } else {
                setTestStatus('error');
            }
        }, 1500);
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
    
    const langDetails = getLanguageDetails(challenge.language);

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden my-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-6 border-r border-slate-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{challenge.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getDifficultyClass(challenge.difficulty)}`}>{challenge.difficulty}</span>
                    </div>
                    <div className="text-sm text-purple-800 font-medium space-y-1">
                        {challenge.instructions.split('. ').map((line, index) => (<p key={index}>{line}{line.endsWith('.') ? '' : '.'}</p>))}
                    </div>
                </div>
                <div className="flex flex-col bg-[#1E1E1E] text-white min-h-[300px]">
                    <div className="flex items-center h-10 px-4 bg-[#252526] border-b border-gray-700 shrink-0">
                        <span className="text-xs font-mono text-gray-400">main.{langDetails.ext}</span>
                    </div>
                    <div className="relative flex-1">
                        <Editor
                            height="100%"
                            language={langDetails.name}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value || "")}
                            options={{ fontSize: 13, minimap: { enabled: false }, contextmenu: false, scrollBeyondLastLine: false }}
                        />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-slate-200 shrink-0 min-h-[60px]">
                         <TestResultPanel status={testStatus} correctSolution={challenge.correctSolution} />
                        <button
                            onClick={handleRunCode}
                            disabled={testStatus === 'running'}
                            className="flex items-center gap-1 px-4 py-1.5 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {testStatus === 'running' ? 'Running...' : 'Run Code'}
                            {testStatus !== 'running' && <ChevronRight size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};