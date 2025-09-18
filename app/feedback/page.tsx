import { Suspense } from 'react';
import Link from 'next/link';
import { Clock, BarChart2, ChevronRight } from "lucide-react";
import { getInterviewHistory } from "@/lib/actions/interview.action";

const FeedbackListSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div><div className="h-4 bg-slate-700 rounded w-48 mb-3"></div><div className="h-7 bg-slate-700 rounded w-64"></div></div>
          <div className="flex items-center gap-4">
            <div className="text-center"><div className="h-3 bg-slate-700 rounded w-12 mx-auto"></div><div className="h-6 bg-slate-700 rounded w-8 mx-auto mt-2"></div></div>
            <div className="text-center"><div className="h-3 bg-slate-700 rounded w-16 mx-auto"></div><div className="h-6 bg-slate-700 rounded w-8 mx-auto mt-2"></div></div>
            <ChevronRight size={24} className="text-slate-700" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

async function FeedbackList() {
  const interviews = await getInterviewHistory();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (interviews.length === 0) {
    return (
      <div className="text-center py-20 mt-8 border-2 border-dashed border-slate-700 rounded-xl">
        <BarChart2 size={48} className="mx-auto text-slate-500" />
        <h3 className="mt-4 text-xl font-semibold text-white">No Interviews Yet</h3>
        <p className="text-slate-400 mt-2">Your feedback reports will appear here after you complete an interview.</p>
        <Link href="/root/interview">
          <button className="mt-6 bg-purple-500 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-purple-600 transition-transform hover:scale-105">
            Start Your First Interview
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {interviews.map((interview: any) => (
        <Link
          href={`/feedback/${interview.id}`}
          key={interview.id}
          className="block bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-800 hover:border-purple-500/50 transition-all group"
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Clock size={16} />
                <span>{new Date(interview.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                 <div className={`w-3 h-3 rounded-full ${getScoreColor(interview.feedback.overallScore).replace('text-','bg-')}`}></div>
                <h2 className="text-xl font-bold text-white">Overall Score: {interview.feedback.overallScore}%</h2>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="text-center">
                  <p className="text-xs text-slate-400">Clarity</p>
                  <p className="font-semibold text-lg text-white">{interview.feedback.clarity}%</p>
               </div>
               <div className="text-center">
                  <p className="text-xs text-slate-400">Confidence</p>
                  <p className="font-semibold text-lg text-white">{interview.feedback.confidence}%</p>
               </div>
               <ChevronRight size={24} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function FeedbackHistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0f1a] to-[#101018] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-white">Interview History</h1>
            <p className="text-slate-400 mt-2">Review your past interviews and track your progress over time.</p>
        </div>
        <Suspense fallback={<FeedbackListSkeleton />}>
          <FeedbackList />
        </Suspense>
      </div>
    </div>
  );
}