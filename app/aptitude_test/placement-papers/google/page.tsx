"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from 'lucide-react';

// --- DATA: This data is specific to the Google Interview Questions page ---

const interviewContent = [
  { type: 'question', number: 1, text: 'Write A Haiku Describing Possible Methods For Predicting Search Traffic Seasonality.' },
  { type: 'list', items: ["* Math world's Search Engine", "* Seemed Slowed This May, Undergrads", "* Prepping For Finals."] },
  { type: 'question', number: 2, text: '' },
  { type: 'paragraph', content: '1\n1 1\n2 1\n1 2 1 1\n1 1 1 2 2 1\nWhat\'s The Next Line?' },
  { type: 'paragraph', content: "312211. This is the 'Look And Say' Sequence In Which Each Term After The First Describes The Previous Term: One 1 (11); Two 1s (21); One 2 And One 1 (1211); One 1, One 2, And Two 1's (111221); And So On. See The Look And Say Sequence Entry On Mathworld For A Complete Write-up And The Algebraic Form Of A Fascinating Related Quantity Known As Conway's Constant." },
  { type: 'questionWithOptions', number: 3, text: 'You Are In A Maze Of Twisty Little Passages, All Alike. There Is A Dusty Laptop Here With A Weak Wireless Connection. There Are Dull, Lifeless Gnomes Strolling Around. What Dost Thou Do?', options: ['A) Wander Aimlessly, Bumping Into Obstacles Until You Are Eaten By A Grue.', 'B) Use The Laptop As A Digging Device To Tunnel To The Next Level.', 'C) Play Nethack Until The Battery Dies Along With Your Hopes.', 'D) Use The Computer To Map The Nodes Of The Maze And Discover An Exit Path.', 'E) Email Your Resume To Google, Tell The Lead Gnome You Quit And Find Yourself In Whole Different World [Sic].'] },
  { type: 'paragraph', content: 'In General, Make A State Diagram. However, This Method Would Not Work In Certain Pathological Cases Such As Say, A Fractal Maze. For An Example Of This And Commentary, See Ed Pegg\'s Column About State Diagrams And Mazes.' },
  { type: 'question', number: 4, text: "What's Broken With Unix? Their Reproductive Capabilities. How Would You Fix It?" },
  { type: 'questionWithOptions', number: 5, text: 'On Your First Day At Google, You Discover That Your Cubicle Mate Wrote The Textbook You Used As A Primary Resource In Your First Year Of Graduate School. Do You:', options: ['A) Fawn Obsequiously And Ask If You Can Have An Autograph.', 'B) Sit Perfectly Still And Use Only Soft Keystrokes To Avoid Disturbing Her Concentration', 'C) Leave Her Daily Offerings Of Granola And Explain That Its From The Fests Bribe.', 'D) Delete Her Favorite Formula From The Textbooks And Explain How It\'s Now Your Mantra.', 'E) Show Her How Example Thm Could Have Been Solved With 24 Fewer Lines Of Code.'] },
  { type: 'questionWithOptions', number: 6, text: "Which Of The Following Expresses Google's Over-arching Philosophy?", options: ["A) \"I'm Feeling Lucky\"", "B) \"Don't Be Evil\"", "C) \"Oh, I Already Fixed That\"", "D) \"You Should Never Be More Than 50 Feet From Food\"", "E) All Of The Above"] },
  { type: 'question', number: 7, text: 'How Many Different Ways, Can You Colour An Icosahedron With One Of Three Colours On Each Face?' },
  { type: 'paragraph', content: 'For An Asymmetric 20-sided Solid, There Are Possible 3-colorings. For A Symmetric 20-sided Object, The Polya Enumeration Theorem Can Be Used To Obtain The Number Of Distinct Colorings. Here Is A Concise Mathematical Implementation: What Colors Would You Choose?' },
  { type: 'question', number: 8, text: 'This Space Left Intentionally Blank. Please Fill It With Something That Improves Upon Emptiness.' },
  { type: 'paragraph', content: 'For Nearly 10,000 Images Of Mathematical Functions, See The Wolfram Functions Site Visualization Gallery.' },
  { type: 'question', number: 9, text: 'On An Infinite, Two-dimensional, Rectangular Lattice Of 1-ohm Resistors, What Is The Resistance Between Two Nodes That Are A Knight\'s Move Away?' },
  { type: 'paragraph', content: 'This Problem Is Discussed In J. C. serfil\'s 1999 Arxiv Preprint. It Is Also Discussed In The Mathematical Guidebook For Symbolics, The Forthcoming Fourth Volume In Michael Trott\'s Guidebook Series, The First Two Of Which Were Published Just Last Week By Springer-verlag. The Contents For All Four Guidebooks, Including The Two Not Yet Published, Are Available On The Dvd Distributed With The First Two Guidebooks.' },
  { type: 'question', number: 10, text: 'It\'s 2 Pm On A Sunny Sunday Afternoon In The Bay Area. You\'re Minutes From The Pacific Ocean, Redwood Forest Hiking Trails And World Class Cultural Attractions. What Do You Do?' },
  { type: 'questionWithOptions', number: 11, text: 'In Your Opinion, What Is The Most Beautiful Math Equation Ever Derived?', options: ['1. Archimedes\' Recurrence Formula:', '2. Euler Formula:', '3. Euler-mascheroni Constant:', '4. Riemann Hypothesis: And Implies', '5. Gaussian Integral:', '6. Ramanujan\'s Prime Product Formula:', '7. Zeta-regularized Product:', '8. Mandelbrot Set Recursion:', '9. Bbp Formula:', '10. Cauchy Integral Formula:'] },
  { type: 'questionWithOptions', number: 12, text: 'Which Of The Following Is Not An Actual Interest Group Formed By Google Employees?', options: ["A. Women's Basketball B. Buffy Fans C. Cricketers D. Nobel Winners E. Wine Club"] },
  { type: 'question', number: 13, text: 'What Will Be The Next Great Improvement In Search Technology?' },
  { type: 'questionWithOptions', number: 14, text: 'What Is The Optimal Size Of A Project Team, Above Which Additional Members Do Not Contribute Productively Equivalent To The Percentage Increase In The Staff Size?', options: ['A) 1 B) 3 C) 5 D) 11 E) 24'] },
  { type: 'question', number: 15, text: 'Given A Triangle ABC, How Would You Use Only A Compass And Straight Edge To Find A Point P Such That Triangles ABP, ACP And BCP Have Equal Perimeters? (Assume That ABC Is Constructed So That A Solution Does Exist.)' },
  { type: 'paragraph', content: 'This Is The Isoperimetric Point, Which Is At The Center Of The Larger Soddy Circle. It Is Related To Apollonius\' Problem. The Three Tangent Circles Are Easy To Construct; The Circle Around Has Diameter, Which Gives The Other Two Circles. A Summary Of Compass And Straightedge Constructions For The Outer Soddy Circle Can Be Found In "Apollonius\' Problem: A Study Of Solutions And Their Connections" By David Gisch And Jason M. Ribando.' },
  { type: 'code', content: `16)\n{\n  Long L=1024;\n  Int i=1;\n  While(L>=1)\n  {\n    L=L/2;\n    i=i+1;\n  }\n}` },
  { type: 'paragraph', content: 'A) 8 B) 11 C) 10 D) 100\nAns: B' },
  { type: 'question', number: 17, text: 'This Question Is Based On The Complexity.' },
  { type: 'code', content: 'Q3] S->AB\nA->a\nB->bbA\nWhich One Is False For Above Grammar.' },
  { type: 'question', number: 18, text: 'Some Tree Were Given & The Question Is To Fine Preorder Traversal.' },
  { type: 'question', number: 19, text: 'One C ++ Program, To Find Output Of The Program.' },
  { type: 'questionWithOptions', number: 20, text: 'If The Mean Failure Hour Is 10,000 and 20 is the Mean Repair Hour. If The Printer Is Used By 100 Customer, then Find The Availability.', options: ['1)80%', '2)90%', '3)98%', '4)99.8%', '5)100%'] },
];

// --- MAIN PAGE COMPONENT ---
export default function GoogleInterviewPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="flex items-start gap-4 mb-8">
            {/* Back button */}
            <Link href="/aptitude_test/placement-papers" className="text-gray-500 hover:text-gray-900 transition-colors mt-1">
                <ArrowLeft size={28} />
            </Link>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-md">
            {/* Header Section */}
            <div className="text-center mb-10 pb-6 border-b border-gray-200">
                <h1 className="text-5xl font-bold">
                    <span className="text-blue-600">G</span>
                    <span className="text-red-500">o</span>
                    <span className="text-yellow-400">o</span>
                    <span className="text-blue-600">g</span>
                    <span className="text-green-600">l</span>
                    <span className="text-red-500">e</span>
                </h1>
                <p className="mt-2 text-lg text-gray-800 font-semibold">Google Interview Questions - Latest placement paper</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Posted by : Shasa</span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <Heart size={14} className="text-red-400" />
                        <span>(632)</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              {interviewContent.map((item, index) => {
                if (item.type === 'question') {
                  return <p key={index} className="text-lg text-gray-800 leading-relaxed font-semibold">{item.number ? `${item.number}] ` : ''}{item.text}</p>;
                }
                if (item.type === 'questionWithOptions') {
                  return (
                    <div key={index}>
                      <p className="text-lg text-gray-800 leading-relaxed font-semibold">{item.number ? `${item.number}] ` : ''}{item.text}</p>
                      <ul className="list-none space-y-2 pl-4 mt-2">
                        {item.options.map((opt, i) => <li key={i} className="text-lg text-gray-800">{opt}</li>)}
                      </ul>
                    </div>
                  );
                }
                if (item.type === 'paragraph') {
                  return <p key={index} className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">{item.content}</p>;
                }
                if (item.type === 'list') {
                  return (
                    <ul key={index} className="list-none space-y-1 pl-4">
                      {item.items.map((li, i) => <li key={i} className="text-lg text-gray-800">{li}</li>)}
                    </ul>
                  );
                }
                if (item.type === 'code') {
                  return <pre key={index} className="bg-gray-100 p-4 rounded-md text-gray-800 text-base whitespace-pre-wrap">{item.content}</pre>
                }
                return null;
              })}
            </div>
        </div>
      </main>
    </div>
  );
}