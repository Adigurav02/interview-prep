"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

// Define enums and interfaces at the top level for clarity
enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface AgentProps {
    userName: string;
    userId: string;
    interviewId?: string;
    feedbackId?: string;
    type: 'generate' | 'practice';
    questions?: string[];
    profileImage?: string;
    onStartCall?: () => Promise<boolean>; // Function to request camera, returns true on success
    onEndCall?: () => void; // Function to stop camera
}

interface Message {
    type: string;
    transcriptType?: string;
    role: 'user' | 'system' | 'assistant';
    transcript: string;
}

const Agent = ({ userName, userId, interviewId, feedbackId, type, questions, onStartCall, onEndCall }: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    // Define the event handlers with names
    const onCallStartHandler = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEndHandler = () => {
        setCallStatus(CallStatus.FINISHED);
        onEndCall?.(); 
    };
    const onMessageHandler = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setMessages((prev) => [...prev, { role: message.role, content: message.transcript }]);
      }
    };
    const onErrorHandler = (error: any) => {
      console.error("Vapi Error Event:", error);
      setCallStatus(CallStatus.INACTIVE);
      onEndCall?.(); 
    };

    // Attach the named handlers
    vapi.on("call-start", onCallStartHandler);
    vapi.on("call-end", onCallEndHandler);
    vapi.on("message", onMessageHandler);
    vapi.on("error", onErrorHandler);

    // Return a cleanup function that removes the EXACT same handlers
    return () => {
      vapi.off("call-start", onCallStartHandler);
      vapi.off("call-end", onCallEndHandler);
      vapi.off("message", onMessageHandler);
      vapi.off("error", onErrorHandler);
    };
  }, [onEndCall]);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }
    // ... your feedback logic ...
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    
    // 1. First, ask the parent to request camera permission
    const permissionGranted = await onStartCall?.();
    
    // 2. Only proceed if permission was granted
    if (!permissionGranted) {
        console.log("Camera permission denied by user. Aborting call.");
        setCallStatus(CallStatus.INACTIVE); 
        return; 
    }

    // 3. Now that camera is on, start the Vapi call
    const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
    if (!workflowId) {
      console.error("FATAL: VAPI Workflow ID is not defined.");
      alert("Configuration Error: The Workflow ID is missing.");
      setCallStatus(CallStatus.INACTIVE);
      onEndCall?.();
      return;
    }
    
    try {
      if (type === "generate") {
        await vapi.start(workflowId, {
          variableValues: { username: userName, userid: userId },
        });
      } else {
        // ... other call type logic ...
      }
    } catch (error) {
        console.error("Error during vapi.start():", error);
        setCallStatus(CallStatus.INACTIVE);
        onEndCall?.();
    }
  };

  const handleDisconnect = () => {
    vapi.stop(); // This will trigger the 'call-end' event, which calls onEndCall
  };

  return (
    <>
      {messages.length > 0 && (
        <div className="w-full max-w-xl p-4 mb-6 bg-slate-800/50 rounded-lg text-center border border-slate-700">
          <p className={cn("transition-opacity duration-500", "animate-fadeIn opacity-100 text-lg")}>
            {lastMessage}
          </p>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            className="bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:bg-green-600 hover:shadow-green-500/30 disabled:opacity-50"
            onClick={handleCall}
            disabled={callStatus === CallStatus.CONNECTING}
          >
            {callStatus === CallStatus.CONNECTING ? "Connecting..." : "Call"}
          </button>
        ) : (
          <button
            className="bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:bg-red-700 hover:shadow-red-500/30"
            onClick={handleDisconnect}
          >
            End Call
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;