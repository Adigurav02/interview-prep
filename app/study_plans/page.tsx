"use client";

import { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronLeft, ChevronRight, Clock } from 'lucide-react';

// --- COMPREHENSIVE MOCK DATA (All plans you provided) ---
const studyPlans = [
    { title: "Data Analyst Comprehensive", duration: "1 Month", jobType: "Data Analyst", category: "Technical", description: "Launch your Data Analyst career in just 1 month with our comprehensive interview plan! Get ready to ace your interviews with essential strategies, expert tips, and hands-on practice that will set you apart from the competition." },
    { title: "Design Accelerated", duration: "1 Week", jobType: "Design", category: "Situational", description: "Dive into our 1-Week Design Interview Prep Plan, crafted to sharpen your creative skills and boost your confidence! Get ready to impress with targeted practice and expert insights designed specifically for budding designers." },
    { title: "Design Intensive", duration: "2 Weeks", jobType: "Design", category: "Situational", description: "Ready to land your dream design job? Our intensive 2-week interview prep plan is packed with techniques, tips, and practice sessions to help you showcase your creativity and ace that interview with confidence!" },
    { title: "Design Comprehensive", duration: "1 Month", jobType: "Design", category: "Situational", description: "Gear up for your design interview with our comprehensive 1-month preparation plan! Master essential skills, showcase your creativity, and walk into your interview with unparalleled confidence." },
    { title: "Design Mastery", duration: "2 Months", jobType: "Design", category: "Situational", description: "Ready to ace your design job interview? Our comprehensive 2-month preparation plan will have you honing your skills and showcasing your creativity with confidence!" },
    { title: "Finance Accelerated", duration: "1 Week", jobType: "Finance", category: "Technical", description: "Get ready to ace your finance interview in just one week! Our focused and comprehensive 7-day plan covers everything from fundamental concepts to advanced financial strategies, ensuring you're confident and ready for any question." },
    { title: "Finance Intensive", duration: "2 Weeks", jobType: "Finance", category: "Technical", description: "Dive into our dynamic 2-week finance interview preparation plan, meticulously designed to cover all key areas! Gear up to ace your interviews with in-depth modules, expert insights, and hands-on practice sessions." },
    { title: "Finance Comprehensive", duration: "1 Month", jobType: "Finance", category: "Technical", description: "Gear up for your dream finance role with our comprehensive 1-month interview plan! Dive into essential financial concepts, master problem-solving techniques, and ace your interviews with confidence." },
    { title: "Finance Mastery", duration: "2 Months", jobType: "Finance", category: "Technical", description: "Gear up for your finance career with our comprehensive 2-month interview prep plan! Dive into essential topics, hone your analytical skills, and ace your interviews with confidence and ease." },
    { title: "Frontend Software Engineer Accelerated", duration: "1 Week", jobType: "Frontend Software Engineer", category: "Technical", description: "Ready to ace that frontend software engineer interview? Our 1-week plan is your fast track to mastering the skills and knowledge you need to impress and secure your dream job!" },
    { title: "Frontend Software Engineer Intensive", duration: "2 Weeks", jobType: "Frontend Software Engineer", category: "Technical", description: "Gear up for your dream frontend software engineer role with our intensive 2-week interview prep plan! Dive into essential coding challenges, modern frameworks, and get ready to impress with your polished portfolio and confident interview skills." },
    { title: "Frontend Software Engineer Comprehensive", duration: "1 Month", jobType: "Frontend Software Engineer", category: "Technical", description: "Get ready to ace your Frontend Software Engineer interview in just 1 month! This comprehensive, engaging plan covers everything you need—from coding challenges to system design—boosting your confidence and skills every step of the way." },
    { title: "Frontend Software Engineer Mastery", duration: "2 Months", jobType: "Frontend Software Engineer", category: "Technical", description: "Dive into our 2-month Frontend Software Engineer interview plan to supercharge your career. Master the must-know skills and techniques to ace those interviews and land your dream job!" },
    { title: "Full Stack Software Engineer Accelerated", duration: "1 Week", jobType: "Full Stack Software Engineer", category: "Technical", description: "Get ready to ace your Full-Stack Software Engineer interview in just one week! Our comprehensive plan covers everything from front-end to back-end skills, ensuring you're fully prepared to impress." },
    { title: "Full Stack Software Engineer Intensive", duration: "2 Weeks", jobType: "Full Stack Software Engineer", category: "Technical", description: "Gear up for your Full-Stack Software Engineer interview with our power-packed 2-week plan! Dive deep into both front-end and back-end essentials, and ace that interview with confidence." },
    { title: "Full Stack Software Engineer Comprehensive", duration: "1 Month", jobType: "Full Stack Software Engineer", category: "Technical", description: "Get ready to ace your Full-Stack Software Engineer interview with our comprehensive 1-month plan! Dive into essential front-end and back-end topics, and build your confidence with mock interviews and coding challenges." },
    { title: "Full Stack Software Engineer Mastery", duration: "2 Months", jobType: "Full Stack Software Engineer", category: "Technical", description: "Gear up for your dream role with our intensive 2-month Full-stack Software Engineer interview prep! Dive into a comprehensive, engaging journey that sharpens your skills from front-end to back-end, ensuring you ace that interview with confidence." },
    { title: "Consulting Intensive", duration: "2 Weeks", jobType: "Consulting", category: "Problem Solving", description: "Get ready to ace your consulting interviews with our intensive 2-week preparation plan! Packed with insider tips, case studies, and practice questions, you'll gain the confidence to impress any firm." },
    { title: "Consulting Comprehensive", duration: "1 Month", jobType: "Consulting", category: "Problem Solving", description: "Master the art of consulting in just one month with our comprehensive interview prep plan! Equip yourself with key strategies, case study mastery, and confidence-boosting tactics to land your dream consulting job." },
    { title: "Customer Success Accelerated", duration: "1 Week", jobType: "Customer Success", category: "Behavioral", description: "Unlock your potential as a Customer Success superstar with our comprehensive 1-Week Interview Plan! Packed with key insights and actionable tips, this guide is your fast track to acing the interview and landing your dream role." },
    { title: "Customer Success Intensive", duration: "2 Weeks", jobType: "Customer Success", category: "Behavioral", description: "Amp up your confidence and skills with our 2-week Customer Success interview prep plan! Get ready to shine and impress with focused strategies, expert tips, and real-world practice scenarios designed just for you." },
    { title: "Customer Success Comprehensive", duration: "1 Month", jobType: "Customer Success", category: "Behavioral", description: "Unlock your potential with our 1-Month Customer Success Interview Plan! Get ready to impress with in-depth prep, tailored strategies, and all the tools you need to ace your interviews and land your dream role." },
    { title: "Customer Success Mastery", duration: "2 Months", jobType: "Customer Success", category: "Behavioral", description: "Elevate your career in Customer Success with our comprehensive 2-month interview prep plan! Master essential skills, ace every question, and get ready to shine in your next big opportunity." },
    { title: "Cybersecurity Accelerated", duration: "1 Week", jobType: "Cybersecurity", category: "Technical", description: "Gear up for your cybersecurity dream job with our intensive 1-week interview prep plan! Dive deep into key topics and ace your interview with confidence and expertise." },
    { title: "Cybersecurity Intensive", duration: "2 Weeks", jobType: "Cybersecurity", category: "Technical", description: "Get ready to conquer your cybersecurity interview in just 2 weeks! Our comprehensive plan covers everything from fundamental principles to advanced techniques, ensuring you're fully prepared to impress and secure your dream job." },
    { title: "Cybersecurity Comprehensive", duration: "1 Month", jobType: "Cybersecurity", category: "Technical", description: "Gear up for your dream cybersecurity job with our intensive 1-month interview prep plan! Dive deep into essential security concepts, hands-on challenges, and expert strategies to ace your interview and secure your spot in the cybersecurity field." },
    { title: "Cybersecurity Mastery", duration: "2 Months", jobType: "Cybersecurity", category: "Technical", description: "Get ready to conquer the world of cybersecurity with our dynamic 2-month interview preparation plan! Packed with essential topics and hands-on practice, you'll be fully equipped to ace your cybersecurity interview and land your dream job." },
    { title: "Data Analyst Accelerated", duration: "1 Week", jobType: "Data Analyst", category: "Technical", description: "Get ready to ace your Data Analyst interview in just one week! Our engaging and comprehensive plan covers everything from data wrangling to visualization, ensuring you're fully prepared to impress your future employer." },
    { title: "Data Analyst Intensive", duration: "2 Weeks", jobType: "Data Analyst", category: "Technical", description: "Get ready to ace that Data Analyst interview in just 2 weeks! This engaging, fast-paced plan ensures you're fully prepared with comprehensive insights and hands-on practice to impress any employer." },
    { title: "Data Analyst Mastery", duration: "2 Months", jobType: "Data Analyst", category: "Technical", description: "Get ready to ace your Data Analyst interview in just 2 months! Dive into our comprehensive and exciting plan packed with essential skills, practice questions, and expert tips to land your dream job." },
    { title: "General Accelerated", duration: "1 Week", jobType: "General", category: "Behavioral", description: "Get ready to shine with our 1-week interview prep plan for a general job role! Dive into expertly tailored modules that boost your confidence and help you ace that interview." },
    { title: "General Intensive", duration: "2 Weeks", jobType: "General", category: "Behavioral", description: "Get ready to ace your next job interview with our comprehensive 2-week plan designed for any profession! Packed with essential tips and detailed practice sessions, this schedule is your key to confidence and success." },
    { title: "General Comprehensive", duration: "1 Month", jobType: "General", category: "Behavioral", description: "Get ready to ace your interviews with our comprehensive 1-month general job preparation plan! From mastering common questions to perfecting your pitch, we've got everything you need to succeed." },
    { title: "General Mastery", duration: "2 Months", jobType: "General", category: "Behavioral", description: "Gear up for success with our 2-month general interview prep plan! Hone your skills, boost your confidence, and get ready to nail that interview with comprehensive guidance and practical tips every step of the way." },
    { title: "Human Resources Accelerated", duration: "1 Week", jobType: "Human Resources", category: "Behavioral", description: "Ready to dive into the exciting world of HR? Our dynamic 1-week interview prep plan empowers you to ace your HR job interview with confidence and finesse!" },
    { title: "Human Resources Intensive", duration: "2 Weeks", jobType: "Human Resources", category: "Behavioral", description: "Jumpstart your HR career with our 2-week interview preparation plan! Master key HR concepts, interview techniques, and boost your confidence to ace your next interview!" },
    { title: "Human Resources Comprehensive", duration: "1 Month", jobType: "Human Resources", category: "Behavioral", description: "Boost your HR career in just one month with our targeted interview plan! Prepare to impress with expert tips, key strategies, and mock interviews tailored for success." },
    { title: "Human Resources Mastery", duration: "2 Months", jobType: "Human Resources", category: "Behavioral", description: "Get ready to ace your HR interview with our comprehensive 2-month preparation plan! Dive into key topics, expert tips, and mock interviews to boost your confidence and land your dream role in Human Resources." },
    { title: "Management Accelerated", duration: "1 Week", jobType: "Management", category: "Situational", description: "Get ready to ace your management interview in just one week! This focused and efficient plan will equip you with key insights, powerful answers, and the confidence you need to impress your future employers." },
    { title: "Management Intensive", duration: "2 Weeks", jobType: "Management", category: "Situational", description: "Get ready to level up your leadership skills with our intensive 2-week management interview prep plan! Packed with expert tips, practice scenarios, and strategic insights, you'll walk into your interview with confidence and charm." },
    { title: "Management Comprehensive", duration: "1 Month", jobType: "Management", category: "Situational", description: "Get ready to ace your management interview with our comprehensive 1-month prep plan! This energizing guide will equip you with the skills and confidence you need to impress and secure that leadership role." },
    { title: "Management Mastery", duration: "2 Months", jobType: "Management", category: "Situational", description: "Gear up for success with our 2-month Management Interview Plan! This comprehensive guide will empower you with the skills and confidence needed to ace your interview and land that dream management role." },
    { title: "Marketing Accelerated", duration: "1 Week", jobType: "Marketing", category: "Behavioral", description: "Get ready to shine in your marketing interview with our comprehensive 1-week prep plan! Master crucial concepts, sharpen your skills, and walk confidently into your dream marketing role." },
    { title: "Marketing Intensive", duration: "2 Weeks", jobType: "Marketing", category: "Behavioral", description: "Get ready to conquer your marketing interview in just 2 weeks! Our curated plan covers everything from strategy to analytics, ensuring you're fully prepared and confident to impress your future employer." },
    { title: "Marketing Mastery", duration: "2 Months", jobType: "Marketing", category: "Behavioral", description: "Get ready to ace your marketing interview with our comprehensive 2-month prep plan! Dive into key strategies, killer campaigns, and essential skills to stand out and secure your dream job." },
    { title: "Operations Accelerated", duration: "1 Week", jobType: "Operations", category: "Situational", description: "Get ready to ace your operations interview in just one week! Our comprehensive guide covers all the essentials to ensure you're fully prepared and confident for your big day." },
    { title: "Operations Intensive", duration: "2 Weeks", jobType: "Operations", category: "Situational", description: "Get ready to excel in your operations interview with our 2-week prep plan! Dive into key strategies and essential skills to confidently tackle any question that comes your way." },
    { title: "Operations Comprehensive", duration: "1 Month", jobType: "Operations", category: "Situational", description: "Gear up for success in just one month with our dynamic Operations interview preparation plan! This comprehensive guide is designed to sharpen your skills and boost your confidence for landing that dream role in operations." },
    { title: "Operations Mastery", duration: "2 Months", jobType: "Operations", category: "Situational", description: "Get ready to excel in your Operations interview with our comprehensive 2-month preparation plan! Packed with insights and strategies, this plan will guide you to success with confidence and ease." },
    { title: "Product Management Accelerated", duration: "1 Week", jobType: "Product Management", category: "Problem Solving", description: "Gear up for your dream product management role with our intensive 1-week interview prep plan! This engaging, rapid-fire guide will help you master the key skills and strategies to ace your interviews with confidence and flair." },
    { title: "Product Management Intensive", duration: "2 Weeks", jobType: "Product Management", category: "Problem Solving", description: "Ace your next product management interview with our comprehensive 2-week prep plan! Dive into essential skills, strategic thinking, and real-world scenarios to boost your confidence and secure your dream role." },
    { title: "Product Management Comprehensive", duration: "1 Month", jobType: "Product Management", category: "Problem Solving", description: "Jumpstart your product management career with our 1-month prep plan! Equip yourself with essential skills, ace your interviews, and land your dream job with confidence." },
    { title: "Product Management Mastery", duration: "2 Months", jobType: "Product Management", category: "Problem Solving", description: "Gear up for your dream product management role with our comprehensive 2-month interview plan! Dive into key concepts, real-world scenarios, and expert tips that will help you stand out from the competition and ace your interview!" },
    { title: "Program Management Accelerated", duration: "1 Week", jobType: "Program Management", category: "Situational", description: "Get ready to excel in your Program Management interviews with our comprehensive 1-week prep plan! Dive into key strategies and essential skills to showcase your leadership and project management prowess." },
    { title: "Program Management Intensive", duration: "2 Weeks", jobType: "Program Management", category: "Situational", description: "Get ready to ace your Program Management interview with our intensive 2-week prep plan! Dive deep into key strategies, master essential skills, and boost your confidence for the big day." },
    { title: "Program Management Comprehensive", duration: "1 Month", jobType: "Program Management", category: "Situational", description: "Get ready to ace that program management interview with our power-packed 1-month prep plan! Dive into essential skills, real-world scenarios, and expert tips to land your dream role with confidence." },
    { title: "Program Management Mastery", duration: "2 Months", jobType: "Program Management", category: "Situational", description: "Get ready to ace your program management interview with our comprehensive 2-month prep plan! Dive into essential topics, sharpen your skills, and boost your confidence to land that dream role." },
    { title: "Project Management Accelerated", duration: "1 Week", jobType: "Project Management", category: "Situational", description: "Dive into our 1-Week Project Management interview plan designed to help you ace your next role! Filled with key insights, practice questions, and expert tips, this plan ensures you're fully prepared to impress from day one." },
    { title: "Project Management Intensive", duration: "2 Weeks", jobType: "Project Management", category: "Situational", description: "Get ready to ace your project management interview with our intensive 2-week preparation plan! Dive into essential PM skills, mock interviews, and insider tips to boost your confidence and land your dream job!" },
    { title: "Project Management Comprehensive", duration: "1 Month", jobType: "Project Management", category: "Situational", description: "Get ready to master your project management interview in just one month! This dynamic plan covers everything you need to know, from methodology to leadership skills, ensuring you're fully prepared for success." },
    { title: "Project Management Mastery", duration: "2 Months", jobType: "Project Management", category: "Situational", description: "Ready to ace your project management interview? Our 2-month comprehensive plan is packed with insights and strategies to help you shine with confidence and secure that dream role!" },
    { title: "Public Relations Accelerated", duration: "1 Week", jobType: "Public Relations", category: "Behavioral", description: "Get ready to shine in your public relations interview with our power-packed 1-week plan! Master key strategies, build your confidence, and walk in with the poise of a PR superstar!" },
    { title: "Public Relations Intensive", duration: "2 Weeks", jobType: "Public Relations", category: "Behavioral", description: "Ready to shine in Public Relations? Our 2-Week Interview Plan is your roadmap to mastering PR tactics, acing interviews, and landing that dream job with confidence and flair!" },
    { title: "Public Relations Comprehensive", duration: "1 Month", jobType: "Public Relations", category: "Behavioral", description: "Get ready to shine with our 1-month Public Relations interview plan! Dive into essential strategies, tips, and mock questions that will have you confidently stepping into your dream PR role." },
    { title: "Public Relations Mastery", duration: "2 Months", jobType: "Public Relations", category: "Behavioral", description: "Get ready to ace your public relations interview with our comprehensive 2-month prep plan! From mastering media relations to honing your storytelling skills, this plan has everything you need to shine and secure that PR dream job." },
    { title: "Quality Assurance Accelerated", duration: "1 Week", jobType: "Quality Assurance", category: "Technical", description: "Gear up for a stellar career in quality assurance with our 1-week interview prep plan! Master essential QA concepts and ace your interview with confidence." },
    { title: "Quality Assurance Intensive", duration: "2 Weeks", jobType: "Quality Assurance", category: "Technical", description: "Gear up for your Quality Assurance career with our intensive 2-week interview preparation plan! Master the key concepts, ace your interviews, and wow your future employers with your stellar QA skills." },
    { title: "Quality Assurance Comprehensive", duration: "1 Month", jobType: "Quality Assurance", category: "Technical", description: "Gear up for your Quality Assurance role with our comprehensive 1-month interview plan! Dive into practical QA concepts, real-world scenarios, and master the skills to stand out in your interviews!" },
    { title: "Quality Assurance Mastery", duration: "2 Months", jobType: "Quality Assurance", category: "Technical", description: "Get ready to elevate your quality assurance skills with this comprehensive 2-month interview prep plan! Packed with expert insights and essential techniques, you'll be fully prepared to impress your future employers." },
    { title: "Recruiting Accelerated", duration: "1 Week", jobType: "Recruiting", category: "Behavioral", description: "Get ready to land your dream job in recruiting with our intensive 1-week interview preparation plan! Master the key skills and techniques to impress any employer and confidently ace your interview." },
    { title: "Recruiting Intensive", duration: "2 Weeks", jobType: "Recruiting", category: "Behavioral", description: "Get ready to ace your recruiting interview with our comprehensive 2-week plan! Filled with key strategies and insights, this guide will boost your confidence and set you on the path to success." },
    { title: "Recruiting Comprehensive", duration: "1 Month", jobType: "Recruiting", category: "Behavioral", description: "Get ready to ace your recruiting interview in just 1 month! This comprehensive plan ensures you're fully prepared to impress with confidence, from understanding key recruitment metrics to mastering your pitch." },
    { title: "Recruiting Mastery", duration: "2 Months", jobType: "Recruiting", category: "Behavioral", description: "Dive into our 2-month comprehensive recruiting interview plan to master the art of spotting top talent! Equip yourself with cutting-edge strategies and ace those interviews with confidence." },
    { title: "Sales Accelerated", duration: "1 Week", jobType: "Sales", category: "Behavioral", description: "Get ready to close the deal with our intensive 1-week Sales interview prep plan! Master key strategies and boost your confidence to ace every question and make a stellar impression." },
    { title: "Sales Intensive", duration: "2 Weeks", jobType: "Sales", category: "Behavioral", description: "Gear up for the ultimate sales interview prep in just 2 weeks! Dive into our dynamic plan to sharpen your pitch, master negotiation tactics, and land that dream job." },
    { title: "Sales Comprehensive", duration: "1 Month", jobType: "Sales", category: "Behavioral", description: "Get ready to ace your sales interview with our comprehensive 1-month preparation plan! This plan covers everything from mastering sales techniques to perfecting your pitch, ensuring you walk into the interview with confidence and poise." },
    { title: "Sales Mastery", duration: "2 Months", jobType: "Sales", category: "Behavioral", description: "Ready to ace your sales interview? Our dynamic 2-month plan is packed with powerful techniques and insider tips to help you shine and secure that dream role!" },
    { title: "Behavioral Intensive", duration: "2 Weeks", jobType: "General", category: "Behavioral", description: "Ready to shine in your next interview? Our 2-week Behavioral Interview Plan will equip you with the strategies and confidence to ace any behavioral question with ease and poise. Let's make those answers memorable!" },
];


// --- Static lists for filters ---
const allJobTypes = [ "Sales", "Marketing", "Business Analyst", "Operations", "Product Management", "Customer Success", "Data Analyst", "Software Engineering", "Project Management", "Consulting", "Program Management", "Management", "Backend Software Engineer", "Full Stack Software Engineer", "Frontend Software Engineer", "Design", "General", "Human Resources", "Administrative", "Recruiting", "Public Relations", "Quality Assurance", "Cybersecurity", "Finance"];
const allCategories = ["Behavioral", "Technical", "Situational", "Problem Solving"];
const allPlanLengths = ["1 Week", "2 Weeks", "1 Month", "2 Months"];

// Helper to get color based on duration
const getDurationClass = (duration: string) => {
  if (duration.includes("Week")) return "bg-blue-100 text-blue-800 border-blue-200";
  if (duration.includes("Month")) return "bg-red-100 text-red-800 border-red-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
};

// Reusable component for a collapsible filter section
const FilterSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-lg font-semibold text-gray-900 mb-4">
                {title}
                <ChevronUp className={`transform transition-transform duration-200 ${!isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            {isOpen && <div className="space-y-3">{children}</div>}
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
    const pageNumbers = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) { pageNumbers.push(i); }
    } else {
        pageNumbers.push(1);
        if (currentPage > 3) pageNumbers.push('...');
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);
        if (currentPage <= 3) { startPage = 2; endPage = 4; }
        if (currentPage >= totalPages - 2) { startPage = totalPages - 3; endPage = totalPages - 1; }
        for (let i = startPage; i <= endPage; i++) { pageNumbers.push(i); }
        if (currentPage < totalPages - 2) pageNumbers.push('...');
        pageNumbers.push(totalPages);
    }

    return (
        <nav className="flex justify-center items-center gap-2 mt-12">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 border border-gray-300 rounded-md disabled:opacity-50">
                <ChevronLeft size={20} />
            </button>
            {pageNumbers.map((num, index) => 
                typeof num === 'number' ? (
                    <button 
                        key={index} 
                        onClick={() => onPageChange(num)}
                        className={`px-4 py-2 text-sm font-semibold border rounded-md transition-colors ${currentPage === num ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/30' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                    >
                        {num}
                    </button>
                ) : ( <span key={index} className="px-4 py-2 text-sm text-gray-500">...</span> )
            )}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 border border-gray-300 rounded-md disabled:opacity-50">
                <ChevronRight size={20} />
            </button>
        </nav>
    );
};


export default function StudyPlansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlanLengths, setSelectedPlanLengths] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 10;

  const handleFilterChange = (filterType: 'jobType' | 'category' | 'planLength', value: string) => {
    const setters = {
      jobType: setSelectedJobTypes,
      category: setSelectedCategories,
      planLength: setSelectedPlanLengths,
    };
    const states = {
      jobType: selectedJobTypes,
      category: selectedCategories,
      planLength: selectedPlanLengths,
    };
    
    const setter = setters[filterType];
    const state = states[filterType];

    setter(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
    setCurrentPage(1);
  };

  const filteredPlans = useMemo(() => {
    return studyPlans.filter(plan => {
      const matchesSearch = searchTerm === '' || plan.title.toLowerCase().includes(searchTerm.toLowerCase()) || plan.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(plan.jobType);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(plan.category);
      const matchesPlanLength = selectedPlanLengths.length === 0 || selectedPlanLengths.includes(plan.duration);
      return matchesSearch && matchesJobType && matchesCategory && matchesPlanLength;
    });
  }, [searchTerm, selectedJobTypes, selectedCategories, selectedPlanLengths]);
  
  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);

  return (
    <div className="bg-white min-h-screen text-gray-800">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="text-left mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Your Personalized Interview Prep Roadmap</h1>
          <p className="mt-4 text-lg text-gray-600">Stop random prep. Get a focused study plan based on your role, timeline, and target company.</p>
        </div>

        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Popular: Software, Design, Sales, etc." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" />
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          <aside className="w-full md:w-1/3 lg:w-1/4">
            <div className="space-y-8">
                <FilterSection title="Job Type">
                    {allJobTypes.map(jobType => (
                        <label key={jobType} className="flex items-center text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={selectedJobTypes.includes(jobType)} onChange={() => handleFilterChange('jobType', jobType)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                            <span className="ml-3">{jobType}</span>
                        </label>
                    ))}
                </FilterSection>
                <FilterSection title="Category">
                    {allCategories.map(category => (
                        <label key={category} className="flex items-center text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleFilterChange('category', category)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                            <span className="ml-3">{category}</span>
                        </label>
                    ))}
                </FilterSection>
                <FilterSection title="Plan Length">
                    {allPlanLengths.map(length => (
                        <label key={length} className="flex items-center text-gray-700 cursor-pointer">
                            <input type="checkbox" checked={selectedPlanLengths.includes(length)} onChange={() => handleFilterChange('planLength', length)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                            <span className="ml-3">{length}</span>
                        </label>
                    ))}
                </FilterSection>
            </div>
          </aside>

          <div className="w-full md:w-2/3 lg:w-3/4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Study Plans</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentPlans.length > 0 ? (
                currentPlans.map(plan => (
                  <div key={plan.title} className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
                    <div>
                      <span className={`inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full border ${getDurationClass(plan.duration)}`}>
                        <Clock size={14} />
                        {plan.duration}
                      </span>
                      <h3 className={`font-bold text-lg mt-3 ${plan.duration.includes("Week") ? 'text-blue-700' : 'text-red-700'}`}>{plan.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                    </div>
                    <button className={`text-sm font-semibold mt-4 text-right ${plan.duration.includes("Week") ? 'text-blue-600 hover:text-blue-800' : 'text-red-600 hover:text-red-800'}`}>
                        Practice this plan →
                    </button>
                  </div>
                ))
              ) : (
                <div className="lg:col-span-2 text-center bg-gray-50 p-12 rounded-lg border-2 border-dashed border-gray-200">
                    <Search size={32} className="mx-auto text-gray-400" />
                    <p className="mt-4 font-semibold text-gray-700">No Study Plans Found</p>
                    <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </div>
            
            {totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}