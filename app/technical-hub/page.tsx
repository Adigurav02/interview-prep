"use client";

import { useState, useRef } from 'react';
import { LanguageIcon } from '@/components/icons/language-icons';
import { ChallengeWindow, type Challenge } from '@/components/ChallengeWindow';

// --- FULL MOCK DATA (50 Questions) ---
const challengesByLanguage: { [key: string]: Challenge[] } = {
    'Python': [
        { title: 'Check if a Number is Even or Odd', language: 'Python', difficulty: 'Very Easy', instructions: 'Write a function that takes an integer and returns "Even" for even numbers or "Odd" for odd numbers.', boilerplateCode: 'def check_even_odd(number):\n    # Your code here', correctSolution: 'def check_even_odd(number):\n    return "Even" if number % 2 == 0 else "Odd"' },
        { title: 'Reverse a String', language: 'Python', difficulty: 'Easy', instructions: 'Create a function that reverses a given string.', boilerplateCode: 'def reverse_string(s):\n    # Your code here', correctSolution: 'def reverse_string(s):\n    return s[::-1]' },
        { title: 'Two Sum', language: 'Python', difficulty: 'Medium', instructions: 'Given an array of integers and a target, return indices of two numbers that add up to the target.', boilerplateCode: 'def two_sum(nums, target):\n    # Your code here', correctSolution: 'def two_sum(nums, target):\n    hash_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in hash_map:\n            return [hash_map[complement], i]\n        hash_map[num] = i\n    return []' },
        { title: 'Find Max Number', language: 'Python', difficulty: 'Easy', instructions: 'Write a function to find the largest number in a list of integers.', boilerplateCode: 'def find_max(numbers):\n    # Your code here', correctSolution: 'def find_max(numbers):\n    return max(numbers)' },
        { title: 'Validate Palindrome', language: 'Python', difficulty: 'Hard', instructions: 'Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.', boilerplateCode: 'def is_palindrome(s):\n    # Your code here', correctSolution: 'def is_palindrome(s):\n    filtered_chars = filter(str.isalnum, s)\n    lowercase_filtered_chars = map(str.lower, filtered_chars)\n    \n    filtered_chars_list = list(lowercase_filtered_chars)\n    return filtered_chars_list == filtered_chars_list[::-1]' },
    ],
    'JavaScript': [
        { title: 'Find Array Sum', language: 'JavaScript', difficulty: 'Very Easy', instructions: 'Write a function that returns the sum of all numbers in an array.', boilerplateCode: 'function arraySum(arr) {\n  // Your code here\n}', correctSolution: 'function arraySum(arr) {\n  return arr.reduce((sum, current) => sum + current, 0);\n}' },
        { title: 'Filter Out Falsy Values', language: 'JavaScript', difficulty: 'Easy', instructions: 'Remove all falsy values (false, null, 0, "", undefined, NaN) from an array.', boilerplateCode: 'function filterFalsy(arr) {\n  // Your code here\n}', correctSolution: 'function filterFalsy(arr) {\n  return arr.filter(Boolean);\n}' },
        { title: 'Debounce Function', language: 'JavaScript', difficulty: 'Medium', instructions: 'Create a debounce function that delays invoking a function until after `wait` milliseconds have passed.', boilerplateCode: 'function debounce(func, wait) {\n  // Your code here\n}', correctSolution: 'function debounce(func, wait) {\n  let timeout;\n  return function(...args) {\n    const context = this;\n    clearTimeout(timeout);\n    timeout = setTimeout(() => func.apply(context, args), wait);\n  };\n}' },
        { title: 'FizzBuzz', language: 'JavaScript', difficulty: 'Easy', instructions: 'Log numbers 1 to n. For multiples of 3 log "Fizz", for 5 log "Buzz", for both log "FizzBuzz".', boilerplateCode: 'function fizzBuzz(n) {\n  // Your code here\n}', correctSolution: 'function fizzBuzz(n) {\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) {\n      console.log("FizzBuzz");\n    } else if (i % 3 === 0) {\n      console.log("Fizz");\n    } else if (i % 5 === 0) {\n      console.log("Buzz");\n    } else {\n      console.log(i);\n    }\n  }\n}' },
        { title: 'Flatten Nested Array', language: 'JavaScript', difficulty: 'Hard', instructions: 'Implement a function to flatten a nested array of any depth.', boilerplateCode: 'function flatten(arr) {\n  // Your code here\n}', correctSolution: 'function flatten(arr) {\n  return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);\n}' },
    ],
    'TypeScript': [
        { title: 'Strongly Typed Greeting', language: 'TypeScript', difficulty: 'Very Easy', instructions: 'Create a function that takes a name (string) and returns a greeting.', boilerplateCode: 'function greet(name: string): string {\n  // Your code here\n}', correctSolution: 'function greet(name: string): string {\n  return `Hello, ${name}!`;\n}' },
        { title: 'Calculate Rectangle Area', language: 'TypeScript', difficulty: 'Easy', instructions: 'Define an interface for a rectangle and a function to calculate its area.', boilerplateCode: 'interface Rectangle {\n  width: number;\n  height: number;\n}\n\nfunction getArea(rect: Rectangle): number {\n  // Your code here\n}', correctSolution: 'interface Rectangle {\n  width: number;\n  height: number;\n}\n\nfunction getArea(rect: Rectangle): number {\n  return rect.width * rect.height;\n}' },
        { title: 'Get First Element (Generic)', language: 'TypeScript', difficulty: 'Medium', instructions: 'Write a generic function that returns the first element of an array.', boilerplateCode: 'function getFirstElement<T>(arr: T[]): T | undefined {\n  // Your code here\n}', correctSolution: 'function getFirstElement<T>(arr: T[]): T | undefined {\n  return arr.length > 0 ? arr[0] : undefined;\n}' },
        { title: 'Filter Array of Objects', language: 'TypeScript', difficulty: 'Easy', instructions: 'Filter an array of users (with id, name) to find users with an ID greater than a given value.', boilerplateCode: 'interface User {\n  id: number;\n  name: string;\n}\n\nfunction filterUsers(users: User[], minId: number): User[] {\n  // Your code here\n}', correctSolution: 'interface User {\n  id: number;\n  name: string;\n}\n\nfunction filterUsers(users: User[], minId: number): User[] {\n  return users.filter(user => user.id > minId);\n}' },
        { title: 'Implement a Basic Stack', language: 'TypeScript', difficulty: 'Hard', instructions: 'Create a generic Stack class with push, pop, and peek methods.', boilerplateCode: 'class Stack<T> {\n  private storage: T[] = [];\n\n  push(item: T): void {\n    // Your code here\n  }\n\n  pop(): T | undefined {\n    // Your code here\n  }\n\n  peek(): T | undefined {\n    // Your code here\n  }\n}', correctSolution: 'class Stack<T> {\n  private storage: T[] = [];\n\n  push(item: T): void {\n    this.storage.push(item);\n  }\n\n  pop(): T | undefined {\n    if (this.storage.length === 0) return undefined;\n    return this.storage.pop();\n  }\n\n  peek(): T | undefined {\n    return this.storage[this.storage.length - 1];\n  }\n}' },
    ],
    'Java': [
        { title: 'Sum of Two Integers', language: 'Java', difficulty: 'Very Easy', instructions: 'Create a method that takes two integers and returns their sum.', boilerplateCode: 'class Solution {\n    public int sum(int a, int b) {\n        // Your code here\n    }\n}', correctSolution: 'class Solution {\n    public int sum(int a, int b) {\n        return a + b;\n    }\n}' },
        { title: 'Reverse a String', language: 'Java', difficulty: 'Easy', instructions: 'Reverse the characters of a given string.', boilerplateCode: 'class Solution {\n    public String reverse(String s) {\n        // Your code here\n    }\n}', correctSolution: 'class Solution {\n    public String reverse(String s) {\n        return new StringBuilder(s).reverse().toString();\n    }\n}' },
        { title: 'Valid Parentheses', language: 'Java', difficulty: 'Medium', instructions: "Given a string containing '()[]{}', determine if the input string is valid.", boilerplateCode: 'import java.util.Stack;\n\nclass Solution {\n    public boolean isValid(String s) {\n        // Your code here\n    }\n}', correctSolution: 'import java.util.Stack;\n\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == \'(\') stack.push(\')\');\n            else if (c == \'{\') stack.push(\'}\');\n            else if (c == \'[\') stack.push(\']\');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}' },
        { title: 'Is Palindrome', language: 'Java', difficulty: 'Easy', instructions: 'Check if a given string is a palindrome (reads the same forwards and backward).', boilerplateCode: 'class Solution {\n    public boolean isPalindrome(String s) {\n        // Your code here\n    }\n}', correctSolution: 'class Solution {\n    public boolean isPalindrome(String s) {\n        String clean = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();\n        String reversed = new StringBuilder(clean).reverse().toString();\n        return clean.equals(reversed);\n    }\n}' },
        { title: 'Merge Two Sorted Lists', language: 'Java', difficulty: 'Hard', instructions: 'Merge two sorted linked lists and return it as a new sorted list. (ListNode class is predefined)', boilerplateCode: 'class Solution {\n    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        // Your code here\n    }\n}', correctSolution: 'class Solution {\n    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        if (l1 == null) return l2;\n        if (l2 == null) return l1;\n        if (l1.val < l2.val) {\n            l1.next = mergeTwoLists(l1.next, l2);\n            return l1;\n        } else {\n            l2.next = mergeTwoLists(l1, l2.next);\n            return l2;\n        }\n    }\n}' },
    ],
    'Go': [
        { title: 'Simple Adder', language: 'Go', difficulty: 'Very Easy', instructions: 'Write a function that takes two integers and returns their sum.', boilerplateCode: 'package main\n\nfunc add(a, b int) int {\n\t// Your code here\n}', correctSolution: 'package main\n\nfunc add(a, b int) int {\n\treturn a + b\n}' },
        { title: 'Reverse a String', language: 'Go', difficulty: 'Easy', instructions: 'Reverse a string, correctly handling unicode characters (runes).', boilerplateCode: 'package main\n\nfunc reverse(s string) string {\n\t// Your code here\n}', correctSolution: 'package main\n\nfunc reverse(s string) string {\n\trunes := []rune(s)\n\tfor i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n\t\trunes[i], runes[j] = runes[j], runes[i]\n\t}\n\treturn string(runes)\n}' },
        { title: 'Graceful Error Handling', language: 'Go', difficulty: 'Medium', instructions: 'Write a function that might return an error and handle it gracefully.', boilerplateCode: 'package main\n\nimport "errors"\n\nfunc divide(a, b float64) (float64, error) {\n\t// Your code here\n}', correctSolution: 'package main\n\nimport "errors"\n\nfunc divide(a, b float64) (float64, error) {\n\tif b == 0 {\n\t\treturn 0, errors.New("cannot divide by zero")\n\t}\n\treturn a / b, nil\n}' },
        { title: 'Contains Even Number', language: 'Go', difficulty: 'Easy', instructions: 'Check if a slice of integers contains at least one even number.', boilerplateCode: 'package main\n\nfunc hasEven(slice []int) bool {\n\t// Your code here\n}', correctSolution: 'package main\n\nfunc hasEven(slice []int) bool {\n\tfor _, num := range slice {\n\t\tif num%2 == 0 {\n\t\t\treturn true\n\t\t}\n\t}\n\treturn false\n}' },
        { title: 'Concurrent Sum', language: 'Go', difficulty: 'Hard', instructions: 'Use goroutines and channels to sum numbers in a slice concurrently.', boilerplateCode: 'package main\n\nfunc concurrentSum(slice []int) int {\n\t// Your code here\n}', correctSolution: 'package main\n\nfunc sumPart(s []int, c chan int) {\n\tsum := 0\n\tfor _, v := range s {\n\t\tsum += v\n\t}\n\tc <- sum\n}\n\nfunc concurrentSum(slice []int) int {\n\tc := make(chan int)\n\tgo sumPart(slice[:len(slice)/2], c)\n\tgo sumPart(slice[len(slice)/2:], c)\n\tx, y := <-c, <-c\n\treturn x + y\n}' },
    ],
    'Ruby': [
        { title: 'Say Hello', language: 'Ruby', difficulty: 'Very Easy', instructions: 'Write a method that takes a name and returns a greeting string.', boilerplateCode: 'def say_hello(name)\n  # Your code here\nend', correctSolution: 'def say_hello(name)\n  "Hello, #{name}!"\nend' },
        { title: 'Select Odd Numbers', language: 'Ruby', difficulty: 'Easy', instructions: 'Given an array of integers, return a new array with only the odd numbers.', boilerplateCode: 'def select_odds(numbers)\n  # Your code here\nend', correctSolution: 'def select_odds(numbers)\n  numbers.select { |n| n.odd? }\nend' },
        { title: 'Word Frequency Counter', language: 'Ruby', difficulty: 'Medium', instructions: 'Create a method that counts the frequency of each word in a string.', boilerplateCode: 'def word_frequency(sentence)\n  # Your code here\nend', correctSolution: 'def word_frequency(sentence)\n  words = sentence.downcase.split(/\\W+/)\n  words.each_with_object(Hash.new(0)) { |word, counts| counts[word] += 1 }\nend' },
        { title: 'Check for Prime Number', language: 'Ruby', difficulty: 'Easy', instructions: 'Write a method to check if a number is a prime number.', boilerplateCode: 'require \'prime\'\n\ndef is_prime?(number)\n  # Your code here\nend', correctSolution: 'require \'prime\'\n\ndef is_prime?(number)\n  number.prime?\nend' },
        { title: 'Caesar Cipher', language: 'Ruby', difficulty: 'Hard', instructions: 'Implement a Caesar cipher that shifts each letter by a given number.', boilerplateCode: 'def caesar_cipher(string, shift)\n  # Your code here\nend', correctSolution: 'def caesar_cipher(string, shift)\n  alphabet = Array(\'a\'..\'z\')\n  encrypter = Hash[alphabet.zip(alphabet.rotate(shift))]\n  string.chars.map { |c| encrypter.fetch(c.downcase, c) }.join\nend' },
    ],
    'PHP': [
        { title: 'Greeting Function', language: 'PHP', difficulty: 'Very Easy', instructions: 'Write a function that takes a name and returns a greeting.', boilerplateCode: '<?php\n\nfunction greet($name) {\n  // Your code here\n}', correctSolution: '<?php\n\nfunction greet($name) {\n  return "Hello, " . $name . "!";\n}' },
        { title: 'Count Array Elements', language: 'PHP', difficulty: 'Easy', instructions: 'Return the number of elements in a given array.', boilerplateCode: '<?php\n\nfunction countElements($array) {\n  // Your code here\n}', correctSolution: '<?php\n\nfunction countElements($array) {\n  return count($array);\n}' },
        { title: 'Validate Email Address', language: 'PHP', difficulty: 'Medium', instructions: 'Check if a given string is a valid email address.', boilerplateCode: '<?php\n\nfunction isValidEmail($email) {\n  // Your code here\n}', correctSolution: '<?php\n\nfunction isValidEmail($email) {\n  return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;\n}' },
        { title: 'Find Longest Word', language: 'PHP', difficulty: 'Easy', instructions: 'Find the longest word in a sentence.', boilerplateCode: '<?php\n\nfunction findLongestWord($sentence) {\n  // Your code here\n}', correctSolution: '<?php\n\nfunction findLongestWord($sentence) {\n  $words = explode(" ", $sentence);\n  $longest = "";\n  foreach ($words as $word) {\n    if (strlen($word) > strlen($longest)) {\n      $longest = $word;\n    }\n  }\n  return $longest;\n}' },
        { title: 'Simple User Class', language: 'PHP', difficulty: 'Hard', instructions: 'Create a "User" class with a name property and a greet method.', boilerplateCode: '<?php\n\nclass User {\n  // Your code here\n}', correctSolution: '<?php\n\nclass User {\n  public $name;\n\n  public function __construct($name) {\n    $this->name = $name;\n  }\n\n  public function greet() {\n    return "Hello, my name is " . $this->name;\n  }\n}' },
    ],
    'C++': [
        { title: 'Sum of Two Numbers', language: 'C++', difficulty: 'Very Easy', instructions: 'Write a function that returns the sum of two integers.', boilerplateCode: 'int sum(int a, int b) {\n    // Your code here\n}', correctSolution: 'int sum(int a, int b) {\n    return a + b;\n}' },
        { title: 'Get String Length', language: 'C++', difficulty: 'Easy', instructions: 'Return the length of a given string.', boilerplateCode: '#include <string>\n\nint getStringLength(std::string s) {\n    // Your code here\n}', correctSolution: '#include <string>\n\nint getStringLength(std::string s) {\n    return s.length();\n}' },
        { title: 'Longest Substring Without Repeating Characters', language: 'C++', difficulty: 'Medium', instructions: 'Find the length of the longest substring without repeating characters.', boilerplateCode: '#include <string>\n#include <unordered_map>\n\nint lengthOfLongestSubstring(std::string s) {\n    // Your code here\n}', correctSolution: '#include <string>\n#include <unordered_map>\n#include <algorithm>\n\nint lengthOfLongestSubstring(std::string s) {\n    std::unordered_map<char, int> map;\n    int maxLength = 0;\n    for (int i = 0, j = 0; j < s.length(); j++) {\n        if (map.count(s[j])) {\n            i = std::max(i, map[s[j]] + 1);\n        }\n        map[s[j]] = j;\n        maxLength = std::max(maxLength, j - i + 1);\n    }\n    return maxLength;\n}' },
        { title: 'Calculate Power', language: 'C++', difficulty: 'Easy', instructions: 'Calculate the power of a number (base^exponent).', boilerplateCode: '#include <cmath>\n\ndouble calculatePower(double base, int exp) {\n    // Your code here\n}', correctSolution: '#include <cmath>\n\ndouble calculatePower(double base, int exp) {\n    return pow(base, exp);\n}' },
        { title: 'Trapping Rain Water', language: 'C++', difficulty: 'Hard', instructions: 'Given an elevation map, compute how much water it can trap after raining.', boilerplateCode: '#include <vector>\n\nint trap(std::vector<int>& height) {\n    // Your code here\n}', correctSolution: '#include <vector>\n#include <algorithm>\n\nint trap(std::vector<int>& height) {\n    int n = height.size();\n    if (n == 0) return 0;\n    std::vector<int> leftMax(n), rightMax(n);\n    leftMax[0] = height[0];\n    for (int i = 1; i < n; i++) leftMax[i] = std::max(height[i], leftMax[i - 1]);\n    rightMax[n - 1] = height[n - 1];\n    for (int i = n - 2; i >= 0; i--) rightMax[i] = std::max(height[i], rightMax[i + 1]);\n    int water = 0;\n    for (int i = 0; i < n; i++) water += std::min(leftMax[i], rightMax[i]) - height[i];\n    return water;\n}' },
    ],
    'C': [
        { 
          title: 'Add Two Integers', 
          language: 'C', 
          difficulty: 'Very Easy', 
          instructions: 'Write a function to add two integers.', 
          boilerplateCode: 'int add(int a, int b) {\n    // Your code here\n}', 
          correctSolution: 'int add(int a, int b) {\n    return a + b;\n}',
          commonMistake: 'int add(int a, int b) {\n    SELECT * FROM customers;\n}',
          explanation: `<ul><li>In C, a function body can only contain valid C statements.</li><li><code>SELECT * FROM customers;</code> is a <strong>SQL query</strong>, which is not valid C code. This will cause a compiler error.</li></ul>`
        },
        { title: 'Check Leap Year', language: 'C', difficulty: 'Easy', instructions: 'Determine if a given year is a leap year.', boilerplateCode: '#include <stdbool.h>\n\nbool isLeap(int year) {\n    // Your code here\n}', correctSolution: '#include <stdbool.h>\n\nbool isLeap(int year) {\n    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);\n}' },
        { title: 'Find String Length', language: 'C', difficulty: 'Very Easy', instructions: 'Implement a function to find the length of a string without using the standard library.', boilerplateCode: 'int getLength(char* str) {\n    // Your code here\n}', correctSolution: 'int getLength(char* str) {\n    int length = 0;\n    while (str[length] != \'\\0\') {\n        length++;\n    }\n    return length;\n}' },
        { title: 'Reverse a Linked List', language: 'C', difficulty: 'Medium', instructions: 'Reverse a singly linked list. // struct ListNode { int val; struct ListNode *next; };', boilerplateCode: '// struct definition provided in comments\nstruct ListNode* reverseList(struct ListNode* head) {\n    // Your code here\n}', correctSolution: 'struct ListNode* reverseList(struct ListNode* head) {\n    struct ListNode* prev = NULL;\n    struct ListNode* current = head;\n    while (current != NULL) {\n        struct ListNode* nextTemp = current->next;\n        current->next = prev;\n        prev = current;\n        current = nextTemp;\n    }\n    return prev;\n}' },
        { title: 'String to Integer (atoi)', language: 'C', difficulty: 'Hard', instructions: 'Implement atoi, which converts a string to an integer, handling whitespace, signs, and overflow.', boilerplateCode: '#include <limits.h>\n\nint myAtoi(char* s) {\n    // Your code here\n}', correctSolution: '#include <limits.h>\n\nint myAtoi(char * s) {\n    long long result = 0;\n    int sign = 1;\n    int i = 0;\n    while (s[i] == \' \') i++;\n    if (s[i] == \'-\' || s[i] == \'+\') {\n        sign = (s[i++] == \'-\') ? -1 : 1;\n    }\n    while (s[i] >= \'0\' && s[i] <= \'9\') {\n        result = result * 10 + (s[i++] - \'0\');\n        if (result * sign > INT_MAX) return INT_MAX;\n        if (result * sign < INT_MIN) return INT_MIN;\n    }\n    return result * sign;\n}' },
    ],
    'SQL': [
        { title: 'Select All Columns', language: 'SQL', difficulty: 'Very Easy', instructions: 'Write a query to select all columns from the "customers" table.', boilerplateCode: '-- Write your SQL query here', correctSolution: 'SELECT * FROM customers;' },
        { title: 'Filter with WHERE', language: 'SQL', difficulty: 'Easy', instructions: 'Find all products from the "products" table where the price is greater than 50.', boilerplateCode: '-- Write your SQL query here', correctSolution: 'SELECT * FROM products WHERE price > 50;' },
        { title: 'Employees Earning More Than Managers', language: 'SQL', difficulty: 'Medium', instructions: 'Find employees who earn more than their managers from the "Employee" table (Id, Name, Salary, ManagerId).', boilerplateCode: '-- Write your SQL query here', correctSolution: 'SELECT e.Name AS Employee FROM Employee AS e JOIN Employee AS m ON e.ManagerId = m.Id WHERE e.Salary > m.Salary;' },
        { title: 'Count Rows', language: 'SQL', difficulty: 'Easy', instructions: 'Count the total number of orders in the "orders" table.', boilerplateCode: '-- Write your SQL query here', correctSolution: 'SELECT COUNT(*) FROM orders;' },
        { title: 'Nth Highest Salary', language: 'SQL', difficulty: 'Hard', instructions: 'Write a SQL query to get the Nth highest salary from the "Employee" table.', boilerplateCode: 'CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\nBEGIN\n  RETURN (\n      -- Write your SQL query here\n  );\nEND', correctSolution: 'CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT\nBEGIN\n  DECLARE M INT;\n  SET M = N - 1;\n  RETURN (\n      SELECT DISTINCT Salary\n      FROM Employee\n      ORDER BY Salary DESC\n      LIMIT 1 OFFSET M\n  );\nEND' },
    ]
};

const languages = [
    { name: 'Python', href: '#', iconColor: 'text-sky-400' },
    { name: 'JavaScript', href: '#', iconColor: 'text-yellow-400' },
    { name: 'TypeScript', href: '#', iconColor: 'text-blue-500' },
    { name: 'Java', href: '#', iconColor: 'text-red-400' },
    { name: 'Go', href: '#', iconColor: 'text-cyan-400' },
    { name: 'Ruby', href: '#', iconColor: 'text-red-600' },
    { name: 'PHP', href: '#', iconColor: 'text-indigo-400' },
    { name: 'C++', href: '#', iconColor: 'text-blue-400' },
    { name: 'C', href: '#', iconColor: 'text-gray-400' },
    { name: 'SQL', href: '#', iconColor: 'text-teal-400' },
];

export default function TechnicalHubLandingPage() {
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const challengesRef = useRef<HTMLDivElement>(null);

    const handleLanguageClick = (language: string) => {
        setSelectedLanguage(language);
        setChallenges(challengesByLanguage[language] || []);
        setTimeout(() => {
            challengesRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="bg-slate-50">
            <div className="relative isolate bg-white">
                <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">Master Any Technical Interview</h1>
                    <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-slate-600">From Python algorithms to SQL queries, our comprehensive challenge hub is designed to turn your knowledge into job offers.</p>
                </div>
            </div>
            <div className="container mx-auto px-6 py-24 sm:py-32 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Practice in the Language You Love</h2>
                    <p className="mt-4 text-lg text-slate-600">Select a language to start practicing with five curated challenges.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 md:gap-6">
                    {languages.map((lang) => (
                        <button key={lang.name} onClick={() => handleLanguageClick(lang.name)} className={`group block p-6 bg-white border rounded-xl transition-all duration-300 text-center ${selectedLanguage === lang.name ? 'border-indigo-500 ring-4 ring-indigo-100' : 'border-slate-200 hover:border-indigo-400 hover:-translate-y-1 shadow-sm hover:shadow-lg'}`}>
                            <LanguageIcon language={lang.name} className={`mx-auto mb-4 transition-colors ${lang.iconColor} ${selectedLanguage === lang.name ? '' : 'text-slate-500 group-hover:text-indigo-500'}`} />
                            <h3 className="text-xl font-bold text-slate-800">{lang.name}</h3>
                        </button>
                    ))}
                </div>
            </div>
            <div ref={challengesRef} className="transition-opacity duration-500">
                {selectedLanguage && challenges.length > 0 && (
                    <div className="container mx-auto px-6 pb-24 sm:pb-32 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Featured <span className="text-indigo-600">{selectedLanguage}</span> Challenges</h2>
                             <p className="mt-4 text-lg text-slate-600">Get started with these problems. More are available in the full challenge list.</p>
                        </div>
                        {challenges.map((challenge, index) => (
                            <ChallengeWindow key={`${selectedLanguage}-${index}`} challenge={challenge} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}