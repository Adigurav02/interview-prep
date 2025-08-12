"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react"; // <-- Import the Star icon

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser, signOut } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";

// An attractive modal component for the profile
const ProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] text-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4 transform transition-all duration-300 scale-100">
        <div className="flex flex-col items-center">
          <Image
            src={user.imageUrl || "/default-avatar.png"} // Fallback to a default avatar
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
            {/* You can add more stats here */}
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


export default function HomePage() {
  const [user, setUser] = useState<any>(null);
  const [userInterviews, setUserInterviews] = useState<any[]>([]);
  const [allInterview, setAllInterview] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getCurrentUser();
      setUser(userData);

      if (userData?.id) {
        const [userInterviewList, latestInterviewList] = await Promise.all([
          getInterviewsByUserId(userData.id),
          getLatestInterviews({ userId: userData.id }),
        ]);

        setUserInterviews(userInterviewList || []);
        setAllInterview(latestInterviewList || []);
      }
    };



    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  };

  const dummyInterviews = [
    {
      id: "1",
      role: "Frontend Developer",
      type: "Technical",
      techstack: "React, HTML, CSS, JavaScript",
      description: "Test your skills in building responsive and dynamic UIs.",
    },
    {
      id: "2",
      role: "Backend Developer",
      type: "Technical",
      techstack: "Node.js, Express, MongoDB",
      description: "Evaluate your backend logic, API design, and database knowledge.",
    },
    {
      id: "3",
      role: "Python Developer",
      type: "Technical",
      techstack: "Python, Flask, Django",
      description: "Focus on Python programming skills and backend frameworks.",
    },
    {
      id: "4",
      role: "Full Stack Developer",
      type: "Technical",
      techstack: "React, Node.js, MongoDB",
      description: "Comprehensive test covering both frontend and backend abilities.",
    },
    {
      id: "5",
      role: "Data Analyst",
      type: "Technical",
      techstack: "Excel, SQL, Python, PowerBI",
      description: "Check your data wrangling, analytics, and visualization skills.",
    },
    {
      id: "6",
      role: "Java Developer",
      type: "Technical",
      techstack: "Java, Spring Boot, Hibernate",
      description: "Challenge your Java programming and backend architecture skills.",
    },
    {
      id: "7",
      role: "AI/ML Engineer",
      type: "Technical",
      techstack: "Python, TensorFlow, PyTorch",
      description: "Assess your machine learning and deep learning expertise.",
    },
    {
      id: "8",
      role: "DevOps Engineer",
      type: "Technical",
      techstack: "Docker, Kubernetes, AWS",
      description: "Test your CI/CD, containerization, and deployment knowledge.",
    },
    {
      id: "9",
      role: "UI/UX Designer",
      type: "Creative",
      techstack: "Figma, Adobe XD, Sketch",
      description: "Assess your user-centered design and prototyping skills.",
    },
    {
      id: "10",
      role: "Mobile App Developer",
      type: "Technical",
      techstack: "Flutter, React Native, Swift, Kotlin",
      description: "Evaluate your ability to build performant mobile applications.",
    },
  ];

  const displayedInterviews = allInterview?.length > 0 ? allInterview : dummyInterviews;
  const interviewsToShow = showMore ? displayedInterviews : displayedInterviews.slice(0, 5);

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-40">
        <div>
          <h1 className="text-2xl font-extrabold text-purple-300 tracking-wider">Interview Preparations</h1>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button
                variant="outline"
                onClick={() => setShowProfile(true)}
                className="text-white border-purple-400 hover:bg-purple-400 hover:text-black transition-all"
              >
                Profile
              </Button>
              <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 transition-all">
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-green-500 hover:bg-green-600 transition-all">Login</Button>
            </Link>
          )}
        </div>
      </header>

      {/* Profile Modal */}
      {showProfile && <ProfileModal user={user} onClose={() => setShowProfile(false)} />}

      <main className="p-6">
        {/* Hero Section */}
        <section className="card-cta bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-10 rounded-xl shadow-xl flex justify-between items-center max-sm:flex-col">
          <div className="flex flex-col gap-6 max-w-xl">
            <h2 className="text-4xl font-bold text-purple-300">
              Get Interview-Ready with AI-Powered Practice & Feedback
            </h2>
            <p className="text-xl text-gray-300">
              Go from nervous to confident. Our AI coach is here to help you nail your next interview.
            </p>
            <p className="text-lg text-gray-400">
              Practice with real interview questions tailored to your dream job and get instant, smart feedback. Our AI helps improve your clarity, confidence, and technical knowledge. Stop wondering how you did and start knowing.
            </p>
            <Button asChild className="bg-green-400 hover:bg-green-500 text-black font-semibold px-6 py-3 rounded-md max-sm:w-full w-fit transform hover:scale-105 transition-transform">
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

        {/* Your Interviews & Take Interviews */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10 text-white">
          <div>
            <h2 className="text-2xl font-semibold text-pink-400 mb-2">Pick Up Where You Left Off</h2>
            <p className="text-gray-400 mb-4">
              Welcome back! Review your past performance, track your progress, and see how much you've grown.
            </p>
            <div className="interviews-section">
              {userInterviews.length > 0 ? (
                userInterviews.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    userId={user?.id}
                    interviewId={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={interview.createdAt}
                  />
                ))
              ) : (
                 <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-gray-400">You haven't taken any interviews yet.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-purple-400 mb-2">Find Your Next Challenge</h2>
            <p className="text-gray-400 mb-4">
              Ready to test your skills? Each interview is a new opportunity to learn and get valuable feedback.
            </p>
            <div className="interviews-section">
              {allInterview.length > 0 ? (
                allInterview.map((interview) => (
                  <InterviewCard
                    key={interview.id}
                    userId={user?.id}
                    interviewId={interview.id}
                    role={interview.role}
                    type={interview.type}
                    techstack={interview.techstack}
                    createdAt={interview.createdAt}
                  />
                ))
              ) : (
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-gray-400">No new interviews available right now.</p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* ============================= */}
        {/* ===== ALL FEATURES SECTION ===== */}
        {/* ============================= */}
        <section className="mt-16 text-white">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white">
              Every tool you need to stop getting rejected.
            </h2>
            <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
              Instant access to 10+ powerful tools to prep faster and land interviews - just $29, one-time.
            </p>
          </div>

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


        {/* All Interviews Section with Show More */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-green-400 mb-2">Explore Every Opportunity</h2>
          <p className="text-gray-400 mb-4">
             Browse our extensive library of practice sessions. The more you practice, the more prepared you'll be.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {interviewsToShow.map((interview) => (
              <div
                key={interview.id}
                className="bg-gradient-to-br from-[#1e1e2f] to-[#2a2a40] text-white rounded-lg p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-blue-300 mb-2">{interview.role}</h3>
                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-medium text-white">Type:</span> {interview.type}
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-medium text-white">Tech Stack:</span> {interview.techstack}
                </p>
                <p className="text-xs text-gray-400 italic">{interview.description}</p>
              </div>
            ))}
          </div>

          {displayedInterviews.length > 5 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowMore(!showMore)}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
              >
                {showMore ? "Show Less" : "Show More Interviews"}
              </button>
            </div>
          )}
        </section>

        {/* Demo Section */}
        <section className="flex flex-col gap-4 w-full mt-10 text-white">
          <h2 className="text-2xl font-semibold text-yellow-400">See the Magic in Action</h2>
          <div className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300 p-6 rounded-lg shadow-md cursor-pointer group transform hover:-translate-y-1">
            <p className="text-lg font-medium text-white group-hover:text-yellow-300">
              Curious how an AI-based interview works? Watch our quick demo to see how Prepwise provides real-time guidance and feedback.
            </p>
            <div className="mt-4">
              <a
                href="https://youtu.be/eyI5WkbSckI?si=vkq6S-TXkzQQGd-n"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300 text-sm font-semibold"
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