"use server";

import { auth, db } from "@/firebase/admin";
import { getCurrentUser } from "./auth.action";
import type { TranscriptMessage } from "@/types";
import { Timestamp } from "firebase-admin/firestore";

// NOTE: We are removing the OpenAI dependency here because we will parse the Vapi feedback directly.

export async function saveInterviewFeedback(params: {
  transcript: TranscriptMessage[];
}) {
  const { transcript } = params;
  const user = await getCurrentUser();

  if (!user) {
    return { success: false, message: "User not authenticated." };
  }

  try {
    // Combine the entire transcript into one string to search for the feedback JSON
    const fullTranscriptText = transcript
      .map(msg => msg.text)
      .join(' ');

    // THE FIX: Use a regular expression to reliably find and capture the JSON object.
    // This looks for "FEEDBACK_JSON:", allows for any whitespace, and captures everything from the opening '{' to the closing '}'.
    const feedbackRegex = /FEEDBACK_JSON:\s*({.*})/;
    const match = fullTranscriptText.match(feedbackRegex);

    // SCENARIO 1: The feedback JSON was not found in the transcript.
    if (!match || !match[1]) {
      console.error("Parsing Error: 'FEEDBACK_JSON:' marker not found or JSON object is malformed.");
      throw new Error("Feedback JSON marker not found in the transcript.");
    }

    // Extract the clean JSON string from the regex match.
    const jsonString = match[1];
    
    // Parse the extracted JSON string into an object.
    const extractedFeedback = JSON.parse(jsonString);

    const interviewData = {
      userId: user.id,
      userName: user.name,
      createdAt: new Date(),
      transcript,
      feedback: extractedFeedback, // Save the REAL feedback
    };

    const docRef = await db.collection("interviews").add(interviewData);
    return { success: true, message: "Interview saved successfully.", interviewId: docRef.id };

  } catch (error: any) {
    console.error("CRITICAL: Failed to parse or save interview feedback.", error);
    
    // SCENARIO 2: Fallback if parsing fails or something else goes wrong.
    const errorFeedback = {
      overallScore: 0, clarity: 0, confidence: 0, relevance: 0,
      summary: "There was an error generating a detailed analysis for this session. Your transcript has been saved and can be reviewed below.",
      strengths: ["Transcript saved successfully."],
      areasForImprovement: ["The AI's final feedback was in an unexpected format. Please check the Vapi Assistant's system prompt."],
    };
    
    const interviewData = {
      userId: user.id, userName: user.name, createdAt: new Date(),
      transcript, feedback: errorFeedback,
    };
    const docRef = await db.collection("interviews").add(interviewData);
    return { success: true, message: "Could not parse AI feedback, but saved transcript.", interviewId: docRef.id };
  }
}

// These functions are already correct and do not need changes.
export async function getInterviewHistory() {
  const user = await getCurrentUser();
  if (!user) return [];
  try {
    const snapshot = await db.collection("interviews").where("userId", "==", user.id).orderBy("createdAt", "desc").get();
    return snapshot.docs.map(doc => { const data = doc.data(); return { id: doc.id, ...data, createdAt: (data.createdAt as Timestamp).toDate().toISOString() }; });
  } catch (error) { console.error("Error fetching interview history:", error); return []; }
}

export async function getInterviewDetails(interviewId: string) {
    const user = await getCurrentUser();
    if (!user) return null;
    try {
        const doc = await db.collection("interviews").doc(interviewId).get();
        const data = doc.data();
        if (!doc.exists || data?.userId !== user.id) return null;
        return { id: doc.id, ...data, createdAt: (data.createdAt as Timestamp).toDate().toISOString() };
    } catch (error) { console.error("Error fetching interview details:", error); return null; }
}