"use client";

import { useEffect, useState } from "react";
import { vapi } from "@/lib/vapi.sdk";
import { Button } from "@/components/ui/button";
import { Play, Phone, Bot, Loader2 } from 'lucide-react';
import type { InterviewState } from '@/types';
import { toast } from "sonner";

interface AgentProps {
  interviewState: InterviewState;
  latestAiMessage: string | null;
  onStartCall: () => Promise<boolean>;
  onEndCall: () => void;
  onNewMessage: (message: { role: 'user' | 'assistant', content: string }) => void;
  userName: string;
  userId: string;
  type: 'generate' | 'practice';
}

interface VapiMessage {
  type: string;
  role: 'user' | 'system' | 'assistant';
  transcriptType?: string;
  transcript: string;
}

const Agent = ({ interviewState, latestAiMessage, onStartCall, onEndCall, onNewMessage, userName, userId, type }: AgentProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const onCallStartHandler = () => setIsConnecting(false);
    const onCallEndHandler = () => {
      setIsConnecting(false);
      onEndCall();
    };
    
    const onMessageHandler = (message: VapiMessage) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        onNewMessage({ role: message.role, content: message.transcript });
      }
    };
    
    const onErrorHandler = (error: any) => {
      console.error("Vapi Error Event:", error);
      setIsConnecting(false);
      
      const errorMessage = error?.message || "An unknown error occurred.";
      if (errorMessage.includes("Meeting has ended") || errorMessage.includes("no-room") || errorMessage.includes("ejected")) {
        toast.error("The interview room expired before connecting. This is a Vapi configuration issue. Please try again.");
      } else {
        toast.error(`Connection Error: ${errorMessage}`);
      }
      onEndCall(); 
    };

    vapi.on("call-start", onCallStartHandler);
    vapi.on("call-end", onCallEndHandler);
    vapi.on("message", onMessageHandler);
    vapi.on("error", onErrorHandler);

    return () => {
      vapi.off("call-start", onCallStartHandler);
      vapi.off("call-end", onCallEndHandler);
      vapi.off("message", onMessageHandler);
      vapi.off("error", onErrorHandler);
    };
  }, [onEndCall, onNewMessage]);

  const handleCall = async () => {
    setIsConnecting(true);
    const permissionGranted = await onStartCall();
    if (!permissionGranted) {
      setIsConnecting(false);
      return;
    }
    const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
    if (!workflowId) {
      toast.error("VAPI Workflow ID is not configured.");
      setIsConnecting(false);
      onEndCall();
      return;
    }
    try {
      await vapi.start(workflowId, { variableValues: { username: userName, userid: userId } });
    } catch (error: any) {
      console.error("Error starting Vapi call:", error);
      toast.error(`Failed to initiate call: ${error.message}`);
      setIsConnecting(false);
      onEndCall();
    }
  };

  const handleDisconnect = () => { vapi.stop(); };
  
  if (interviewState === 'ended') return null;

  if (interviewState === 'in_progress') {
    return (
      <div className="w-full max-w-4xl flex justify-between items-center bg-slate-900/70 border border-slate-700 rounded-full p-3 animate-fadeIn shadow-lg">
        <div className="flex items-center gap-3 pl-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center"><Bot size={20} className="text-purple-300" /></div>
          <p className="text-slate-300 text-lg font-medium truncate hidden sm:block">{latestAiMessage || "AI is thinking..."}</p>
        </div>
        <Button onClick={handleDisconnect} className="bg-red-600 text-white font-bold h-12 px-6 rounded-full text-base hover:bg-red-700 transition-transform hover:scale-105 flex items-center gap-2"><Phone className="h-5 w-5" />End Call</Button>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <Button onClick={handleCall} disabled={isConnecting} className="bg-green-500 text-black font-bold h-14 px-8 rounded-full text-lg hover:bg-green-600 transition-transform hover:scale-105 disabled:opacity-70 disabled:scale-100 flex items-center gap-2">
        {isConnecting ? (<><Loader2 className="h-6 w-6 animate-spin" />Connecting...</>) : (<><Play className="h-6 w-6" />Start Interview</>)}
      </Button>
    </div>
  );
};

export default Agent;