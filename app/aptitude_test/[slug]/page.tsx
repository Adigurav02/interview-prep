"use client";

import { use } from 'react';
import Link from "next/link";
import { Folder, ArrowLeft } from 'lucide-react';

// --- MOCK DATA for all sub-topics ---
// The key (e.g., 'arithmetic-aptitude') must match the kebab-cased link from the previous page.
const subTopicData: { [key: string]: string[] } = {
  'arithmetic-aptitude': [
    "Problems on Trains", "Time and Distance", "Height and Distance", "Time and Work", "Simple Interest", "Compound Interest", "Profit and Loss"
  ],
  'verbal-ability': [
    "Spotting Errors", "Sentence Correction", "Fill in the Blanks", "Synonyms and Antonyms"
  ],
  'logical-reasoning': [
    "Number Series", "Verbal Classification", "Analogies", "Logical Games"
  ],
  'verbal-reasoning': [
    "Cause and Effect", "Verbal Analogy", "Statement and Assumption", "Logical Deduction"
  ]
  // Add more data for other categories as needed...
};

// Helper function to convert text to a URL-friendly slug
const toKebabCase = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// Helper function to convert a URL slug back to a readable title
const formatTitle = (slug: string) => {
    if (!slug) return "";
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default function AptitudeSubTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params); 
  const title = formatTitle(slug);
  const topics = subTopicData[slug] || [];

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200">
            {/* CORRECTED LINK with the underscore to match folder name */}
            <Link href="/aptitude_test" className="text-gray-500 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100">
                <ArrowLeft size={24} />
            </Link>
            <div>
                <p className="text-sm font-semibold text-green-600">Aptitude Questions and Answers</p>
                <h1 className="text-3xl font-extrabold text-gray-900">
                    {title}
                </h1>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {topics.length > 0 ? (
            topics.map(topic => (
              // This link now correctly uses the parent slug with an underscore
              <Link key={topic} href={`/aptitude_test/${slug}/${toKebabCase(topic)}`} className="group flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors">
                <Folder className="text-yellow-500 flex-shrink-0" size={20} />
                <span className="font-semibold text-gray-700 group-hover:text-green-700">{topic}</span>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-16 bg-gray-50 rounded-lg">
                <p className="font-semibold">No topics found for this category yet.</p>
                <p className="text-sm mt-1">Check back soon for more practice materials!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}