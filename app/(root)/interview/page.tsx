"use client";

import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Video, VideoOff, MessageCircle, Zap, BarChart, Smile, Loader2, Star, Link } from 'lucide-react'; 
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

// Define a basic User type here if you don't have one globally
interface User {
  id: string;
  name: string;
  profileURL?: string;
}

// Define the type for the functions we want to expose from the camera component
export interface CameraViewHandle {
  requestCamera: () => Promise<boolean>;
  stopCamera: () => void;
}

// ====================================
// ===== LIVE CAMERA COMPONENT (Unchanged) =====
// ====================================
const LiveCameraView = forwardRef<CameraViewHandle, { userName?: string }>(({ userName }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [permissionStatus, setPermissionStatus] = useState<'idle' | 'granted' | 'denied'>('idle');
  const [error, setError] = useState<string | null>(null);

  const requestCamera = async (): Promise<boolean> => {
    setPermissionStatus('idle');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setPermissionStatus('granted');
      return true;
    } catch (err: any) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setError("Camera & Mic access was denied.");
      } else {
        setError("No camera/mic found.");
      }
      setPermissionStatus('denied');
      console.error("Media access error:", err);
      return false;
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setPermissionStatus('idle');
  };

  useImperativeHandle(ref, () => ({
    requestCamera,
    stopCamera,
  }));

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-4 h-96 flex flex-col justify-between items-center text-center border border-slate-700">
      <div className="w-full h-full rounded-xl bg-black overflow-hidden relative flex justify-center items-center">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted
          className={`w-full h-full object-cover transform scale-x-[-1] transition-opacity duration-500 ${permissionStatus === 'granted' ? 'opacity-100' : 'opacity-0'}`}
        />
        {permissionStatus !== 'granted' && (
          <div className="absolute inset-0 flex flex-col justify-center items-center p-4">
            {permissionStatus === 'idle' && (<p className='font-semibold text-slate-400'>Camera is off</p>)}
            {permissionStatus === 'denied' && (
              <>
                <VideoOff size={48} className="text-red-400 mb-4" />
                <p className='font-semibold text-red-300'>{error}</p>
              </>
            )}
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold text-white mt-3">{userName || 'Guest'}</h3>
    </div>
  );
});
LiveCameraView.displayName = "LiveCameraView";


// ====================================
// ===== MAIN PAGE COMPONENT =====
// ====================================
const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const cameraRef = useRef<CameraViewHandle>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData as User | null);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleStartCall = async (): Promise<boolean> => {
    if (cameraRef.current) {
      return await cameraRef.current.requestCamera();
    }
    return false;
  };

  const handleEndCall = () => {
    if (cameraRef.current) {
      cameraRef.current.stopCamera();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0f1a] via-[#1a1c2b] to-[#101018] text-white p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col items-center">
        
        {/* Page Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#7f5af0] to-[#2cb67d] text-transparent bg-clip-text">
            Interview Generator
          </h1>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Simulate real-time interviews with AI and get instant insights on your performance.
          </p>
        </div>

        {/* ==================================== */}
        {/* ===== NEW "PREPARE FOR SUCCESS" SECTION ===== */}
        {/* ==================================== */}
        <div className="w-full max-w-5xl mb-16">
            <h2 className="text-3xl font-bold text-center text-slate-300 mb-8">Prepare for Success</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* Feature 1 */}
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-colors">
                    <div className="flex justify-center mb-4">
                        <div className="bg-purple-500/10 p-3 rounded-full">
                           <Zap size={24} className="text-purple-400" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Instant Feedback</h3>
                    <p className="text-sm text-slate-400 mt-2">Get immediate, actionable advice on your answers.</p>
                </div>
                {/* Feature 2 */}
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-green-500/50 transition-colors">
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-500/10 p-3 rounded-full">
                           <BarChart size={24} className="text-green-400" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Real-time Analysis</h3>
                    <p className="text-sm text-slate-400 mt-2">Our AI analyzes your speech patterns, keywords, and clarity.</p>
                </div>
                {/* Feature 3 */}
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-pink-500/50 transition-colors">
                    <div className="flex justify-center mb-4">
                        <div className="bg-pink-500/10 p-3 rounded-full">
                           <Smile size={24} className="text-pink-400" />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white">Build Confidence</h3>
                    <p className="text-sm text-slate-400 mt-2">Practice in a stress-free environment and master your delivery.</p>
                </div>
            </div>
        </div>
        
        {/* The two-box layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-4 h-96 flex flex-col justify-center items-center text-center border border-purple-500/50 shadow-lg shadow-purple-500/5">
              <div className='flex flex-col items-center gap-4'>
                <div className='w-40 h-40 rounded-full bg-slate-800/80 flex items-center justify-center border-4 border-slate-600'>
                    <MessageCircle size={80} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white">AI Interviewer</h3>
              </div>
          </div>
          <LiveCameraView ref={cameraRef} userName={user?.name} />
        </div>

        <div className="mt-12 h-16 flex items-center">
            {isLoading && <Loader2 className="w-8 h-8 text-slate-500 animate-spin" />}
            {!isLoading && user && (
                <Agent
                  userName={user.name}
                  userId={user.id}
                  profileImage={user.profileURL}
                  type="generate"
                  onStartCall={handleStartCall}
                  onEndCall={handleEndCall}
                />
            )}
            {!isLoading && !user && (
                <p className="text-slate-400">Please <Link href="/sign-in" className="font-bold text-purple-400 hover:underline">log in</Link> to start an interview.</p>
            )}
        </div>

        {/* ==================================== */}
        {/* ===== NEW "TRUSTED BY PROFESSIONALS" SECTION ===== */}
        {/* ==================================== */}
        <div className="w-full max-w-5xl mt-16">
            <h2 className="text-3xl font-bold text-center text-slate-300 mb-8">Trusted by Professionals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-1 text-yellow-400 mb-2">
                        <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/>
                    </div>
                    <blockquote className="text-slate-300 italic">"This tool was a game-changer. The AI feedback was brutally honest but incredibly helpful. I landed my dream job at Google after just two weeks of practice."</blockquote>
                    <p className="text-sm font-semibold text-white mt-4">- Sarah L., Software Engineer</p>
                </div>
                {/* Testimonial 2 */}
                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-1 text-yellow-400 mb-2">
                         <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/> <Star size={16} fill="currentColor"/>
                    </div>
                    <blockquote className="text-slate-300 italic">"As a career-switcher, I was terrified of interviews. Practicing here gave me the confidence I needed to articulate my value. Highly recommended!"</blockquote>
                    <p className="text-sm font-semibold text-white mt-4">- Michael B., Product Manager</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Page;