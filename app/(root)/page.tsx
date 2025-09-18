"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star, ChevronDown, Sparkles, FileText, Briefcase, MessageSquarePlus, Zap, FileScan, Mail, Library, FilePlus2, Twitter, Linkedin, Youtube, Instagram } from "lucide-react"; 

import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";

// ================================================================= //
// /// *** PROFILE MODAL COMPONENT (NOW ACCEPTS DYNAMIC PROGRESS) *** ///
// ================================================================= //
const ProfileModal = ({ user, userProgress, onClose }) => {
  // If user data is not yet loaded, don't render anything.
  if (!user) return null;

  // --- Calculations are now based on the userProgress prop ---
  const questionProgress = (userProgress.totalQuestions > 0) 
    ? (userProgress.questionsAnswered / userProgress.totalQuestions) * 100 
    : 0;
  const interviewProgress = (userProgress.totalInterviews > 0) 
    ? (userProgress.interviewsTaken / userProgress.totalInterviews) * 100 
    : 0;
  const aptitudeProgress = userProgress.aptitudeScore;
  const overallProgress = (questionProgress + interviewProgress + aptitudeProgress) / 3;

  // Reusable progress bar component (no changes needed here)
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
      <div className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] text-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 transform transition-all duration-300">
        <div className="flex flex-col items-center">
          {/* 
            CORRECTED SECTION FOR USER INFO:
            This part correctly displays the user's data. 
            The `user.name` and `user.email` are fetched from your `getCurrentUser` function.
            The fallbacks ('Guest User', 'no-email@example.com') are for when a user isn't logged in.
          */}
          <Image 
            src={user.imageUrl || "/images/image.png"} 
            alt="Profile Picture" 
            width={100} 
            height={100} 
            className="rounded-full border-4 border-purple-400 shadow-lg object-cover w-[100px] h-[100px]" 
          />
          <h2 className="text-3xl font-bold text-yellow-400 mt-4">{user.name || "Guest User"}</h2>
          <p className="text-gray-400">{user.email || "no-email@example.com"}</p>
        </div>
        
        <div className="mt-8">
          <p className="font-semibold text-pink-400 text-lg mb-4">Your Progress:</p>
          <div className="space-y-5">
            <ProgressBar label="Questions" percentage={questionProgress} colorClasses={{ text: 'text-green-400', gradient: 'from-green-400 to-teal-400' }} />
            <ProgressBar label="Interviews" percentage={interviewProgress} colorClasses={{ text: 'text-blue-400', gradient: 'from-blue-400 to-cyan-400' }} />
            <ProgressBar label="Aptitude" percentage={aptitudeProgress} colorClasses={{ text: 'text-purple-400', gradient: 'from-purple-400 to-pink-400' }} />
          </div>
        </div>

        <div className="mt-10 mb-8 border-t border-slate-700 pt-6 text-center">
            <p className="font-bold text-xl text-yellow-400">Overall Progress</p>
            <div className="relative h-32 w-32 mx-auto" >
                <svg className="w-full h-full" viewBox="0 0 36 36" transform="rotate(-90 18 18)">
                    <path
                        className="text-slate-700"
                        strokeWidth="4"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        className="text-yellow-400 transition-all duration-500 ease-out"
                        strokeWidth="4"
                        strokeDasharray={`${overallProgress > 0 ? overallProgress : 0.1}, 100`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white mt-[65px]">{Math.round(overallProgress)}%</span>
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


// --- (Keep all your existing constant arrays and the Footer component) ---
const allFeatures = [
  { title: "Interview Questions", description: "Discover questions that matter. Boost your interview game.", bgColor: "bg-green-900/20", iconColor: "text-green-400", icon: "❓", href: "/interview_question" },
  { title: "Job Finder AI", description: "Find the perfect roles matched to your skills.", bgColor: "bg-blue-900/20", iconColor: "text-blue-400", icon: "💼", href: "/job_finder_ai" }, 
  { title: "Resume AI", description: "Turn your experience into interview-winning resumes.", bgColor: "bg-yellow-900/20", iconColor: "text-yellow-400", icon: "📄", href: "/resume_ai" }, 
  { title: "Your 24/7 Career Guide", description: "Create standout LinkedIn profiles that recruiters notice.", bgColor: "bg-teal-900/20", iconColor: "text-teal-400", icon: "🌐", href: "/career-guide" },
  { title: "Resume Generator", description: "Create a resume that gets past bots and grabs recruiter attention.", bgColor: "bg-sky-900/20", iconColor: "text-sky-400", icon: "📝", href: "/resume-generator" },
  { title: "Technical Challenge Hub", description: "Sharpen your skills for technical rounds. Practice common algorithm and data structure problems in a live coding environment.", bgColor: "bg-pink-900/20", iconColor: "text-pink-400", icon: "‍🧑‍💻", href: "/technical-hub" },
  { title: "Aptitude Test", description: "Assess your logical, numerical, and problem-solving skills.", bgColor: "bg-red-900/20", iconColor: "text-red-400", icon: "🧠", href: "/aptitude_test"},
  { title: "Create Your Own Question AI", description: "Perfect your interview answers for tough questions.", bgColor: "bg-indigo-900/20", iconColor: "text-indigo-400", icon: "🤖", href: "/create_question" },
  { title: "Study Plans", description: "Get structured prep that gets results.", bgColor: "bg-amber-900/20", iconColor: "text-amber-400", icon: "📚", href: "/study_plans" },
];

const aiTools = [
  { icon: Sparkles, iconBgColor: "bg-emerald-500/10", iconColor: "text-emerald-400", title: "Interview GPT", description: "AI-powered coaching with real-world interview questions to keep you sharp and confident.", tag: "Beta", tagColor: "bg-blue-500 text-white", href: "/career-guide" },
  { icon: FileText, iconBgColor: "bg-blue-500/10", iconColor: "text-blue-400", title: "Resume AI", description: "Upload your resume and get the exact questions interviewers will ask about your experience.", tag: null, href: "/resume-ai" },
  { icon: Briefcase, iconBgColor: "bg-orange-500/10", iconColor: "text-orange-400", title: "Job AI", description: "Paste any job description to generate the most likely interview questions you'll face.", tag: null, href: "/job-finder-ai" },
  { icon: MessageSquarePlus, iconBgColor: "bg-purple-500/10", iconColor: "text-purple-400", title: "Create Your Own Question", description: "Customize your own practice set and get AI-powered coaching to master them with confidence.", tag: null, href: "/create-question" },
  { icon: Zap, iconBgColor: "bg-fuchsia-500/10", iconColor: "text-fuchsia-400", title: "Ask Away AI", description: "Get smart, strategic questions to impress interviewers and make sure the role fits you.", tag: "New", tagColor: "bg-blue-500 text-white", href: "#" },
];

const jobSearchTools = [
    { icon: FileScan, iconBgColor: "bg-red-500/10", iconColor: "text-red-400", title: "Resume Reviews", description: "Our AI analyzes your resume and gives actionable insights to help you land more interviews.", tag: "New", tagColor: "bg-blue-600 text-white", href: "#"},
    { icon: Mail, iconBgColor: "bg-emerald-500/10", iconColor: "text-emerald-400", title: "Cover Letter Generator", description: "Instantly create job-winning cover letters that match your resume and target the position you want.", tag: "New", tagColor: "bg-blue-600 text-white", href: "#"},
    { icon: Library, iconBgColor: "bg-blue-500/10", iconColor: "text-blue-400", title: "Cover Letter Templates", description: "Browse our collection of 10,000+ professional cover letter templates designed to help you land interviews.", tag: "New", tagColor: "bg-blue-600 text-white", href: "#"},
    { icon: FilePlus2, iconBgColor: "bg-green-500/10", iconColor: "text-green-400", title: "Resume Builder", description: "Generate a professional, ATS-friendly resume in minutes with expert suggestions and instant formatting.", tag: "Coming Soon", tagColor: "bg-slate-600 text-white", href: "#"},
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
  const [isAiToolsMenuOpen, setIsAiToolsMenuOpen] = useState(false);
  const [isJobToolsMenuOpen, setIsJobToolsMenuOpen] = useState(false);
  const router = useRouter();

  // ================================================================= //
  // /// *** STATE FOR DYNAMIC USER PROGRESS *** ///
  // ================================================================= //
  const [userProgress, setUserProgress] = useState({
    questionsAnswered: 0,
    totalQuestions: 200,
    interviewsTaken: 0,
    totalInterviews: 20,
    aptitudeScore: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      // This function fetches the user's identity (name, email, etc.)
      const userData = await getCurrentUser();
      setUser(userData);

      // --- IMPORTANT ---
      // In a real app, you would also fetch the user's progress from your database here
      // and update the progress state.
      // Example:
      // if (userData) {
      //   const progressData = await getUserProgress(userData.id);
      //   setUserProgress(progressData);
      // }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  };
  
  // --- Functions to simulate progress updates for testing ---
  const handleSolveQuestion = () => {
    setUserProgress(prev => ({
      ...prev,
      questionsAnswered: Math.min(prev.questionsAnswered + 10, prev.totalQuestions)
    }));
  };
  const handleTakeInterview = () => {
    setUserProgress(prev => ({
      ...prev,
      interviewsTaken: Math.min(prev.interviewsTaken + 1, prev.totalInterviews)
    }));
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-gray-300">
      <header className="bg-[#1e293b]/95 backdrop-blur-lg text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50 border-b border-slate-700/50">
      <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-100">Prepwise Interview</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-400">
            <Link href="/interview_question" className="hover:text-white transition-colors">Interview Questions</Link>
            <div className="relative" onMouseEnter={() => setIsAiToolsMenuOpen(true)} onMouseLeave={() => setIsAiToolsMenuOpen(false)}>
              <button className="flex items-center gap-1 hover:text-white transition-colors">Interview AI Tools <ChevronDown size={16} /></button>
              {isAiToolsMenuOpen && ( <div className="absolute top-full pt-3 w-80"><div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-2 text-left animate-fadeIn"><div className="space-y-1">{aiTools.map((tool) => ( <Link key={tool.title} href={tool.href} className="block p-3 rounded-lg hover:bg-slate-700"><div className="flex items-start gap-4"><div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg ${tool.iconBgColor}`}><tool.icon className={tool.iconColor} size={18} /></div><div><h3 className="font-bold text-base text-slate-200 flex items-center gap-2">{tool.title}{tool.tag && (<span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tool.tagColor}`}>{tool.tag}</span>)}</h3><p className="text-sm text-slate-400 mt-1">{tool.description}</p></div></div></Link> ))}</div></div></div> )}
            </div>
            <Link href="/study_plans" className="hover:text-white transition-colors">Study Plans</Link>
            <div className="relative" onMouseEnter={() => setIsJobToolsMenuOpen(true)} onMouseLeave={() => setIsJobToolsMenuOpen(false)}>
              <button className="flex items-center gap-1 hover:text-white transition-colors">Job Search Tools <ChevronDown size={16} /></button>
              {isJobToolsMenuOpen && ( <div className="absolute top-full pt-3 w-80"><div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700 p-2 text-left animate-fadeIn"><div className="space-y-1">{jobSearchTools.map((tool) => ( <Link key={tool.title} href={tool.href} className="block p-3 rounded-lg hover:bg-slate-700"><div className="flex items-start gap-4"><div className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg ${tool.iconBgColor}`}><tool.icon className={tool.iconColor} size={18} /></div><div><h3 className="font-bold text-base text-slate-200 flex items-center gap-2">{tool.title}{tool.tag && (<span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tool.tagColor}`}>{tool.tag}</span>)}</h3><p className="text-sm text-slate-400 mt-1">{tool.description}</p></div></div></Link> ))}</div></div></div> )}
            </div>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
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
      
      {/* Pass both the user info and their dynamic progress to the modal */}
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

        {/* This is a testing section to show that the progress bars are dynamic */}
        {/* ================================================================= // */}


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

        {/* /// *** WHY CHOOSE US SECTION *** /// */}
{/* ================================================================= // */}
<section className="mt-20 text-center">
    <h2 className="text-4xl md:text-5xl font-extrabold text-white">Why Prepwise AI?</h2>
    <p className="text-lg text-slate-400 mt-4 max-w-3xl mx-auto">
        Go beyond generic advice. Get personalized, data-driven feedback that turns interviews into job offers.
    </p>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature 1: AI-Powered Feedback */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 transform transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/50">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-purple-900/30 rounded-full mb-4">
                <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Instant AI Feedback</h3>
            <p className="text-slate-400 mt-2">Get real-time analysis on your answers, body language, and speech patterns to build confidence.</p>
        </div>
        {/* Feature 2: Tailored Questions */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 transform transition-all duration-300 hover:-translate-y-2 hover:border-green-500/50">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-green-900/30 rounded-full mb-4">
                <FileText className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Industry-Specific Questions</h3>
            <p className="text-slate-400 mt-2">Practice with a massive library of questions tailored to your target role and industry.</p>
        </div>
        {/* Feature 3: Progress Tracking */}
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