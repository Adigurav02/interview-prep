"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={28} />
          </Link>
          <h1 className="text-4xl font-extrabold text-white">Terms of Service</h1>
        </div>
        
        <div className="bg-slate-800 p-8 rounded-lg space-y-6 border border-slate-700">
          <section>
            <h2 className="text-2xl font-bold text-green-400 mb-3">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using Prepwise Interview_Bot ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-green-400 mb-3">2. Description of Service</h2>
            <p className="leading-relaxed">
              Our service provides AI-powered tools for interview preparation, including but not limited to, practice questions, resume analysis, and job finding assistance. The service is provided "as is" and we assume no responsibility for the timeliness, deletion, or failure to store any user communications or personalization settings.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-green-400 mb-3">3. User Conduct</h2>
            <p className="leading-relaxed">
              You agree not to use the service to upload, post, email, or otherwise transmit any content that is unlawful, harmful, threatening, abusive, or otherwise objectionable. You are responsible for maintaining the confidentiality of your account and password.
            </p>
          </section>
          {/* Add more sections as needed */}
        </div>
      </main>
    </div>
  );
}