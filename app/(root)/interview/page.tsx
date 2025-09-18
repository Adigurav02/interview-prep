"use client";

import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { VideoOff, MessageCircle, Loader2, Link as LinkIcon, Mic, ChevronRight } from 'lucide-react'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { saveInterviewFeedback, getInterviewHistory } from '@/lib/actions/interview.action';
import type { User, InterviewState, TranscriptMessage } from '@/types';

export interface CameraViewHandle { requestCamera: () => Promise<boolean>; stopCamera: () => void; }

const LiveCameraView = forwardRef<CameraViewHandle, { userName?: string }>(({ userName }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [permissionStatus, setPermissionStatus] = useState<'idle' | 'granted' | 'denied'>('idle');
  const [error, setError] = useState<string | null>(null);
  const requestCamera = async (): Promise<boolean> => { try { const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true }); if (videoRef.current) videoRef.current.srcObject = stream; setPermissionStatus('granted'); return true; } catch (err: any) { setError(err.name === "NotAllowedError" ? "Camera & Mic access was denied." : "No camera/mic found."); setPermissionStatus('denied'); return false; } };
  const stopCamera = () => { if (videoRef.current && videoRef.current.srcObject) { (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop()); videoRef.current.srcObject = null; } setPermissionStatus('idle'); };
  useImperativeHandle(ref, () => ({ requestCamera, stopCamera }));
  return ( <div className="bg-slate-800/50 rounded-2xl p-4 h-96 flex flex-col justify-between items-center text-center border border-slate-700"> <div className="w-full h-full rounded-xl bg-black overflow-hidden relative flex justify-center items-center"> <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-500 ${permissionStatus === 'granted' ? 'opacity-100' : 'opacity-0'}`} /> {permissionStatus !== 'granted' && ( <div className="absolute inset-0 flex flex-col justify-center items-center p-4"> {permissionStatus === 'idle' && (<p className='font-semibold text-slate-400'>Camera is off</p>)} {permissionStatus === 'denied' && ( <> <VideoOff size={48} className="text-red-400 mb-4" /> <p className='font-semibold text-red-300'>{error}</p> </> )} </div> )} </div> <h3 className="text-lg font-bold text-white mt-3">{userName || 'Guest'}</h3> </div> );
});
LiveCameraView.displayName = "LiveCameraView";

const AiInterviewer = ({ state }: { state: InterviewState }) => {
  const getAvatarState = () => { switch (state) { case 'in_progress': return { borderColor: 'border-green-500', icon: <Mic size={70} className="text-green-400 animate-pulse" />, label: 'In Progress...' }; case 'ended': return { borderColor: 'border-slate-600', icon: <MessageCircle size={80} className="text-slate-500" />, label: 'Interview Ended' }; default: return { borderColor: 'border-purple-500/50', icon: <MessageCircle size={80} className="text-purple-400" />, label: 'AI Interviewer' }; } };
  const { borderColor, icon, label } = getAvatarState();
  return ( <div className={`bg-slate-800/50 rounded-2xl p-4 h-96 flex flex-col justify-center items-center text-center border ${borderColor} transition-all duration-300 shadow-lg`}> <div className='flex flex-col items-center gap-4'> <div className={`w-40 h-40 rounded-full bg-slate-800/80 flex items-center justify-center border-4 ${borderColor} transition-all duration-300`}>{icon}</div> <h3 className="text-xl font-bold text-white">{label}</h3> </div> </div> );
};

const RecentFeedbackCard = ({ latestInterview }: { latestInterview: any }) => {
    if (!latestInterview) return null;
    return ( <div className="w-full max-w-5xl mb-12 bg-slate-800/50 border border-slate-700 rounded-lg p-6 animate-fadeIn transition-all hover:border-purple-500/50"> <h3 className="font-semibold text-lg text-white mb-3">Your Most Recent Feedback</h3> <div className="flex justify-between items-center gap-4"> <p className="text-slate-400 max-w-md truncate text-sm"> "{latestInterview.feedback.summary}" </p> <Link href="/feedback" className="flex-shrink-0 flex items-center gap-2 text-purple-400 font-semibold hover:text-purple-300 transition-colors text-sm"> View All Feedback <ChevronRight size={18} /> </Link> </div> </div> );
};

export default function InterviewPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [interviewState, setInterviewState] = useState<InterviewState>('idle');
  const [latestAiMessage, setLatestAiMessage] = useState<string | null>(null);
  const [latestInterview, setLatestInterview] = useState<any | null>(null);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const cameraRef = useRef<CameraViewHandle>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const userData = await getCurrentUser();
        setUser(userData as User | null);
        if (userData) {
          const history = await getInterviewHistory();
          if (history.length > 0) setLatestInterview(history[0]);
        }
      } catch (error) { console.error("Failed to fetch initial data:", error); } 
      finally { setIsLoading(false); }
    };
    fetchInitialData();
  }, []);

  const handleStartCall = async (): Promise<boolean> => {
    const success = await cameraRef.current?.requestCamera() ?? false;
    if (success) {
      setInterviewState('in_progress');
      const firstQuestion = "Hello! I'm your AI interviewer. How are you feeling today?";
      setLatestAiMessage(firstQuestion);
      setTranscript([{ speaker: 'ai', text: firstQuestion }]);
      toast.success("Interview started!");
    } else {
      toast.error("Could not start. Please grant camera & microphone permissions.");
    }
    return success;
  };

  const handleNewMessage = (message: { role: 'user' | 'assistant', content: string }) => {
    const speaker = message.role === 'assistant' ? 'ai' : 'user';
    setTranscript(prev => [...prev, { speaker, text: message.content }]);
    if (speaker === 'ai') {
      setLatestAiMessage(message.content);
    }
  };

  const handleEndCall = async () => {
    cameraRef.current?.stopCamera();
    setInterviewState('ended');
    setLatestAiMessage(null);
    toast.info("Interview has ended. Generating your feedback report...");
    const result = await saveInterviewFeedback({ transcript });
    if (result.success && result.interviewId) {
      toast.success("Feedback report generated!");
      router.push(`/feedback/${result.interviewId}`);
    } else {
      toast.error(result.message || "Could not save your interview report.");
      router.push('/feedback');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0f1a] to-[#101018] text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col items-center">
        {interviewState === 'idle' && (
          <div className="text-center mb-12 animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] text-transparent bg-clip-text">AI Interview Practice</h1>
            <p className="text-gray-400 mt-4 text-lg">Practice in a stress-free environment and master your delivery.</p>
          </div>
        )}
        {interviewState === 'idle' && user && <RecentFeedbackCard latestInterview={latestInterview} />}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <AiInterviewer state={interviewState} />
          <LiveCameraView ref={cameraRef} userName={user?.name} />
        </div>
        <div className="mt-8 h-20 w-full flex items-center justify-center">
            {isLoading && <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />}
            {!isLoading && user && (
                <Agent
                  interviewState={interviewState}
                  latestAiMessage={latestAiMessage}
                  onStartCall={handleStartCall}
                  onEndCall={handleEndCall}
                  onNewMessage={handleNewMessage}
                  userName={user.name} 
                  userId={user.id}
                  type="generate"
                />
            )}
            {!isLoading && !user && (
                <p className="text-slate-400">Please <Link href="/sign-in" className="font-bold text-purple-400 hover:underline">log in</Link> to start an interview.</p>
            )}
        </div>
      </div>
    </div>
  );
} 