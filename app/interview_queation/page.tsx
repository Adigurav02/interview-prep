"use client";

import Link from "next/link";
import { Star } from "lucide-react"; // A popular icon library, or use your own star icon

// Data for all 9 feature cards, extracted from the image
const allFeatures = [
  {
    title: "Interview Questions",
    description: "Discover questions that matter. Boost your interview game.",
    bgColor: "bg-green-500/20",
    icon: "❓", // Placeholder Icon
  },
  {
    title: "Job Finder AI",
    description: "Find the perfect roles matched to your skills.",
    bgColor: "bg-blue-500/20",
    icon: "💼", // Placeholder Icon
  },
  {
    title: "Resume AI",
    description: "Turn your experience into interview-winning resumes.",
    bgColor: "bg-yellow-500/20",
    icon: "📄", // Placeholder Icon
  },
  {
    title: "Your 24/7 Career Guide",
    description: "Create standout LinkedIn profiles that recruiters notice.",
    bgColor: "bg-emerald-500/20",
    icon: "🌐", // Placeholder Icon
  },
  {
    title: "Resume Generator",
    description: "Create a resume that gets past bots and grabs recruiter attention.",
    bgColor: "bg-sky-500/20",
    icon: "📝", // Placeholder Icon
  },
  {
    title: "Interview Co-Pilot",
    description: "AI-powered real-time answer suggestions to help you crush your interviews.",
    bgColor: "bg-teal-500/20",
    icon: "📢", // Placeholder Icon
  },
  {
    title: "Auto Apply AI",
    description: "Find the perfect roles matched to your skills.",
    bgColor: "bg-red-500/20",
    icon: "🚀", // Placeholder Icon
  },
  {
    title: "Create Your Own Question AI",
    description: "Perfect your interview answers for tough questions.",
    bgColor: "bg-cyan-500/20",
    icon: "🤖", // Placeholder Icon
  },
  {
    title: "Study Plans",
    description: "Get structured prep that gets results.",
    bgColor: "bg-amber-500/20",
    icon: "📚", // Placeholder Icon
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* 
        This page assumes a main layout handles the Header. 
        If not, you can import and add your Header component here.
      */}
      <main className="p-6 md:p-10 max-w-7xl mx-auto">
        {/* --- Page Header --- */}
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Every tool you need to stop getting rejected.
          </h1>
          <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
            Instant access to 10+ powerful tools to prep faster and land interviews - just $29, one-time.
          </p>
        </section>

        {/* --- Features Grid Section --- */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((feature) => (
              <div key={feature.title} className="bg-gray-800/50 rounded-3xl p-1.5 border-2 border-dashed border-gray-700/50 cursor-pointer group">
                <div className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] rounded-2xl h-full flex flex-col transform transition-transform duration-300 group-hover:-translate-y-2">
                  {/* Image/Icon Header */}
                  <div className={`h-40 ${feature.bgColor} rounded-t-2xl flex items-center justify-center`}>
                    {/* ===> REPLACE THIS DIV with your <Image /> component <=== */}
                    <p className="text-6xl opacity-80">{feature.icon}</p>
                  </div>
                  
                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-white mb-2">{feature.title}</h2>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">{feature.description}</p>
                    <div className="flex items-center gap-1 text-green-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}