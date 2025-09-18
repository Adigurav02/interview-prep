"use client";

import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";

export default function ContactUsPage() {
  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={28} />
          </Link>
          <h1 className="text-4xl font-extrabold text-white">Contact Us</h1>
        </div>
        
        <div className="bg-slate-800 p-8 rounded-lg border border-slate-700">
            <p className="text-lg leading-relaxed mb-8">
                We'd love to hear from you! Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
            </p>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Mail className="text-green-400" size={24} />
                    <a href="mailto:support@prepwise.com" className="hover:text-white transition-colors">support@prepwise.com</a>
                </div>
                <div className="flex items-center gap-4">
                    <Phone className="text-green-400" size={24} />
                    <span>(555) 123-4567</span>
                </div>
                <div className="flex items-start gap-4">
                    <MapPin className="text-green-400 mt-1" size={24} />
                    <span>Kudal</span>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}