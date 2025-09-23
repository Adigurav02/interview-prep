import { NextResponse } from "next/server";

// 20 static challenges catalog (id, type, title, content, etc.)
export async function GET() {
  const challenges = [
    { id: 'c1', type: 'MCQ Quiz', title: 'JavaScript Basics', content: 'What is typeof null?', options: ['"null"','"object"','"undefined"','"number"'], correctAnswer: '"object"' },
    { id: 'c2', type: 'MCQ Quiz', title: 'React Keys', content: 'Why are keys important in lists?', options: ['Styling','Performance','Identify elements','Accessibility'], correctAnswer: 'Identify elements' },
    { id: 'c3', type: 'Coding Problem', title: 'Reverse String', content: 'Implement reverseString', boilerplateCode: 'function reverseString(str) {\n  // Your code\n}', testCases: { input: 'abc', expected: 'cba' } },
    { id: 'c4', type: 'Coding Problem', title: 'Sum Array', content: 'Sum numbers in array', boilerplateCode: 'function sum(arr) {\n  // Your code\n}', testCases: { input: [1,2,3], expected: 6 } },
    { id: 'c5', type: 'HR/Behavioral', title: 'Team Conflict', content: 'Describe a team conflict and resolution.' },
    { id: 'c6', type: 'Rapid Fire', title: 'HTTP Methods', content: 'Name common HTTP methods.' },
    { id: 'c7', type: 'MCQ Quiz', title: 'Promises', content: 'Which handles success?', options: ['.catch()', '.then()', '.finally()', 'await'], correctAnswer: '.then()' },
    { id: 'c8', type: 'MCQ Quiz', title: 'CSS Specificity', content: 'Highest specificity?', options: ['Element','Class','ID','Inline'], correctAnswer: 'Inline' },
    { id: 'c9', type: 'Coding Problem', title: 'Palindrome', content: 'Check palindrome', boilerplateCode: 'function isPal(s){\n  //\n}', testCases: { input: 'level', expected: true } },
    { id: 'c10', type: 'Coding Problem', title: 'Fibonacci', content: 'Nth Fibonacci', boilerplateCode: 'function fib(n){\n  //\n}', testCases: { input: 6, expected: 8 } },
    { id: 'c11', type: 'HR/Behavioral', title: 'Leadership', content: 'A time you led a project.' },
    { id: 'c12', type: 'Rapid Fire', title: 'Big O', content: 'Common time complexities.' },
    { id: 'c13', type: 'MCQ Quiz', title: 'HTTP Codes', content: '201 means?', options: ['OK','Created','No Content','Accepted'], correctAnswer: 'Created' },
    { id: 'c14', type: 'MCQ Quiz', title: 'Git', content: 'Revert last commit?', options: ['reset --hard','revert HEAD','checkout HEAD~1','amend'], correctAnswer: 'revert HEAD' },
    { id: 'c15', type: 'Coding Problem', title: 'Two Sum', content: 'Indices of two numbers', boilerplateCode: 'function twoSum(nums, target){\n //\n}', testCases: { input: [[2,7,11,15],9], expected: [0,1] } },
    { id: 'c16', type: 'Coding Problem', title: 'Unique', content: 'Unique elements', boilerplateCode: 'function unique(a){\n //\n}', testCases: { input: [1,1,2], expected: [1,2] } },
    { id: 'c17', type: 'HR/Behavioral', title: 'Failure', content: 'A failure you learned from.' },
    { id: 'c18', type: 'Rapid Fire', title: 'Databases', content: 'SQL vs NoSQL differences.' },
    { id: 'c19', type: 'MCQ Quiz', title: 'TypeScript', content: 'Extends keyword in generics?', options: ['Union','Constraint','Merge','Exclude'], correctAnswer: 'Constraint' },
    { id: 'c20', type: 'Rapid Fire', title: 'Security', content: 'Common web vulnerabilities.' },
  ];
  return NextResponse.json({ challenges });
}


