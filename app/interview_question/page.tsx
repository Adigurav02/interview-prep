"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Bookmark, ChevronLeft, ChevronRight, Mic } from "lucide-react";

// --- EXPANDED MOCK DATA with 105 questions for 11 pages ---
const mockQuestions = [
    { id: 1, text: "How do you define project scope?", difficulty: "Easy", category: "Technical", jobTypes: ["Program Management", "Project Management"], companyCount: 158, plan: "Free" },
    { id: 2, text: "Discuss the significance of 'Big O' notation in software development.", difficulty: "Easy", category: "Technical", jobTypes: ["Backend Software Engineer", "Full Stack Software Engineer"], companyCount: 167, plan: "Free" },
    { id: 3, text: "Difference between horizontal and vertical scaling", difficulty: "Medium", category: "Technical", jobTypes: ["Backend Software Engineer", "Full Stack Software Engineer"], companyCount: 120, plan: "Premium" },
    { id: 4, text: "How would you manage and integrate a newly acquired team post-merger?", difficulty: "Hard", category: "Problem Solving", jobTypes: ["Management"], companyCount: 97, plan: "Premium" },
    { id: 5, text: "Describe your approach to exit interviews.", difficulty: "Easy", category: "Behavioral", jobTypes: ["Human Resources"], companyCount: 194, plan: "Free" },
    { id: 6, text: "Example of negotiating between two teams", difficulty: "Hard", category: "Behavioral", jobTypes: ["Product Management", "Project Management", "Management"], companyCount: 32, plan: "Premium" },
    { id: 7, text: "How did you convey complex data to non-tech people", difficulty: "Hard", category: "Situational", jobTypes: ["Data Analyst", "Product Management", "Consulting"], companyCount: 194, plan: "Premium" },
    { id: 8, text: "Explain your experience with design systems.", difficulty: "Easy", category: "Situational", jobTypes: ["Design"], companyCount: 194, plan: "Free" },
    { id: 9, text: "Navigating HR management challenges in a scaling startup", difficulty: "Medium", category: "Situational", jobTypes: ["Human Resources"], companyCount: 5, plan: "Free" },
    { id: 10, text: "How do you determine whether to outsource business functions?", difficulty: "Hard", category: "Problem Solving", jobTypes: ["Business Analyst"], companyCount: 35, plan: "Premium" },
    { id: 11, text: "What are the steps to handle a suspected APT attack?", difficulty: "Hard", category: "Technical", jobTypes: ["Cybersecurity"], companyCount: 117, plan: "Premium" },
    { id: 12, text: "Explain the key components of a financial statement", difficulty: "Easy", category: "Technical", jobTypes: ["Finance"], companyCount: 103, plan: "Free" },
    { id: 13, text: "What criteria would you use to decide which positions to cut during layoffs?", difficulty: "Medium", category: "Problem Solving", jobTypes: ["Business Analyst", "Consulting", "Management"], companyCount: 43, plan: "Premium" },
    { id: 14, text: "Favorite fitness product and strategy for user drop-off", difficulty: "Hard", category: "Problem Solving", jobTypes: ["Product Management", "Business Analyst"], companyCount: 43, plan: "Premium" },
    { id: 15, text: "What is your process for designing a new feature?", difficulty: "Medium", category: "Situational", jobTypes: ["UX/UI Designer", "Product Management"], companyCount: 210, plan: "Free" },
    { id: 16, text: "How do you handle a disagreement with your manager?", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 500, plan: "Free" },
    { id: 17, text: "Explain the concept of RESTful APIs.", difficulty: "Medium", category: "Technical", jobTypes: ["Backend Software Engineer", "Full Stack Software Engineer"], companyCount: 180, plan: "Premium" },
    { id: 18, text: "Describe a time you failed and what you learned from it.", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 600, plan: "Free" },
    { id: 19, text: "How would you design a URL shortening service like TinyURL?", difficulty: "Hard", category: "System Design", jobTypes: ["Backend Software Engineer", "Full Stack Software Engineer"], companyCount: 150, plan: "Premium" },
    { id: 20, text: "What are the differences between SQL and NoSQL databases?", difficulty: "Medium", category: "Technical", jobTypes: ["Data Scientist", "Backend Software Engineer"], companyCount: 130, plan: "Premium" },
    { id: 21, text: "How do you stay updated with the latest industry trends?", difficulty: "Easy", category: "Situational", jobTypes: ["All"], companyCount: 450, plan: "Free" },
    { id: 22, text: "Walk me through your resume.", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 1000, plan: "Free" },
    { id: 23, text: "Design a system for a real-time multiplayer game.", difficulty: "Hard", category: "System Design", jobTypes: ["Game Developer", "Backend Software Engineer"], companyCount: 80, plan: "Premium"},
    { id: 24, text: "How do you ensure code quality in your team?", difficulty: "Medium", category: "Technical", jobTypes: ["Software Engineer", "Management"], companyCount: 110, plan: "Premium"},
    { id: 25, text: "What's your strategy for marketing a new mobile app?", difficulty: "Medium", category: "Problem Solving", jobTypes: ["Marketing Manager"], companyCount: 60, plan: "Premium"},
    { id: 26, text: "Explain the SOLID principles of object-oriented design.", difficulty: "Medium", category: "Technical", jobTypes: ["Software Engineer"], companyCount: 220, plan: "Premium"},
    { id: 27, text: "How would you improve our company's product?", difficulty: "Medium", category: "Problem Solving", jobTypes: ["Product Management"], companyCount: 300, plan: "Free"},
    { id: 28, text: "Describe a complex project you managed from start to finish.", difficulty: "Medium", category: "Behavioral", jobTypes: ["Project Management", "Program Management"], companyCount: 150, plan: "Premium"},
    { id: 29, text: "What is the role of a CDN in web performance?", difficulty: "Easy", category: "Technical", jobTypes: ["Frontend Software Engineer", "DevOps Engineer"], companyCount: 190, plan: "Free"},
    { id: 30, text: "How do you handle tight deadlines and pressure?", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 550, plan: "Free"},
    { id: 31, text: "What is A/B testing and how would you apply it?", difficulty: "Medium", category: "Technical", jobTypes: ["Data Scientist", "Product Management", "Marketing Manager"], companyCount: 250, plan: "Premium"},
    { id: 32, text: "Design a recommendation engine for an e-commerce site.", difficulty: "Hard", category: "System Design", jobTypes: ["Data Scientist", "Backend Software Engineer"], companyCount: 130, plan: "Premium"},
    { id: 33, text: "How do you prioritize tasks in a fast-paced environment?", difficulty: "Easy", category: "Situational", jobTypes: ["All"], companyCount: 480, plan: "Free"},
    { id: 34, text: "What is containerization and why is it important?", difficulty: "Medium", category: "Technical", jobTypes: ["DevOps Engineer", "Backend Software Engineer"], companyCount: 160, plan: "Premium"},
    { id: 35, text: "Describe a time you had to persuade a stakeholder.", difficulty: "Medium", category: "Behavioral", jobTypes: ["All"], companyCount: 320, plan: "Premium"},
    { id: 36, text: "What is the difference between a process and a thread?", difficulty: "Medium", category: "Technical", jobTypes: ["Software Engineer"], companyCount: 210, plan: "Premium"},
    { id: 37, text: "How would you test a new feature before launch?", difficulty: "Easy", category: "Technical", jobTypes: ["Quality Assurance", "Software Engineer"], companyCount: 170, plan: "Free"},
    { id: 38, text: "Explain the CAP theorem.", difficulty: "Hard", category: "Technical", jobTypes: ["Backend Software Engineer", "System Design"], companyCount: 90, plan: "Premium"},
    { id: 39, text: "Tell me about a time you worked in a team.", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 700, plan: "Free"},
    { id: 40, text: "How do you approach learning a new technology?", difficulty: "Easy", category: "Situational", jobTypes: ["All"], companyCount: 400, plan: "Free"},
    { id: 41, text: "Design a distributed caching system.", difficulty: "Hard", category: "System Design", jobTypes: ["Backend Software Engineer", "DevOps Engineer"], companyCount: 110, plan: "Premium" },
    { id: 42, text: "How do you gather requirements from stakeholders?", difficulty: "Medium", category: "Situational", jobTypes: ["Business Analyst", "Product Management"], companyCount: 140, plan: "Premium" },
    { id: 43, text: "Explain the concept of database indexing.", difficulty: "Medium", category: "Technical", jobTypes: ["Data Scientist", "Backend Software Engineer"], companyCount: 180, plan: "Premium" },
    { id: 44, text: "Describe a situation where you had to give difficult feedback.", difficulty: "Medium", category: "Behavioral", jobTypes: ["Management"], companyCount: 90, plan: "Premium" },
    { id: 45, text: "What is your experience with agile methodologies?", difficulty: "Easy", category: "Situational", jobTypes: ["Software Engineer", "Project Management"], companyCount: 300, plan: "Free" },
    { id: 46, text: "What are microservices and what are their pros and cons?", difficulty: "Medium", category: "Technical", jobTypes: ["Backend Software Engineer", "System Design"], companyCount: 160, plan: "Premium" },
    { id: 47, text: "How would you handle a security breach?", difficulty: "Hard", category: "Problem Solving", jobTypes: ["Cybersecurity", "DevOps Engineer"], companyCount: 70, plan: "Premium" },
    { id: 48, text: "Explain how DNS works.", difficulty: "Medium", category: "Technical", jobTypes: ["DevOps Engineer", "Backend Software Engineer"], companyCount: 120, plan: "Premium" },
    { id: 49, text: "What are your career goals for the next five years?", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 800, plan: "Free" },
    { id: 50, text: "How do you approach debugging a complex issue?", difficulty: "Medium", category: "Problem Solving", jobTypes: ["Software Engineer", "Quality Assurance"], companyCount: 200, plan: "Premium" },
    { id: 51, text: "What are WebSockets and when would you use them?", difficulty: "Medium", category: "Technical", jobTypes: ["Frontend Software Engineer", "Backend Software Engineer"], companyCount: 130, plan: "Premium" },
    { id: 52, text: "Describe a time you took initiative on a project.", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 450, plan: "Free" },
    { id: 53, text: "What's the difference between UI and UX?", difficulty: "Easy", category: "Technical", jobTypes: ["UX/UI Designer", "Product Management"], companyCount: 220, plan: "Free" },
    { id: 54, text: "How would you design a leaderboard system?", difficulty: "Hard", category: "System Design", jobTypes: ["Game Developer", "Backend Software Engineer"], companyCount: 95, plan: "Premium" },
    { id: 55, text: "What are CI/CD pipelines?", difficulty: "Medium", category: "Technical", jobTypes: ["DevOps Engineer", "Software Engineer"], companyCount: 190, plan: "Premium" },
    { id: 56, text: "How do you deal with ambiguity in a project?", difficulty: "Medium", category: "Situational", jobTypes: ["All"], companyCount: 350, plan: "Premium" },
    { id: 57, text: "What is a hash table and how does it work?", difficulty: "Medium", category: "Technical", jobTypes: ["Software Engineer"], companyCount: 250, plan: "Premium" },
    { id: 58, text: "Tell me about your proudest professional achievement.", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 650, plan: "Free" },
    { id: 59, text: "How would you build a search functionality for a website?", difficulty: "Hard", category: "System Design", jobTypes: ["Backend Software Engineer", "Full Stack Software Engineer"], companyCount: 140, plan: "Premium" },
    { id: 60, text: "Explain the importance of user research.", difficulty: "Easy", category: "Situational", jobTypes: ["UX/UI Designer", "Product Management"], companyCount: 180, plan: "Free" },
    { id: 61, text: "What is load balancing and why is it used?", difficulty: "Medium", category: "Technical", jobTypes: ["DevOps Engineer", "Backend Software Engineer"], companyCount: 170, plan: "Premium" },
    { id: 62, text: "Describe a conflict you had with a coworker and how you resolved it.", difficulty: "Medium", category: "Behavioral", jobTypes: ["All"], companyCount: 400, plan: "Premium" },
    { id: 63, text: "What are some common data structures?", difficulty: "Easy", category: "Technical", jobTypes: ["Software Engineer"], companyCount: 300, plan: "Free" },
    { id: 64, text: "How would you design an analytics platform?", difficulty: "Hard", category: "System Design", jobTypes: ["Data Scientist", "Backend Software Engineer"], companyCount: 120, plan: "Premium" },
    { id: 65, text: "What is your approach to code reviews?", difficulty: "Medium", category: "Situational", jobTypes: ["Software Engineer"], companyCount: 230, plan: "Premium" },
    { id: 66, text: "Why do you want to work for our company?", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 900, plan: "Free" },
    { id: 67, text: "Explain the difference between authentication and authorization.", difficulty: "Medium", category: "Technical", jobTypes: ["Cybersecurity", "Backend Software Engineer"], companyCount: 150, plan: "Premium" },
    { id: 68, text: "Tell me about a time you had to adapt to a major change.", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 520, plan: "Free" },
    { id: 69, text: "How would you design a spam detection system?", difficulty: "Hard", category: "System Design", jobTypes: ["Data Scientist", "Backend Software Engineer"], companyCount: 110, plan: "Premium" },
    { id: 70, text: "What are your salary expectations?", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 1200, plan: "Free" },
    { id: 71, text: "What is event-driven architecture?", difficulty: "Hard", category: "Technical", jobTypes: ["Backend Software Engineer", "System Design"], companyCount: 100, plan: "Premium" },
    { id: 72, text: "How do you handle constructive criticism?", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 480, plan: "Free" },
    { id: 73, text: "What is polymorphism in programming?", difficulty: "Medium", category: "Technical", jobTypes: ["Software Engineer"], companyCount: 200, plan: "Premium" },
    { id: 74, text: "How would you design a notification service?", difficulty: "Hard", category: "System Design", jobTypes: ["Backend Software Engineer", "Mobile Developer"], companyCount: 130, plan: "Premium" },
    { id: 75, text: "Describe your leadership style.", difficulty: "Medium", category: "Behavioral", jobTypes: ["Management"], companyCount: 150, plan: "Premium" },
    { id: 76, text: "What is the difference between TCP and UDP?", difficulty: "Medium", category: "Technical", jobTypes: ["DevOps Engineer", "Software Engineer"], companyCount: 140, plan: "Premium" },
    { id: 77, text: "What are your strengths and weaknesses?", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 1500, plan: "Free" },
    { id: 78, text: "How would you design a system to handle millions of users?", difficulty: "Hard", category: "System Design", jobTypes: ["Backend Software Engineer"], companyCount: 160, plan: "Premium" },
    { id: 79, text: "Explain what happens when you type a URL into your browser.", difficulty: "Medium", category: "Technical", jobTypes: ["Frontend Software Engineer", "Full Stack Software Engineer"], companyCount: 250, plan: "Premium" },
    { id: 80, text: "Tell me about a time you went above and beyond.", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 550, plan: "Free" },
    { id: 81, text: "What is machine learning, in simple terms?", difficulty: "Easy", category: "Technical", jobTypes: ["Data Scientist", "AI/ML Engineer"], companyCount: 180, plan: "Free" },
    { id: 82, text: "How do you manage your time and stay organized?", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 600, plan: "Free" },
    { id: 83, text: "What is a Docker container?", difficulty: "Medium", category: "Technical", jobTypes: ["DevOps Engineer"], companyCount: 170, plan: "Premium" },
    { id: 84, text: "Design a ticketing system like Ticketmaster.", difficulty: "Hard", category: "System Design", jobTypes: ["Backend Software Engineer", "Product Management"], companyCount: 120, plan: "Premium" },
    { id: 85, text: "Describe your ideal work environment.", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 750, plan: "Free" },
    { id: 86, text: "What are JavaScript Promises?", difficulty: "Medium", category: "Technical", jobTypes: ["Frontend Software Engineer"], companyCount: 210, plan: "Premium" },
    { id: 87, text: "How would you handle an underperforming team member?", difficulty: "Medium", category: "Situational", jobTypes: ["Management"], companyCount: 130, plan: "Premium" },
    { id: 88, text: "Explain the concept of sharding in databases.", difficulty: "Hard", category: "Technical", jobTypes: ["Backend Software Engineer", "Data Scientist"], companyCount: 90, plan: "Premium" },
    { id: 89, text: "What motivates you?", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 950, plan: "Free" },
    { id: 90, text: "How do you ensure your work is user-centric?", difficulty: "Medium", category: "Situational", jobTypes: ["UX/UI Designer", "Product Management"], companyCount: 160, plan: "Premium" },
    { id: 91, text: "What is Kubernetes?", difficulty: "Hard", category: "Technical", jobTypes: ["DevOps Engineer"], companyCount: 140, plan: "Premium" },
    { id: 92, text: "Tell me about a time you had to learn something quickly.", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 500, plan: "Free" },
    { id: 93, text: "What is the difference between `let`, `const`, and `var` in JavaScript?", difficulty: "Easy", category: "Technical", jobTypes: ["Frontend Software Engineer"], companyCount: 280, plan: "Free" },
    { id: 94, text: "Design a ride-sharing app like Uber.", difficulty: "Hard", category: "System Design", jobTypes: ["Backend Software Engineer", "Mobile Developer"], companyCount: 170, plan: "Premium" },
    { id: 95, text: "How do you measure the success of a project?", difficulty: "Medium", category: "Problem Solving", jobTypes: ["Project Management", "Product Management"], companyCount: 190, plan: "Premium" },
    { id: 96, text: "What are some common cybersecurity threats?", difficulty: "Medium", category: "Technical", jobTypes: ["Cybersecurity"], companyCount: 110, plan: "Premium" },
    { id: 97, text: "Describe your communication style.", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 680, plan: "Free" },
    { id: 98, text: "How would you design a caching strategy for a web application?", difficulty: "Hard", category: "System Design", jobTypes: ["Backend Software Engineer", "DevOps Engineer"], companyCount: 130, plan: "Premium" },
    { id: 99, text: "What is your experience with cloud platforms like AWS, Azure, or GCP?", difficulty: "Medium", category: "Situational", jobTypes: ["DevOps Engineer", "Backend Software Engineer"], companyCount: 200, plan: "Premium" },
    { id: 100, text: "Do you have any questions for us?", difficulty: "Easy", category: "Behavioral", jobTypes: ["All"], companyCount: 2000, plan: "Free" },
    { id: 101, text: "Explain cross-site scripting (XSS).", difficulty: "Hard", category: "Technical", jobTypes: ["Cybersecurity", "Frontend Software Engineer"], companyCount: 120, plan: "Premium" },
    { id: 102, text: "How do you handle customer feedback?", difficulty: "Easy", category: "Situational", jobTypes: ["Product Management", "Customer Service"], companyCount: 300, plan: "Free" },
    { id: 103, text: "What is a binary search tree?", difficulty: "Medium", category: "Technical", jobTypes: ["Software Engineer"], companyCount: 220, plan: "Premium" },
    { id: 104, text: "Design a video streaming service like Netflix.", difficulty: "Hard", category: "System Design", jobTypes: ["Backend Software Engineer"], companyCount: 180, plan: "Premium" },
    { id: 105, text: "Describe a long-term project you worked on.", difficulty: "Medium", category: "Behavioral", jobTypes: ["All"], companyCount: 350, plan: "Premium" }
];

// --- COMPANY DATA with embedded SVG logos updated for light theme ---
const companyData = [
  { name: "Meta", logo: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMjJhMTIgMTIgMCAwIDAtOC40OS0yMC40OWwxLjQxIDEuNDFBNyA3IDAgMCAxIDEyIDIwYTcgNyAwIDAgMS0zLjU0LTEuNDZsLTEuNDEtMS40MUE5IDkgMCAwIDAgMTIgMjJhOSA5IDAgMCAwIDgtNC4xOGwxLjQxIDEuNDFBMTEuOTIgMTEuOTIgMCAwIDEgMTIgMjJ6Ii8+PHBhdGggZD0iTTEyIDE4YTQgNCAwIDEgMC00LTQgNCA0IDAgMCAwIDQgNHoiLz48L3N2Zz4=`, href: "https://www.google.com/search?q=Meta+interview+questions" },
  { name: "Amazon", logo: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTUgMTBMMTIgMTMgOSAxME0xMiAxM1Y0Ii8+PHBhdGggZD0iTTcgMjFoMTBhMiAyIDAgMCAwIDItMlY5YTIgMiAwIDAgMC0yLTJIMTVhMiAyIDAgMCAxLTIgMi4xNkwxMiAxNmwzLTIuODRBMiAyIDAgMCAxIDE1IDhIN2EyIDIgMCAwIDAtMiAydjEwYTIgMiAwIDAgMCAyIDJ6Ii8+PC9zdmc+`, href: "https://www.google.com/search?q=Amazon+interview+questions" },
  { name: "Google", logo: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMjJhMTAgMTAgMCAxIDAtMTAgMTAgMTAgMCAwIDAgMCAyMHoiLz48cGF0aCBkPSJNMjIgMTJsLTEwIDEwTDIgMTIiLz48L3N2Zz4=`, href: "https://www.google.com/search?q=Google+interview+questions" },
  { name: "Apple", logo: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNOS41MSA4LjQxQzEwLjYyIDYuNDcgMTIuMDYgNSA5LjY3IDJjLTIuNjggMy4yOC0yLjQ5IDguMTctMS41OSA5LjE4Ii8+PHBhdGggZD0iTTE3LjUgMjJjLTEuMjQtMS4yMi0xLjkyLTMuMTctMS45Mi00Ljk0di0uMDZhNSA1IDAgMCAxIDEtMyA0LjM3IDQuMzcgMCAwIDEgMy42MyAxLjc2Yy0uNDUuMjUtMS4xNy42LTEuNDcgMS4wNy0uMjYuNDEtLjU1IDEuMDktLjU1IDIuMDF6Ii8+PC9zdmc+`, href: "https://www.google.com/search?q=Apple+interview+questions" },
  { name: "TikTok", logo: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTEuNSA0djEwLjVhMi41IDIuNSAwIDAgMS01IDBWNSIvPjxwYXRoIGQ9Im0xNi41IDQuNWEyLjUgMi41IDAgMSAxIDAgNXYtMi41Ii8+PC9zdmc+`, href: "https://www.google.com/search?q=TikTok+interview+questions" },
  { name: "Microsoft", logo: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzQxNTUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB3aWR0aD0iOSIgaGVpZ2h0PSI5IiB4PSIyIiB5PSIyIiByeD0iMSIvPjxyZWN0IHdpZHRoPSI5IiBoZWlnaHQ9IjkiIHg9IjEzIiB5PSIyIiByeD0iMSIvPjxyZWN0IHdpZHRoPSI5IiBoZWlnaHQ9IjkiIHg9IjIiIHk9IjEzIiByeD0iMSIvPjxyZWN0IHdpZHRoPSI5IiBoZWlnaHQ9IjkiIHg9IjEzIiB5PSIxMyIgcng9IjEiLz48L3N2Zz4=`, href: "https://www.google.com/search?q=Microsoft+interview+questions" },
  { name: "Netflix", logo: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlNTA5MTQiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNyAyMFY0bDEwIDE2VjQiLz48L3N2Zz4=`, href: "https://www.google.com/search?q=Netflix+interview+questions" },
  { name: "Salesforce", logo: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZHRoPSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMEFBRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNOS4zMyAxNy42N2ExMi4xMyAxMi4xMyAwIDAgMS00LjMzLTVjMC0yLjQ4IDEuNTgtMy40MyAzLjgzLTMuNTUgMS4wNy0uMDUgMS45LjYgMi4yNSAxLjQxLjQxLS40MyAxLjEyLS44OCAxLjg4LS45MSAyLjQ4LS4wOCAzLjYgMS44MiAzLjM2IDQuMy0uMjIgMi4yOC0xLjY3IDMuNTctMy45MiAzLjYtMS40NS4wMi0yLjIyLS41OC0yLjU1LTEuMjEtLjQ1LjQyLTEuMS43LTEuNzUuNzEtMS4xMy4wMS0xLjcxLS4yLTEuNzEtMS45MXoiLz48L3N2Zz4=`, href: "https://www.google.com/search?q=Salesforce+interview+questions" },
];

// --- UPDATED HELPERS for light theme tag styles ---
const getDifficultyClass = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "hard": return "bg-red-100 text-red-800 border border-red-200";
    case "medium": return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    case "easy": return "bg-green-100 text-green-800 border border-green-200";
    default: return "bg-gray-100 text-gray-800 border border-gray-200";
  }
};
const getCategoryClass = (category: string) => {
  switch (category.toLowerCase()) {
    case "technical": return "bg-blue-100 text-blue-800 border border-blue-200";
    case "situational": return "bg-purple-100 text-purple-800 border border-purple-200";
    case "problem solving": return "bg-orange-100 text-orange-800 border border-orange-200";
    case "behavioral": return "bg-cyan-100 text-cyan-800 border border-cyan-200";
    case "system design": return "bg-pink-100 text-pink-800 border border-pink-200";
    default: return "bg-gray-100 text-gray-800 border border-gray-200";
  }
};

const allCategories = [...new Set(mockQuestions.map(q => q.category))];
const allJobTypes = [...new Set(mockQuestions.flatMap(q => q.jobTypes))].sort();
const planOptions = ["All", "Free", "Premium"];

// ====================================
// ===== PAGINATION COMPONENT =====
// ====================================
const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (page: number) => void }) => {
    const pageNumbers = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        pageNumbers.push(1);
        if (currentPage > 3) pageNumbers.push('...');
        
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);

        if (currentPage <= 3) {
            startPage = 2;
            endPage = 4;
        }
        if (currentPage >= totalPages - 2) {
            startPage = totalPages - 3;
            endPage = totalPages - 1;
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        
        if (currentPage < totalPages - 2) pageNumbers.push('...');
        pageNumbers.push(totalPages);
    }

    return (
        <nav className="flex justify-center items-center gap-2 mt-16">
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="p-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
            >
                <ChevronLeft size={20} />
            </button>
            {pageNumbers.map((num, index) => 
                typeof num === 'number' ? (
                    <button 
                        key={index} 
                        onClick={() => onPageChange(num)}
                        className={`w-10 h-10 text-sm font-semibold border rounded-md transition-colors ${currentPage === num ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/30' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                    >
                        {num}
                    </button>
                ) : ( 
                    <span key={index} className="w-10 h-10 flex items-center justify-center text-sm text-gray-500">...</span> 
                )
            )}
            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className="p-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors"
            >
                <ChevronRight size={20} />
            </button>
        </nav>
    );
};

// ====================================
// ===== NEW ANSWER SECTION COMPONENT =====
// ====================================
const AnswerSection = ({ question, onSave, onClose }) => {
    const [answer, setAnswer] = useState('');
    
    return (
        <div className="mt-[-1px] p-6 bg-white border-l border-r border-b border-green-500 rounded-b-2xl shadow-xl animate-fadeIn">
            <div className="relative">
                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full h-40 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-400 text-base text-gray-800"
                />
                <span className="absolute bottom-3 right-3 text-sm text-gray-500">
                    {answer.length} characters
                </span>
            </div>
            <div className="mt-4 flex items-center justify-end gap-4">
                <button 
                    onClick={onClose}
                    className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={() => onSave(question.id, answer)}
                    className="px-5 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                    Save Answer
                </button>
            </div>
        </div>
    );
};

export default function InterviewQuestionsPage() {
  const [filteredQuestions, setFilteredQuestions] = useState(mockQuestions);
  const [activeQuestionId, setActiveQuestionId] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [jobType, setJobType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [planType, setPlanType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;
  const [isCompanyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [isPlanDropdownOpen, setPlanDropdownOpen] = useState(false);
  const companyRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const [companySearchTerm, setCompanySearchTerm] = useState('');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (companyRef.current && !companyRef.current.contains(event.target as Node)) {
        setCompanyDropdownOpen(false);
      }
      if (planRef.current && !planRef.current.contains(event.target as Node)) {
        setPlanDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [companyRef, planRef]);

  useEffect(() => {
    let results = mockQuestions;
    if (difficulty) results = results.filter(q => q.difficulty === difficulty);
    if (category) results = results.filter(q => q.category === category);
    if (jobType) results = results.filter(q => q.jobTypes.includes(jobType));
    if (planType !== 'All') results = results.filter(q => q.plan === planType);
    if (searchTerm) results = results.filter(q => q.text.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredQuestions(results);
    setCurrentPage(1);
    setActiveQuestionId(null);
  }, [difficulty, category, jobType, searchTerm, planType, selectedCompanies]);
  
  const handleSaveAnswer = (questionId: number, answer: string) => {
    console.log(`Saving answer for question ${questionId}:`, answer);
    alert("Answer saved!");
    setActiveQuestionId(null);
  };

  const handleCompanySelect = (company: string) => {
    setSelectedCompanies(prev => prev.includes(company) ? prev.filter(c => c !== company) : [...prev, company]);
  };
  
  const handleCompanySearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && companySearchTerm.trim() !== '') {
      const url = `https://www.google.com/search?q=${encodeURIComponent(companySearchTerm + ' interview questions')}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setCompanySearchTerm('');
    }
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setActiveQuestionId(null);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <main className="p-6 md:p-12 max-w-7xl mx-auto">
        <section className="mb-16">
          <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-4">
            Interview Questions
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl">
            Discover questions that matter. Boost your interview game. Our handpicked selection helps you prep smarter, turning pre-interview nerves into standout responses that stick with hiring managers.
          </p>
        </section>

        <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-4xl font-bold text-slate-900">Companies</h2>
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search any company..."
                        value={companySearchTerm}
                        onChange={(e) => setCompanySearchTerm(e.target.value)}
                        onKeyDown={handleCompanySearch}
                        className="bg-white border border-gray-300 rounded-full pl-12 pr-4 py-3 text-slate-900 w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                    />
                </div>
            </div>
            <div className="flex flex-wrap gap-3">
                {companyData.map(company => (
                    <Link href={company.href} key={company.name} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 transition-all duration-300 hover:bg-gray-100 hover:border-gray-300 hover:shadow-md hover:scale-105">
                        <Image src={company.logo} alt={`${company.name} logo`} width={22} height={22} />
                        <span className="font-semibold text-sm text-slate-700">{company.name}</span>
                    </Link>
                ))}
            </div>
        </section>

        <section className="mb-8">
            <h2 className="text-5xl font-extrabold text-slate-900 mb-2">Set Filters</h2>
            <p className="text-lg text-slate-600">In order to access perfect questions, please set filters.</p>
        </section>
        
        <section className="mb-12 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-500">Difficulty</label>
                    <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2 text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                        <option value="">All difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2 text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                        <option value="">All categories</option>
                        {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500">Job Type</label>
                    <select value={jobType} onChange={(e) => setJobType(e.target.value)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2 text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                        <option value="">All job types</option>
                        {allJobTypes.map(job => <option key={job} value={job}>{job}</option>)}
                    </select>
                </div>
                <div ref={companyRef} className="relative">
                    <label className="text-sm font-medium text-gray-500">Company</label>
                    <button onClick={() => setCompanyDropdownOpen(!isCompanyDropdownOpen)} className="mt-1 block w-full bg-white border border-gray-300 rounded-md p-2 text-left text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all">
                      {selectedCompanies.length > 0 ? `${selectedCompanies.length} selected` : 'Select companies'}
                    </button>
                    {isCompanyDropdownOpen && (
                      <div className="absolute z-10 top-full mt-2 w-full md:w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
                          <input type="text" placeholder="Search companies" className="w-full bg-slate-100 border border-gray-300 rounded-md pl-9 p-2 text-sm"/>
                        </div>
                        <p className="text-sm font-semibold mt-4 mb-2">Trending companies 🔥</p>
                        <div className="flex flex-wrap gap-2">
                          {companyData.map(company => (
                            <button key={company.name} onClick={() => handleCompanySelect(company.name)} className={`text-xs px-3 py-1 rounded-full border transition-colors ${selectedCompanies.includes(company.name) ? 'bg-green-500/20 border-green-500 text-gray-900' : 'bg-slate-100/50 border-gray-300 hover:border-gray-400'}`}>
                              {company.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
            </div>
            <div className="mt-4 flex gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder="Search for your question..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white border border-gray-300 rounded-md pl-10 p-2 text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all" />
                </div>
                <div ref={planRef} className="relative">
                  <button onClick={() => setPlanDropdownOpen(!isPlanDropdownOpen)} className="bg-white border border-gray-300 rounded-md p-2 text-slate-900 focus:ring-2 focus:ring-green-500 focus:border-green-500 w-28 text-left flex justify-between items-center transition-all">
                    {planType} <span>▼</span>
                  </button>
                  {isPlanDropdownOpen && (
                    <div className="absolute z-10 top-full mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg">
                      {planOptions.map(plan => (
                        <button key={plan} onClick={() => { setPlanType(plan); setPlanDropdownOpen(false); }} className={`w-full text-left p-2 text-sm hover:bg-green-50/50 ${plan === planType ? 'font-bold text-green-600' : ''}`}>
                          {plan}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
            </div>
        </section>

        <section>
          {currentQuestions.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {currentQuestions.map((q) => (
                <div key={q.id}>
                  <button 
                    onClick={() => setActiveQuestionId(activeQuestionId === q.id ? null : q.id)}
                    className="w-full text-left"
                  >
                    <div className={`bg-white p-6 ${activeQuestionId === q.id ? 'rounded-t-2xl' : 'rounded-2xl'} border ${activeQuestionId === q.id ? 'border-green-500 shadow-xl' : 'border-slate-200'} relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col`}>
                      <Bookmark className="absolute top-6 left-6 w-5 h-5 text-gray-400 hover:text-green-500 cursor-pointer" />
                      <span className={`absolute top-6 right-6 text-xs font-bold px-3 py-1 rounded-full ${getDifficultyClass(q.difficulty)}`}>{q.difficulty}</span>
                      <h2 className="text-xl font-semibold text-slate-900 mt-12 flex-grow">{q.text}</h2>
                      <div className="mt-4"><span className={`text-sm font-semibold px-3 py-1 rounded-full ${getCategoryClass(q.category)}`}>{q.category}</span></div>
                      <div className="mt-6">
                          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Job Types</h3>
                          <div className="flex flex-wrap gap-2">{q.jobTypes.map(job => (<span key={job} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600">{job}</span>))}</div>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-200">
                          <p className="text-sm text-slate-500">{q.companyCount} companies asked this question.</p>
                          <Link href="/sign-up" className="text-sm font-semibold text-green-600 hover:underline">Sign up to reveal all the companies ↗</Link>
                      </div>
                    </div>
                  </button>

                  {activeQuestionId === q.id && (
                    <AnswerSection question={q} onSave={handleSaveAnswer} onClose={() => setActiveQuestionId(null)} />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center bg-slate-100 p-16 rounded-lg border-2 border-dashed border-slate-200">
                <Search className="mx-auto h-16 w-16 text-slate-400" />
                <h3 className="mt-4 text-2xl font-semibold text-slate-800">No Questions Found</h3>
                <p className="mt-2 text-lg text-slate-500">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </section>

        {totalPages > 1 && (
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
            />
        )}
      </main>
    </div>
  );
}