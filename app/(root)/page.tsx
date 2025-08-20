"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ChevronDown } from "lucide-react"; 

import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";

// An attractive modal component for the profile (Kept dark for contrast as an overlay)
const ProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] text-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
        <div className="flex flex-col items-center">
          <Image
            src={user.imageUrl || "/default-avatar.png"}
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full border-4 border-purple-400 shadow-lg"
          />
          <h2 className="text-3xl font-bold text-yellow-300 mt-4">{user.name}</h2>
          <p className="text-gray-400">{user.email}</p>
        </div>
        <div className="mt-6">
          <p className="font-semibold text-pink-400 text-lg">Your Progress:</p>
          <div className="bg-gray-700 p-4 rounded-lg mt-2">
            <p className="text-gray-300">
              Interviews Taken:{" "}
              <span className="font-bold text-green-400">{user.interviewsTaken || 0}</span>
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Data for all 9 feature cards with corrected links and dark-theme colors
const allFeatures = [
  { title: "Interview Questions", description: "Discover questions that matter. Boost your interview game.", bgColor: "bg-green-900/20", iconColor: "text-green-400", icon: "❓", href: "/interview_question" },
  { title: "Job Finder AI", description: "Find the perfect roles matched to your skills.", bgColor: "bg-blue-900/20", iconColor: "text-blue-400", icon: "💼", href: "/job_finder_ai" }, 
  { title: "Resume AI", description: "Turn your experience into interview-winning resumes.", bgColor: "bg-yellow-900/20", iconColor: "text-yellow-400", icon: "📄", href: "/resume_ai" }, 
  { title: "Your 24/7 Career Guide", description: "Create standout LinkedIn profiles that recruiters notice.", bgColor: "bg-teal-900/20", iconColor: "text-teal-400", icon: "🌐", href: "/career-guide" },
  { title: "Resume Generator", description: "Create a resume that gets past bots and grabs recruiter attention.", bgColor: "bg-sky-900/20", iconColor: "text-sky-400", icon: "📝", href: null },
  { title: "Interview Co-Pilot", description: "AI-powered real-time answer suggestions to help you crush your interviews.", bgColor: "bg-pink-900/20", iconColor: "text-pink-400", icon: "📢", href: null },
  { 
  title: "Aptitude Test", description: "Assess your logical, numerical, and problem-solving skills to prepare for job opportunities.",bgColor: "bg-red-900/20", iconColor: "text-red-400", icon: "🧠", href: "/aptitude_test"}
,
  { title: "Create Your Own Question AI", description: "Perfect your interview answers for tough questions.", bgColor: "bg-indigo-900/20", iconColor: "text-indigo-400", icon: "🤖", href: "/create_question" },
  { title: "Study Plans", description: "Get structured prep that gets results.", bgColor: "bg-amber-900/20", iconColor: "text-amber-400", icon: "📚", href: "/study_plans" },
];

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getCurrentUser();
      setUser(userData);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-gray-300">
      <header className="bg-[#1e293b]/95 backdrop-blur-lg text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50 border-b border-slate-700/50">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-100">Prepwise Interview_Bot</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-400">
            <Link href="/interview_question" className="hover:text-white transition-colors">Interview Questions</Link>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              Interview AI Tools <ChevronDown size={16} />
            </button>
            <Link href="/study_plans" className="hover:text-white transition-colors">Study Plans</Link>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              Job Search Tools <ChevronDown size={16} />
            </button>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link> {/* <-- UPDATED LINK */}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button
                variant="outline"
                onClick={() => setShowProfile(true)}
                className="font-semibold text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white transition-all px-4"
              >
                Profile
              </Button>
              <Button onClick={handleLogout} className="bg-red-600 text-white font-semibold hover:bg-red-700 transition-all px-4">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="outline" className="font-semibold text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white transition-all px-4">Login</Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-green-500 text-white font-semibold hover:bg-green-600 px-4">Signup</Button>
              </Link>
            </>
          )}
        </div>
      </header>
      
      {showProfile && <ProfileModal user={user} onClose={() => setShowProfile(false)} />}

      <main className="p-6 md:p-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white p-10 rounded-2xl shadow-2xl flex justify-between items-center max-sm:flex-col border border-slate-700">
          <div className="flex flex-col gap-6 max-w-xl">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-purple-400">
              Get Interview-Ready with AI-Powered Practice & Feedback
            </h2>
            <p className="text-xl text-slate-300">
              Go from nervous to confident. Our AI coach is here to help you nail your next interview.
            </p>
            <p className="text-lg text-slate-400">
              Practice with real interview questions tailored to your dream job and get instant, smart feedback. Our AI helps improve your clarity, confidence, and technical knowledge. Stop wondering how you did and start knowing.
            </p>
            <Button asChild className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-3 rounded-lg text-lg max-sm:w-full w-fit transform hover:scale-105 transition-transform">
              <Link href="/interview">Start an Interview</Link>
            </Button>
          </div>
          <Image
            src="/robot.png"
            alt="AI Robot preparing for an interview"
            width={400}
            height={400}
            className="max-sm:hidden animate-float"
          />
        </section>

        {/* All Features Section */}
        <section className="mt-16">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Every tool you need to stop getting rejected.
            </h2>
            <p className="text-lg text-slate-400 mt-4 max-w-3xl mx-auto">
              Instant access to 10+ powerful tools to prep faster and land interviews - just $29, one-time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((feature) => {
              const cardContent = (
                <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg h-full flex flex-col cursor-pointer group overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/50 hover:-translate-y-2">
                    <div className={`h-32 flex items-center justify-center ${feature.bgColor} rounded-b-xl`}>
                       <p className={`text-5xl ${feature.iconColor}`}>{feature.icon}</p>
                    </div>
                    <div className="p-6 flex flex-col flex-grow text-left">
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 flex-grow">{feature.description}</p>
                      <div className="flex items-center gap-1 text-green-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                </div>
              );

              return feature.href ? (
                <Link key={feature.title} href={feature.href}>
                  {cardContent}
                </Link>
              ) : (
                <div key={feature.title}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </section>

        {/* Demo Section */}
        <section className="flex flex-col gap-4 w-full mt-16">
          <h2 className="text-3xl font-bold text-yellow-400">See the Magic in Action</h2>
          <div className="mt-4 bg-slate-800 hover:bg-slate-700/50 transition-colors duration-300 p-8 rounded-lg shadow-md cursor-pointer group transform hover:-translate-y-1 border border-slate-700">
            <p className="text-xl font-medium text-white group-hover:text-yellow-300">
              Curious how an AI-based interview works? Watch our quick demo to see how our platform provides real-time guidance and feedback.
            </p>
            <div className="mt-4">
              <a
                href="https://youtu.be/eyI5WkbSckI?si=vkqQGd-n"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 font-semibold underline hover:text-blue-300 text-lg"
              >
                Watch Demo Interview
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}