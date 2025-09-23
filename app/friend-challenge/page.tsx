"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Swords, Send, ChevronDown, CheckCircle, XCircle, Trophy, Medal, BrainCircuit, Code, MessageSquare, Zap, Bell, User, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
// --- THIS IS THE FIX ---
import { Button } from "@/components/ui/button"; // Added the missing import

// ====================================
// ===== TYPE DEFINITIONS & DUMMY DATA =====
// ====================================
interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface Challenge {
  id: string;
  type: 'MCQ Quiz' | 'Coding Problem' | 'HR/Behavioral' | 'Rapid Fire';
  title: string;
  content: string;
  options?: string[];
  correctAnswer?: string | number;
  boilerplateCode?: string;
  testCases?: { input: any; expected: any };
}

interface IncomingInvite {
  id: string;
  fromUserId: string;
  toEmail: string;
  challengeId: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: string;
}

interface ChallengeResult {
  challengeTitle: string;
  userScore: number;
  friendScore: number;
  winner: 'user' | 'friend' | 'tie';
}

const dummyFriends: Friend[] = [
  { id: 'f1', name: 'Alex Johnson', avatar: '/images/avatar-1.png' },
  { id: 'f2', name: 'Samantha Lee', avatar: '/images/avatar-2.png' },
  { id: 'f3', name: 'Chris Davis', avatar: '/images/avatar-3.png' },
];

const dummyChallenges: Challenge[] = [
  { id: 'c1', type: 'MCQ Quiz', title: 'JavaScript Promises', content: 'What is the correct way to handle a successful resolution of a Promise?', options: ['A) .then()', 'B) .catch()', 'C) .finally()', 'D) .resolve()'], correctAnswer: 'A) .then()' },
  { id: 'c2', type: 'Coding Problem', title: 'Reverse a String', content: 'Write a function that takes a string and returns it reversed.', boilerplateCode: 'function reverseString(str) {\n  // Your code here\n}', testCases: { input: 'hello', expected: 'olleh' } },
  { id: 'c3', type: 'HR/Behavioral', title: 'Team Conflict', content: 'Tell me about a time you had a conflict with a team member and how you resolved it.' },
  { id: 'c4', type: 'Rapid Fire', title: 'React Hooks', content: 'What are the 5 most common React hooks?' },
];

// runtime data will be fetched from API instead

// ====================================
// ===== HELPER HOOKS & COMPONENTS =====
// ====================================

// --- Timer Hook ---
const useTimer = (initialTime: number, onEnd: () => void) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      onEnd();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, onEnd]);

  const start = () => setIsActive(true);
  const stop = () => setIsActive(false);
  const reset = () => {
    stop();
    setTime(initialTime);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return { time, minutes, seconds, start, stop, reset, isActive };
};

// --- Send Challenge Modal ---
const SendChallengeModal = ({ challenges, onSend, onClose }: { challenges: Challenge[]; onSend: (email: string, challengeId: string) => void; onClose: () => void; }) => {
    const [friendEmail, setFriendEmail] = useState('');
    const [selectedChallenge, setSelectedChallenge] = useState('');

    const handleSend = () => {
        if (friendEmail && selectedChallenge) {
            onSend(friendEmail, selectedChallenge);
            onClose();
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative text-gray-800">
                <h2 className="text-2xl font-bold mb-6 text-center">Send a Challenge</h2>
                <div className="space-y-4">
                    <select value={selectedChallenge} onChange={(e) => setSelectedChallenge(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg">
                        <option value="">Select Challenge Type</option>
                        {challenges.map(c => <option key={c.id} value={c.id}>{c.type}: {c.title}</option>)}
                    </select>
                    <input value={friendEmail} onChange={(e) => setFriendEmail(e.target.value)} placeholder="Friend's email" className="w-full p-3 border border-gray-300 rounded-lg" />
                </div>
                <div className="mt-8 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSend} disabled={!friendEmail || !selectedChallenge} className="bg-purple-600 text-white hover:bg-purple-700">
                        <Send size={16} className="mr-2" /> Send
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

// --- Challenge Arena ---
const ChallengeArena = ({ challenge, onComplete }: { challenge: Challenge; onComplete: (score: number) => void; }) => {
    const [userAnswer, setUserAnswer] = useState(challenge.boilerplateCode || "");
    const timer = useTimer(300, () => handleSubmit()); // 5-minute timer

    useEffect(() => {
        timer.start();
    }, []);

    const handleSubmit = () => {
        timer.stop();
        let score = 0;
        if (challenge.type === 'MCQ Quiz') {
            if (userAnswer === challenge.correctAnswer) score = 100;
        } else if (challenge.type === 'Coding Problem') {
            const cleanUserCode = userAnswer.replace(/\s+/g, '');
            const cleanSolution = `function reverseString(str){return str.split('').reverse().join('');}`.replace(/\s+/g, '');
            if(cleanUserCode.includes(cleanSolution)) score = 100;
        } else {
            score = Math.floor(Math.random() * (95 - 75 + 1)) + 75;
        }
        onComplete(score);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-900 rounded-2xl border border-slate-700">
            <div className="w-full max-w-3xl text-center">
                 <div className="mb-4 text-sm font-semibold bg-slate-800 text-purple-300 px-3 py-1 rounded-full inline-block">{challenge.type}</div>
                 <h2 className="text-3xl font-bold text-white">{challenge.title}</h2>
                 <p className="text-slate-400 mt-2">{challenge.content}</p>
                 <div className="my-8 flex justify-center items-center gap-2 text-2xl font-mono font-bold text-yellow-400">
                    <Clock size={24} />
                    <span>{String(timer.minutes).padStart(2, '0')}:{String(timer.seconds).padStart(2, '0')}</span>
                 </div>

                 <div className="text-left">
                     {challenge.type === 'MCQ Quiz' && (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             {challenge.options?.map(opt => (
                                 <button key={opt} onClick={() => setUserAnswer(opt)} className={cn("p-4 border rounded-lg transition-colors", userAnswer === opt ? "bg-purple-600 border-purple-500 text-white" : "bg-slate-800 border-slate-700 hover:bg-slate-700")}>
                                     {opt}
                                 </button>
                             ))}
                         </div>
                     )}
                     {challenge.type === 'Coding Problem' && (
                         <div className="border border-slate-700 rounded-lg overflow-hidden">
                            <Editor height="200px" language="javascript" theme="vs-dark" value={userAnswer} onChange={(val) => setUserAnswer(val || "")} />
                         </div>
                     )}
                      {(challenge.type === 'HR/Behavioral' || challenge.type === 'Rapid Fire') && (
                         <textarea value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} placeholder="Type your answer here..." className="w-full h-40 p-4 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"/>
                     )}
                 </div>
                 
                 <Button onClick={handleSubmit} disabled={!timer.isActive} className="mt-8 w-full max-w-xs bg-green-500 text-white font-bold py-6 text-lg hover:bg-green-600">Submit Answer</Button>
            </div>
        </motion.div>
    );
};

// --- Results Screen ---
const ResultsScreen = ({ result, onPlayAgain }: { result: ChallengeResult; onPlayAgain: () => void; }) => {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-900 rounded-2xl border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-2">Challenge Complete!</h2>
            <p className="text-slate-400 mb-8">{result.challengeTitle}</p>
            
            <div className="flex gap-8 items-center">
                <div className={cn("text-center p-6 rounded-lg border-2", result.winner === 'user' ? "bg-green-500/10 border-green-500" : "bg-slate-800 border-slate-700")}>
                    {result.winner === 'user' && <Trophy className="mx-auto text-yellow-400 mb-2" />}
                    <p className="font-semibold text-white">Your Score</p>
                    <p className="text-5xl font-bold text-green-400">{result.userScore}</p>
                </div>
                
                <p className="text-3xl font-bold text-slate-500">VS</p>
                
                <div className={cn("text-center p-6 rounded-lg border-2", result.winner === 'friend' ? "bg-red-500/10 border-red-500" : "bg-slate-800 border-slate-700")}>
                    {result.winner === 'friend' && <Medal className="mx-auto text-slate-400 mb-2" />}
                    <p className="font-semibold text-white">Friend's Score</p>
                    <p className="text-5xl font-bold text-red-400">{result.friendScore}</p>
                </div>
            </div>
            
             <Button onClick={onPlayAgain} className="mt-12 bg-purple-600 text-white font-bold py-6 text-lg hover:bg-purple-700">Back to Challenges</Button>
        </motion.div>
    );
};


// ====================================
// ===== MAIN PAGE COMPONENT =====
// ====================================
export default function FriendChallengePage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [incomingInvites, setIncomingInvites] = useState<IncomingInvite[]>([]);
  const [showSendModal, setShowSendModal] = useState(false);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [challengeResult, setChallengeResult] = useState<ChallengeResult | null>(null);
  const [gameState, setGameState] = useState<{ gameId: string | null; opponentId: string | null; roundNumber: number }>(() => ({ gameId: null, opponentId: null, roundNumber: 0 }));

  useEffect(() => {
    // Load catalog
    fetch('/api/friend-challenge/catalog').then(r => r.json()).then(d => setChallenges(d.challenges || [])).catch(() => {});
    // Load incoming invites
    fetch('/api/friend-challenge/incoming').then(r => r.json()).then(d => { if (d.success) setIncomingInvites(d.invites || []); }).catch(() => {});
  }, []);

  const handleStartChallenge = (challenge: Challenge) => {
    setChallengeResult(null);
    setActiveChallenge(challenge);
  };

  const handleChallengeComplete = async (userScore: number) => {
    if (!activeChallenge) return;
    const friendScore = Math.floor(Math.random() * (90 - 60 + 1)) + 60;
    let winner: 'user' | 'friend' | 'tie' = 'tie';
    if (userScore > friendScore) winner = 'user';
    if (friendScore > userScore) winner = 'friend';

    setChallengeResult({
        challengeTitle: activeChallenge.title,
        userScore,
        friendScore,
        winner
    });
    setActiveChallenge(null);

    // record round if we have game context
    if (gameState.gameId && gameState.opponentId) {
      try {
        await fetch('/api/friend-challenge/record-round', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gameId: gameState.gameId,
            roundNumber: gameState.roundNumber + 1,
            opponentId: gameState.opponentId,
            challengeId: activeChallenge.id,
            userScore,
            opponentScore: friendScore,
          })
        });
        setGameState((s) => ({ ...s, roundNumber: s.roundNumber + 1 }));
      } catch {}
    }
  };
  
  const handleSendChallenge = async (friendEmail: string, challengeId: string) => {
      try {
        const res = await fetch('/api/friend-challenge/send-invite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ toEmail: friendEmail, challengeId })
        });
        const data = await res.json();
        if (!data.success) {
          alert(data.message || 'Failed to send invite');
        } else {
          alert('Challenge invite sent');
        }
      } catch {
        alert('Failed to send invite');
      }
  };

  const handleAcceptInvite = async (invite: IncomingInvite) => {
    try {
      const res = await fetch('/api/friend-challenge/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteId: invite.id })
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message || 'Failed to accept');
        return;
      }
      setGameState({ gameId: data.gameId, opponentId: data.playerAId, roundNumber: 0 });
      // start the first round using the invited challenge
      const challenge = challenges.find(c => c.id === data.challengeId) || null;
      if (challenge) {
        setChallengeResult(null);
        setActiveChallenge(challenge);
      }
      // refresh incoming invites list
      fetch('/api/friend-challenge/incoming').then(r => r.json()).then(d => { if (d.success) setIncomingInvites(d.invites || []); });
    } catch {
      alert('Failed to accept invite');
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen w-full text-white font-sans">
      {showSendModal && <SendChallengeModal challenges={challenges} onSend={handleSendChallenge} onClose={() => setShowSendModal(false)} />}
      <div className="container mx-auto px-6 py-12">
        <header className="text-center mb-12">
            <Swords className="mx-auto h-12 w-12 text-purple-400 mb-4" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Friend Challenge Mode</h1>
            <p className="mt-4 text-lg text-slate-400">Compete with friends in timed challenges and climb the leaderboard.</p>
        </header>

        <main className="min-h-[60vh] flex items-center justify-center">
             <AnimatePresence mode="wait">
                {activeChallenge ? (
                   <motion.div key="arena" className="w-full h-full">
                      <ChallengeArena challenge={activeChallenge} onComplete={handleChallengeComplete} />
                   </motion.div>
                ) : challengeResult ? (
                     <motion.div key="results" className="w-full h-full">
                       <ResultsScreen result={challengeResult} onPlayAgain={() => setChallengeResult(null)} />
                    </motion.div>
                ) : (
                    <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-slate-900 p-8 rounded-2xl border border-slate-700">
                             <h2 className="text-2xl font-bold mb-4">Challenge a Friend</h2>
                             <p className="text-slate-400 mb-6">Select a challenge type and a friend to send an invitation.</p>
                             <Button onClick={() => setShowSendModal(true)} className="w-full max-w-xs bg-purple-600 hover:bg-purple-700">
                                <Send size={16} className="mr-2"/> Send a New Challenge
                             </Button>
                        </div>
                        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
                            <div className="flex items-center gap-3 mb-6">
                                <Bell className="text-yellow-400" />
                                <h2 className="text-2xl font-bold">Incoming Challenges</h2>
                            </div>
                            <div className="space-y-4">
                                {incomingInvites.length === 0 && (
                                  <p className="text-slate-500">No incoming challenges</p>
                                )}
                                {incomingInvites.map(invite => (
                                  <div key={invite.id} className="w-full p-4 rounded-lg bg-slate-800 border border-slate-700">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className="font-semibold">New challenge received</p>
                                        <p className="text-sm text-slate-400">From user: {invite.fromUserId}</p>
                                      </div>
                                      <Button size="sm" onClick={() => handleAcceptInvite(invite)}>Accept</Button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>
        </main>
      </div>
    </div>
  );
}