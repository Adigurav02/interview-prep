"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={28} />
          </Link>
          <h1 className="text-4xl font-extrabold text-white">About Us</h1>
        </div>
        
        <div className="bg-slate-800 p-8 rounded-lg space-y-8 border border-slate-700">
          <section>
            <h2 className="text-2xl font-bold text-green-400 mb-3">Our Mission</h2>
            <p className="leading-relaxed text-lg">
              At Prepwise, our mission is to empower job seekers everywhere to walk into their interviews with unshakable confidence. We believe that everyone deserves a fair chance to land their dream job, and that preparation is the key to unlocking potential. We are leveling the playing field by making expert interview coaching accessible to all.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-green-400 mb-3">Our Story</h2>
            <p className="leading-relaxed text-lg mb-4">
              Prepwise was born from a simple, frustrating experience: the feeling of leaving an interview and knowing you could have done better. Our founders, a team of engineers and career coaches, saw countless talented individuals falter not because of a lack of skill, but because of a lack of practice and confidence.
            </p>
            <p className="leading-relaxed text-lg">
              We decided to combine cutting-edge AI technology with proven interview strategies to create a 24/7 personal career coach. We built a platform that doesn't just ask questions, but provides instant, actionable feedback to help you improve your communication, structure your answers, and showcase your true abilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-green-400 mb-3">What We Do</h2>
            <p className="leading-relaxed text-lg">
              Our suite of AI-powered tools is designed to cover every aspect of your job hunt, from perfecting your resume to acing the final round. We provide tailored practice sessions, smart feedback, and the resources you need to stop getting rejected and start getting offers. Join us on our mission to turn interview anxiety into interview confidence.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}