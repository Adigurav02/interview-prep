import { getInterviewDetails } from "@/lib/actions/interview.action";
import { notFound } from "next/navigation";
import { CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import type { TranscriptMessage } from "@/types";

const FeedbackScoreCard = ({ title, score }: { title: string, score: number }) => (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 text-center">
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-4xl font-bold text-white mt-2">{score}<span className="text-2xl text-slate-400">%</span></p>
    </div>
);

export default async function FeedbackDetailsPage({ params }: { params: { interviewId: string } }) {
  const interview = await getInterviewDetails(params.interviewId);

  if (!interview) {
    notFound();
  }
  
  const { feedback, transcript, createdAt } = interview as any;

  return (
    <div className="min-h-screen bg-[#0e0f1a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <p className="text-slate-400 mb-2">{new Date(createdAt).toLocaleString()}</p>
        <h1 className="text-4xl font-extrabold text-white mb-8">Interview Feedback Report</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <FeedbackScoreCard title="Overall Score" score={feedback.overallScore} />
            <FeedbackScoreCard title="Clarity" score={feedback.clarity} />
            <FeedbackScoreCard title="Confidence" score={feedback.confidence} />
            <FeedbackScoreCard title="Relevance" score={feedback.relevance} />
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">AI Summary & Analysis</h2>
            <p className="text-slate-300 leading-relaxed mb-6">{feedback.summary}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="flex items-center gap-2 font-semibold text-green-400 mb-3"><CheckCircle size={20} /> Strengths</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-300">
                        {feedback.strengths.map((item: string, i: number) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
                <div>
                    <h3 className="flex items-center gap-2 font-semibold text-yellow-400 mb-3"><XCircle size={20} /> Areas for Improvement</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-300">
                        {feedback.areasForImprovement.map((item: string, i: number) => <li key={i}>{item}</li>)}
                    </ul>
                </div>
            </div>
        </div>

        <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-4"><MessageSquare size={24}/> Full Interview Transcript</h2>
            <div className="space-y-4 bg-slate-800/50 border border-slate-700 rounded-lg p-6 max-h-96 overflow-y-auto">
              {transcript.map((msg: TranscriptMessage, index: number) => (
                  <div key={index} className={`flex items-start gap-3 ${msg.speaker === 'user' ? 'justify-end' : ''}`}>
                      {msg.speaker === 'ai' && <div className="w-8 h-8 rounded-full bg-purple-500/20 flex-shrink-0 flex items-center justify-center font-bold text-purple-400">AI</div>}
                      <div className={`max-w-md p-3 rounded-lg ${msg.speaker === 'ai' ? 'bg-slate-800 text-slate-300' : 'bg-green-500/20 text-green-300'}`}>
                          <p>{msg.text}</p>
                      </div>
                  </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}