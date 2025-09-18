"use client";

import Link from "next/link";
import { ArrowLeft, Heart } from 'lucide-react';

// --- DATA: This data is specific to the 3i Infotech Placement Paper page ---
// Each item in this array represents one question block from your image.
const paperContent = [
  "In a class composed of x girls and y boys what part of the class is composed of girls? A. y/(x + y) B. x/xy C. x/(x + y) D. y/xy (Ans.C)",
  "What is the maximum number of half-pint bottles of cream that can be filled with a 4-gallon can of cream? (2 pt.=1 qt. and 4 qt.=1 gal) A. 16 B. 24 C. 30 D. 64 (Ans.D)",
  "If the operation,^ is defined by the equation x ^ y = 2x + y, what is the value of a in 2 ^ a = a ^ 3? A.0 B.1 C.-1 D.4 (Ans.B)",
  "A coffee shop blends 2 kinds of coffee, putting in 2 parts of a 33p. a gm. grade to 1 part of a 24p. a gm. If the mixture is changed to 1 part of the 33p. a gm. to 2 parts of the less expensive grade, how much will the shop save in blending 100 gms? A.Rs.90 B.Rs.1.00 C.Rs.3.00 D.Rs.8.00 (Ans.C)",
  "There are 200 questions on a 3 hr examination. Among these questions are 50 mathematics problems. It is suggested that twice as much time be spent on each maths problem as for each other question. How many minutes should be spent on mathematics problems? A.36 B.72 C.60 D.100 (Ans.B)",
  "In a group of 15,7 have studied Latin, 8 have studied Greek, and 3 have not studied either. How many of these studied both Latin and Greek? A.0 B.3 C.4 D.5 (Ans.B)",
  "If 13 = 13w/(1-w), then (2w)^2 = ? A.1/4 B.1/2 C.1 D.2 (Ans.B)",
  "If a and b are positive integers and (a-b)/3.5 = 4/7, then (A) b < a (B) b > a (C) b = a (D) b >= a (Ans. A)",
  "In June a baseball team that played 60 games had won 30% of its game played. After a phenomenal winning streak this team raised its average to 50%. How many games must the team have won in a row to attain this average? A. 12 B. 20 C. 24 D. 30 (Ans. C)",
  "A company contracts to paint 3 houses. Mr.Brown can paint a house in 6 days while Mr.Black would take 8 days and Mr.Blue 12 days. After 8 days Mr.Brown goes on vacation and Mr. Black begins to work for a period of 6 days. How many days will it take Mr.Blue to complete the contract? A. 7 B. 8 C. 11 D. 12 (Ans.C)",
  "2 hours after a freight train leaves Delhi a passenger train leaves the same station travelling in the same direction at an average speed of 16 km/hr. After travelling 4 hrs the passenger train overtakes the freight train. The average speed of the freight train was? A. 30 B. 40 C.58 D. 60 (Ans. B)",
  "If 9x-3y=12 and 3x-5y=7 then 6x-2y = ? A.-5 B. 4 C. 2 D. 8 (Ans. D)",
  "There are 5 red shoes, 4 green shoes. If one draw randomly a shoe what is the probability of getting a red shoe (Ans 5c1/ 9c1)",
  "What is the selling price of a car? If the cost of the car is Rs.60 and a profit of 10% over selling price is earned (Ans: Rs 66/-)",
  "1/3 of girls , 1/2 of boys go to canteen. What factor and total number of classmates go to canteen. Ans: Cannot be determined.",
  "The price of a product is reduced by 30%. By what percentage should it be increased to make it 100% (Ans: 42.857%)",
  "If p/q = 5/4, then 2p+q=? If pqrst is a parallelogram what it the ratio of triangle PQS & parallelogram PQRST. (Ans: 1:2 )",
  "The cost of an item is Rs 12.60. If the profit is 10% over selling price what is the selling price? (Ans: Rs 13.86/- )",
  "There are 6 red shoes & 4 green shoes. If two of red shoes are drawn what is the probability of getting red shoes (Ans: 6c2/10c2)",
  "To 15 lts of water containing 20% alcohol, we add 5 lts of pure water. What is % alcohol. (Ans: 15%)",
  "A worker is paid Rs.20/- for a full days work. He works 1,1/3,2/3,3/4 days in a week. What is the total amount paid for that worker? (Ans: 57.50 )",
  "If the total distance of a journey is 120 km. If one goes by 60 kmph and comes back at 40kmph what is the average speed during the journey? Ans: 48kmph",
  "A school has 30% students from Maharashtra. Out of these 20% are Bombay students. Find the total percentage of Bombay? (Ans: 6%)",
  "An equilateral triangle of sides 3 inch each is given. How many equilateral triangles of side 1 inch can be formed from it? (Ans: 9)",
  "If A/B = 3/5,then 15A = ? (Ans: 9B)",
  "Each side of a rectangle is increased by 100%. By what percentage does the area increase? (Ans : 300%)",
  "Perimeter of the back wheel = 9 feet, front wheel = 7 feet on a certain distance, the front wheel gets 10 revolutions more than the back wheel .What is the distance? (Ans : 315 feet)",
];

// --- MAIN PAGE COMPONENT ---
export default function InfotechPlacementPage() {
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
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">Infotech</h1>
                <p className="mt-2 text-lg text-gray-600 font-semibold">3i Infotech Placement Papers - Aptitude Questions</p>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span>Posted by : Sundar</span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-1">
                        <Heart size={14} className="text-red-400" />
                        <span>(1577)</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {paperContent.map((questionText, index) => (
                <p key={index} className="text-gray-800 leading-relaxed border-t border-gray-200 pt-6">
                  {questionText}
                </p>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
}