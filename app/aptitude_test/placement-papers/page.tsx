"use client";

import Link from "next/link";
import { Folder, ArrowLeft } from 'lucide-react';

// --- DATA: This data is specific to the Placement Papers page ---
const companyNames = [
  "Infotech",
  "Deloitte",
  "Accenture",
  "Capgemini",
  "Adobe",
  "Google",
  "IBM",
  "Infosys",
  "Wipro",
  "TCS",
];

// Helper function to convert text to a URL-friendly slug
const toKebabCase = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// --- MAIN PAGE COMPONENT ---
export default function PlacementPapersPage() {
  const parentSlug = "placement-papers"; // This should match the folder name
  const title = "Placement Papers";

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200">
            {/* Link to go back to the main aptitude test page */}
            <Link href="/aptitude_test" className="text-gray-500 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100">
                <ArrowLeft size={24} />
            </Link>
            <div>
                <p className="text-sm font-semibold text-green-600">Interview Preparation</p>
                <h1 className="text-3xl font-extrabold text-gray-900">
                    {title}
                </h1>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {companyNames.map(company => (
            // Each link will point to a future page for that specific company's papers
            // For example: /aptitude_test/placement-papers/3i-infotech
            <Link 
              key={company} 
              href={`/aptitude_test/${parentSlug}/${toKebabCase(company)}`} 
              className="group flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Folder className="text-yellow-500 flex-shrink-0" size={20} />
              <span className="font-semibold text-gray-700 group-hover:text-green-700">{company}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}