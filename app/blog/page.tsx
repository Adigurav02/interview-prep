"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- MOCK DATA for the Blog Page with your requested images ---
const categories = ["#import 2025-08-09 12:38", "Affirm", "AI Interview Coach", "Amazon", "Behavioral Interview Questions", "Blue Origin", "Boeing", "Career Prep"];

const featuredArticles = [
    { 
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600", 
        title: "How to Effectively Collaborate and Communicate Your Teamwork Skills", 
        description: "Discover how to describe your working relationship in job interviews with examples and strategies. Learn to effectively communicate your collaborative skills.", 
        author: "Wilson", 
        avatar: "https://i.pravatar.cc/40?u=wilson", 
        date: "09.16.2024", 
        category: "Behavioral Interview Questions" 
    },
    { 
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600", 
        title: "How to Give a Genuine, Standout Answer in Modern Interviews", 
        description: "Learn how to answer common interview questions with authenticity. This guide provides winning strategies for making a real connection.", 
        author: "Lauren", 
        avatar: "https://i.pravatar.cc/40?u=lauren", 
        date: "09.12.2024", 
        category: "Interview Tips" 
    },
    { 
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600", 
        title: "Using AI to Craft the Perfect Cover Letter", 
        description: "Explore how AI tools can help you write compelling cover letters that capture attention and showcase your best qualities.", 
        author: "Sandra", 
        avatar: "https://i.pravatar.cc/40?u=sandra", 
        date: "09.09.2024", 
        category: "AI Interview Coach" 
    }
];

const latestArticles = [
    // ...The latest articles data remains the same...
    { image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600", title: "Authentic “Why Do You Want to Work Here?” Answers for Top Companies", author: "Sandra", avatar: "https://i.pravatar.cc/40?u=sandra", date: "05.18.2025", category: "Career Prep" },
    { image: "https://images.unsplash.com/photo-1620712943543-95fc69afd524?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600", title: "Top Free AI Cover Letter Generators in 2025 (Ranked)", author: "Wilson", avatar: "https://i.pravatar.cc/40?u=wilson", date: "04.29.2025", category: "AI Interview Coach" },
    { image: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600", title: "Top 7 Mistakes AI Cover Letter Generators Still Make (and How to Fix Them)", author: "Wilson", avatar: "https://i.pravatar.cc/40?u=wilson", date: "03.18.2025", category: "AI Interview Coach" },
    // ...and so on
];

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
        <nav className="flex justify-center items-center gap-2 mt-16">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors">
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
                ) : ( <span key={index} className="w-10 h-10 flex items-center justify-center text-sm text-gray-500">...</span> )
            )}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition-colors">
                <ChevronRight size={20} />
            </button>
        </nav>
    );
};

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 9;

    const filteredArticles = useMemo(() => {
        if (activeCategory === "All") {
            return latestArticles;
        }
        return latestArticles.filter(article => article.category === activeCategory);
    }, [activeCategory]);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    
    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        setCurrentPage(1); // Reset to page 1 on category change
    };

    return (
        <div className="bg-slate-50 min-h-screen text-slate-800">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                
                <header className="text-center mb-16">
                    <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900">The Prepwise Blog</h1>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Beyond the resume: Dive into the nitty-gritty of landing your dream gig.
                    </p>
                </header>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Categories</h2>
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map(category => (
                            <button 
                                key={category} 
                                onClick={() => handleCategoryClick(category)}
                                className={`px-4 py-2 text-sm font-semibold rounded-full border transition-colors ${activeCategory === category ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100 hover:border-slate-400'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </section>
                
                <section className="mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredArticles.map((article, index) => (
                            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <Link href="#" className="block overflow-hidden">
                                    <Image src={article.image} alt={article.title} width={400} height={250} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"/>
                                </Link>
                                <div className="p-6 flex flex-col">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug flex-grow">
                                        <Link href="#" className="hover:text-green-600 transition-colors">{article.title}</Link>
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-6 line-clamp-3">{article.description}</p>
                                    <div className="flex items-center justify-between text-xs text-slate-500 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <Image src={article.avatar} alt={article.author} width={28} height={28} className="rounded-full" />
                                            <span className="font-semibold">{article.author}</span>
                                        </div>
                                        <span className="px-3 py-1 bg-slate-100 rounded-full font-medium">{article.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-8">Latest Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         {currentArticles.map((article, index) => (
                            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <Link href="#" className="block overflow-hidden">
                                    <Image src={article.image} alt={article.title} width={400} height={250} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"/>
                                </Link>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                                        <Link href="#" className="hover:text-green-600 transition-colors">{article.title}</Link>
                                    </h3>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Image src={article.avatar} alt={article.author} width={28} height={28} className="rounded-full" />
                                            <span className="font-semibold">{article.author}</span>
                                        </div>
                                        <span className="px-3 py-1 bg-slate-100 rounded-full font-medium">{article.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    )}
                </section>
            </main>
        </div>
    );
}