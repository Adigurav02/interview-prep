"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={28} />
          </Link>
          <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
        </div>
        
        <div className="bg-slate-800 p-8 rounded-lg space-y-6 border border-slate-700">
          <section>
            <h2 className="text-2xl font-bold text-green-400 mb-3">1. Information We Collect</h2>
            <p className="leading-relaxed">
              We collect information you provide directly to us, such as when you create an account, upload a resume, or use our interactive features. This may include your name, email address, and professional experience. We also collect log information when you use our services.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-green-400 mb-3">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the information we collect to provide, maintain, and improve our services, including to personalize features and content. We may also use the information to communicate with you about products, services, offers, and events offered by Prepwise.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-green-400 mb-3">3. Sharing of Information</h2>
            <p className="leading-relaxed">
              We do not share your personal information with third parties except as described in this privacy policy. We may share information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.
            </p>
          </section>
          {/* Add more sections as needed */}
        </div>
      </main>
    </div>
  );
}