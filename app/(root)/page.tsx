"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ChevronDown, Sparkles, FileText, Briefcase, MessageSquarePlus, Zap, FileScan, Mail, Library, FilePlus2, Twitter, Linkedin, Youtube, Instagram } from "lucide-react"; 

import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";

// ================================================================= //
// /// *** MOCK DATABASE FUNCTION *** ///
// ================================================================= //
const getUserProgressFromDB = async (userId: string) => {
  console.log(`Fetching progress for user: ${userId}`);
  return {
    interviewsAttempted: 5,
    interviewsCompleted: 2,
    resumeDrafts: 1,
    resumeATSImproved: true,
    resumeFinalized: false,
    aptitudeTestsCompleted: 4,
    aptitudeAverageScore: 82,
    technicalChallengesSolved: 15,
    loginCount: 21,
  };
};

// ================================================================= //
// /// *** PROFILE MODAL COMPONENT (FULLY FUNCTIONAL) *** ///
// ================================================================= //
const ProfileModal = ({ user, userProgress, onClose }) => {
  if (!user || !userProgress) return null;

  const interviewsProgress = (userProgress.interviewsAttempted > 0) 
    ? (userProgress.interviewsCompleted / userProgress.interviewsAttempted) * 100 
    : 0;
  
  const resumeProgress = (userProgress.resumeDrafts * 33) + (userProgress.resumeATSImproved ? 33 : 0) + (userProgress.resumeFinalized ? 34 : 0);
  const aptitudeProgress = userProgress.aptitudeAverageScore;
  const technicalProgress = (userProgress.technicalChallengesSolved / 50) * 100;
  const overallProgress = (interviewsProgress * 0.4) + (resumeProgress * 0.2) + (aptitudeProgress * 0.2) + (technicalProgress * 0.2);
  const loginCount = userProgress.loginCount;

  const ProgressBar = ({ label, percentage, colorClasses }) => (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-300">{label}</span>
        <span className={`text-sm font-bold ${colorClasses.text}`}>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div className={`bg-gradient-to-r ${colorClasses.gradient} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] text-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center">
          <Image 
            src={user.imageUrl || "/images/image.png"} 
            alt="Profile Picture" 
            width={100} 
            height={100} 
            className="rounded-full border-4 border-purple-400 shadow-lg object-cover w-[100px] h-[100px]" 
          />
          <h2 className="text-3xl font-bold text-yellow-400 mt-4">{user.name || "Guest User"}</h2>
          <p className="text-gray-400">{user.email || "no-email@example.com"}</p>
          <p className="text-sm text-slate-400 mt-1">Total Logins: {loginCount}</p>
        </div>
        
        <div className="mt-8">
          <p className="font-semibold text-pink-400 text-lg mb-4">Your Progress:</p>
          <div className="space-y-5">
            <ProgressBar label="Interviews" percentage={interviewsProgress} colorClasses={{ text: 'text-blue-400', gradient: 'from-blue-400 to-cyan-400' }} />
            <ProgressBar label="Resume" percentage={resumeProgress} colorClasses={{ text: 'text-green-400', gradient: 'from-green-400 to-teal-400' }} />
            <ProgressBar label="Aptitude" percentage={aptitudeProgress} colorClasses={{ text: 'text-purple-400', gradient: 'from-purple-400 to-pink-400' }} />
            <ProgressBar label="Technical Skills" percentage={technicalProgress} colorClasses={{ text: 'text-orange-400', gradient: 'from-orange-400 to-yellow-400' }} />
          </div>
        </div>

        <div className="mt-10 mb-8 border-t border-slate-700 pt-6 text-center">
            <p className="font-bold text-xl text-yellow-400">Overall Progress</p>
            <div className="relative h-32 w-32 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90 18 18)">
                    <path className="text-slate-700" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-yellow-400 transition-all duration-500 ease-out" strokeWidth="4" strokeDasharray={`${overallProgress}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{Math.round(overallProgress)}%</span>
                </div>
            </div>
        </div>

        <button onClick={onClose} className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-3 rounded-full font-bold text-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 mt-4">
          Close
        </button>
      </div>
    </div>
  );
};

// --- (Constants and Footer Component) ---
const allFeatures = [
  { title: "Interview Questions", description: "Discover questions that matter. Boost your interview game.", bgColor: "bg-green-900/20", iconColor: "text-green-400", icon: "❓", href: "/interview_question" },
  { title: "Job Finder AI", description: "Find the perfect roles matched to your skills.", bgColor: "bg-blue-900/20", iconColor: "text-blue-400", icon: "💼", href: "/job_finder_ai" }, 
  { title: "Resume AI", description: "Turn your experience into interview-winning resumes.", bgColor: "bg-yellow-900/20", iconColor: "text-yellow-400", icon: "📄", href: "/resume_ai" }, 
  { title: "Your 24/7 Career Guide", description: "Create standout LinkedIn profiles that recruiters notice.", bgColor: "bg-teal-900/20", iconColor: "text-teal-400", icon: "🌐", href: "/career-guide" },
  { title: "Resume Generator", description: "Create a resume that gets past bots and grabs recruiter attention.", bgColor: "bg-sky-900/20", iconColor: "text-sky-400", icon: "📝", href: "/resume-generator" },
  { title: "Technical Challenge Hub", description: "Sharpen your skills for technical rounds. Practice common algorithm and data structure problems in a live coding environment.", bgColor: "bg-pink-900/20", iconColor: "text-pink-400", icon: "‍🧑‍💻", href: "/technical-hub" },
  { title: "Aptitude Test", description: "Assess your logical, numerical, and problem-solving skills.", bgColor: "bg-red-900/20", iconColor: "text-red-400", icon: "🧠", href: "/aptitude_test"},
  { title: "Friend Challenge", description: "Perfect your interview answers for tough questions.", bgColor: "bg-indigo-900/20", iconColor: "text-indigo-400", icon: "🤖", href: "/friend-challenge" },
  { title: "Study Plans", description: "Get structured prep that gets results.", bgColor: "bg-amber-900/20", iconColor: "text-amber-400", icon: "📚", href: "/study_plans" },
];

const Footer = () => {
    return (
        <footer className="bg-[#1e293b] text-slate-400 border-t border-slate-700/50 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex flex-col gap-4">
                    <Link href="/" className="font-bold text-xl text-white">Prepwise Interview</Link>
                    <p className="text-sm">Get interview-ready with AI-powered practice and feedback.</p>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/interview_question" className="hover:text-white transition-colors">Interview Questions</Link></li>
                        <li><Link href="/study_plans" className="hover:text-white transition-colors">Study Plans</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                        <li><Link href="/aptitude_test" className="hover:text-white transition-colors">Aptitude Test</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-4">Tools</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/resume_ai" className="hover:text-white transition-colors">Resume AI</Link></li>
                        <li><Link href="/job_finder_ai" className="hover:text-white transition-colors">Job Finder AI</Link></li>
                        <li><Link href="/co-pilot" className="hover:text-white transition-colors">Interview Co-Pilot</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-6 border-t border-slate-700/50 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Prepwise. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [userProgress, setUserProgress] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getCurrentUser();
      setUser(userData);

      if (userData) {
        const progressData = await getUserProgressFromDB(userData.id);
        setUserProgress(progressData);
      }
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
      {/* --- THIS IS THE UPDATED HEADER SECTION --- */}
      <header className="bg-[#1e293b]/95 backdrop-blur-lg text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50 border-b border-slate-700/50">
        {/* Left Section: Logo */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-100">Prepwise Interview</h1>
          </Link>
        </div>
        
        {/* Center Section: Navigation */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm font-semibold text-gray-400">
          <Link href="/interview_question" className="hover:text-white transition-colors">Interview Questions</Link>
          <Link href="/study_plans" className="hover:text-white transition-colors">Study Plans</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        </nav>
        
        {/* Right Section: Auth Buttons */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {user ? (
            <>
              <Button variant="outline" onClick={() => setShowProfile(true)} className="font-semibold text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white transition-all px-4">Profile</Button>
              <Button onClick={handleLogout} className="bg-red-600 text-white font-semibold hover:bg-red-700 transition-all px-4">Logout</Button>
            </>
          ) : (
            <>
              <Link href="/sign-in"><Button variant="outline" className="font-semibold text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white transition-all px-4">Login</Button></Link>
              <Link href="/sign-up"><Button className="bg-green-500 text-white font-semibold hover:bg-green-600 px-4">Signup</Button></Link>
            </>
          )}
        </div>
      </header>
      
      {showProfile && <ProfileModal user={user} userProgress={userProgress} onClose={() => setShowProfile(false)} />}

      <main className="p-6 md:p-10 max-w-7xl mx-auto">
        <section className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white p-10 rounded-2xl shadow-2xl flex justify-between items-center max-sm:flex-col border border-slate-700">
          <div className="flex flex-col gap-6 max-w-xl">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-purple-400">Get Interview-Ready with AI-Powered Practice & Feedback</h2>
            <p className="text-xl text-slate-300">Go from nervous to confident. Our AI coach is here to help you nail your next interview.</p>
            <p className="text-lg text-slate-400">Practice with real interview questions tailored to your dream job and get instant, smart feedback. Our AI helps improve your clarity, confidence, and technical knowledge. Stop wondering how you did and start knowing.</p>
            <Button asChild className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-3 rounded-lg text-lg max-sm:w-full w-fit transform hover:scale-105 transition-transform"><Link href="/interview">Start an Interview</Link></Button>
          </div>
          <Image src="/robot.png" alt="AI Robot preparing for an interview" width={400} height={400} className="max-sm:hidden animate-float" />
        </section>

        <section className="mt-16">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">Every tool you need to stop getting rejected.</h2>
            <p className="text-lg text-slate-400 mt-4 max-w-3xl mx-auto">Instant access to 10+ powerful tools to prep faster and land interviews...!</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((feature) => {
              const cardContent = (
                <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-lg h-full flex flex-col cursor-pointer group overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/50 hover:-translate-y-2">
                    <div className={`h-32 flex items-center justify-center ${feature.bgColor} rounded-b-xl`}><p className={`text-5xl ${feature.iconColor}`}>{feature.icon}</p></div>
                    <div className="p-6 flex flex-col flex-grow text-left">
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-slate-400 text-sm mb-4 flex-grow">{feature.description}</p>
                      <div className="flex items-center gap-1 text-green-400">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5" fill="currentColor" />))}</div>
                    </div>
                </div>
              );
              return feature.href ? (<Link key={feature.title} href={feature.href}>{cardContent}</Link>) : (<div key={feature.title}>{cardContent}</div>);
            })}
          </div>
        </section>

        <section className="mt-20 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Why Prepwise AI?</h2>
          <p className="text-lg text-slate-400 mt-4 max-w-3xl mx-auto">
              Go beyond generic advice. Get personalized, data-driven feedback that turns interviews into job offers.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 transform transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center bg-purple-900/30 rounded-full mb-4">
                      <Sparkles className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Instant AI Feedback</h3>
                  <p className="text-slate-400 mt-2">Get real-time analysis on your answers, body language, and speech patterns to build confidence.</p>
              </div>
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 transform transition-all duration-300 hover:-translate-y-2 hover:border-green-500/50">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center bg-green-900/30 rounded-full mb-4">
                      <FileText className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Industry-Specific Questions</h3>
                  <p className="text-slate-400 mt-2">Practice with a massive library of questions tailored to your target role and industry.</p>
              </div>
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 transform transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500/50">
                  <div className="mx-auto w-16 h-16 flex items-center justify-center bg-yellow-900/30 rounded-full mb-4">
                      <Zap className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Track Your Improvement</h3>
                  <p className="text-slate-400 mt-2">Our detailed analytics show you exactly where you're excelling and what to focus on next.</p>
              </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 w-full mt-16">
          <h2 className="text-3xl font-bold text-yellow-400">See the Magic in Action</h2>
          <div className="mt-4 bg-slate-800 hover:bg-slate-700/50 transition-colors duration-300 p-8 rounded-lg shadow-md cursor-pointer group transform hover:-translate-y-1 border border-slate-700">
            <p className="text-xl font-medium text-white group-hover:text-yellow-300">Curious how an AI-based interview works? Watch our quick demo to see how our platform provides real-time guidance and feedback.</p>
            <div className="mt-4"><a href="https://youtu.be/eyI5WkbSckI?si=vkqQGd-n" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-semibold underline hover:text-blue-300 text-lg">Watch Demo Interview</a></div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}