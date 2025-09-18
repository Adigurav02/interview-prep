"use client";

import { useState, useEffect } from 'react';
import { CheckSquare, Square } from 'lucide-react';

// --- Puzzle Data ---
const puzzles = {
  easy: [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0]
  ],
  medium: [
    [0, 2, 0, 6, 0, 8, 0, 0, 0],
    [5, 8, 0, 0, 0, 9, 7, 0, 0],
    [0, 0, 0, 0, 4, 0, 0, 0, 0],
    [3, 7, 0, 0, 0, 0, 5, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 8, 0, 0, 0, 0, 1, 3],
    [0, 0, 0, 0, 2, 0, 0, 0, 0],
    [0, 0, 9, 8, 0, 0, 0, 3, 6],
    [0, 0, 0, 3, 0, 6, 0, 9, 0]
  ],
  hard: [
    [0, 0, 0, 6, 0, 0, 4, 0, 0],
    [7, 0, 0, 0, 0, 3, 6, 0, 0],
    [0, 0, 0, 0, 9, 1, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 1, 8, 0, 0, 0, 3],
    [0, 0, 0, 3, 0, 6, 0, 4, 5],
    [0, 4, 0, 2, 0, 0, 0, 6, 0],
    [9, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 1, 0, 0]
  ],
};
const emptyPuzzle = Array(9).fill(0).map(() => Array(9).fill(0));

// --- Sudoku Solver Logic (Backtracking Algorithm) ---
const solveSudoku = (board: number[][]): number[][] | null => {
  const findEmpty = (b: number[][]): [number, number] | null => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (b[r][c] === 0) return [r, c];
      }
    }
    return null;
  };

  const isValid = (b: number[][], num: number, pos: [number, number]): boolean => {
    const [row, col] = pos;
    // Check row
    for (let i = 0; i < 9; i++) {
      if (b[row][i] === num && col !== i) return false;
    }
    // Check column
    for (let i = 0; i < 9; i++) {
      if (b[i][col] === num && row !== i) return false;
    }
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (b[i][j] === num && (i !== row || j !== col)) return false;
      }
    }
    return true;
  };

  const newBoard = board.map(row => [...row]);
  
  function solve(): boolean {
      const emptyPos = findEmpty(newBoard);
      if (!emptyPos) return true; // Solved
      
      const [row, col] = emptyPos;

      for (let num = 1; num <= 9; num++) {
          if (isValid(newBoard, num, [row, col])) {
              newBoard[row][col] = num;
              if (solve()) return true;
              newBoard[row][col] = 0; // Backtrack
          }
      }
      return false;
  }

  if (solve()) return newBoard;
  return null; // Not solvable
};


// --- Reusable Components ---
const SudokuRules = () => (
    <div className="mt-12 text-center animate-fadeIn">
        <h3 className="text-xl font-bold text-green-600">Sudoku Rules</h3>
        <p className="mt-2 text-gray-700 max-w-2xl mx-auto">The objective of sudoku is to enter a digit from 1 through 9 in each cell in such a way that:</p>
        
        <div className="mt-6 flex flex-col items-center gap-6">
            {/* Visual Guide */}
            <div className="grid grid-cols-9 w-64 h-64 border-2 border-gray-700">
                {Array(81).fill(0).map((_, i) => {
                    const row = Math.floor(i / 9);
                    const col = i % 9;
                    let bg = 'bg-white';
                    if (row === 3) bg = 'bg-pink-300'; // Horizontal Row
                    if (col === 5) bg = 'bg-yellow-300'; // Vertical Column
                    if (row >= 3 && row <= 5 && col >= 0 && col <= 2) bg = 'bg-green-400'; // Subgrid
                    if (row === 3 && col === 5) bg = 'bg-gradient-to-br from-pink-300 to-yellow-300';
                    
                    const borderRight = (col === 2 || col === 5) ? 'border-r-2 border-r-gray-500' : 'border-r border-r-gray-300';
                    const borderBottom = (row === 2 || row === 5) ? 'border-b-2 border-b-gray-500' : 'border-b border-b-gray-300';

                    return <div key={i} className={`${bg} ${borderRight} ${borderBottom}`} />;
                })}
            </div>
            
            {/* Rules Text */}
            <ul className="text-left max-w-md mx-auto space-y-2 list-disc list-inside">
                <li className="text-gray-800">Each horizontal row (shown in pink) contains each digit exactly once.</li>
                <li className="text-gray-800">Each vertical column (shown in yellow) contains each digit exactly once.</li>
                <li className="text-gray-800">Each subgrid or region (shown in green) contains each digit exactly once.</li>
            </ul>
        </div>
    </div>
);


// --- MAIN PAGE COMPONENT ---
export default function SudokuPage() {
    const [initialPuzzle, setInitialPuzzle] = useState(puzzles.medium);
    const [puzzle, setPuzzle] = useState(puzzles.medium);
    const [activeDifficulty, setActiveDifficulty] = useState('Medium');
    const [showRules, setShowRules] = useState(false);

    const handleDifficultyChange = (level: 'easy' | 'medium' | 'hard' | 'my') => {
        if (level === 'my') {
            setInitialPuzzle(emptyPuzzle);
            setPuzzle(emptyPuzzle);
            setActiveDifficulty('My Sudoku');
            return;
        }
        setInitialPuzzle(puzzles[level]);
        setPuzzle(puzzles[level]);
        setActiveDifficulty(level.charAt(0).toUpperCase() + level.slice(1));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => {
        const value = e.target.value;
        const num = parseInt(value.slice(-1), 10);
        if (!isNaN(num) && num >= 1 && num <= 9) {
            const newPuzzle = puzzle.map(r => [...r]);
            newPuzzle[row][col] = num;
            setPuzzle(newPuzzle);
        } else if (value === '') {
            const newPuzzle = puzzle.map(r => [...r]);
            newPuzzle[row][col] = 0;
            setPuzzle(newPuzzle);
        }
    };
    
    const handleReset = () => {
        setPuzzle(initialPuzzle);
    };

    const handleSolve = () => {
        const solution = solveSudoku(initialPuzzle);
        if (solution) {
            setPuzzle(solution);
        } else {
            alert("This puzzle has no solution!");
        }
    };

    const subPageLinks = ["Sudoku"];

    return (
        <div className="bg-white min-h-screen">
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="border border-gray-200 rounded-lg p-6">
                    <p className="text-sm text-gray-500 mb-4">Exercise : <span className="font-semibold text-green-600">Sudoku</span></p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <aside className="md:col-span-1">
                            <nav className="space-y-1">
                                {subPageLinks.map(linkText => (
                                    <button key={linkText} className={`w-full flex items-center gap-3 p-2 rounded-md text-left text-sm font-medium transition-colors ${linkText === 'Sudoku' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}>
                                        {linkText === 'Sudoku' ? <CheckSquare size={16} /> : <Square size={16} />}
                                        {linkText}
                                    </button>
                                ))}
                            </nav>
                        </aside>

                        {/* Main Content */}
                        <div className="md:col-span-3 flex flex-col items-center">
                            <h2 className="text-xl font-bold text-green-600 mb-6">Today's Sudoku</h2>
                            
                            {/* Sudoku Grid */}
                            <div className="grid grid-cols-9 border-2 border-gray-700">
                                {puzzle.map((row, rowIndex) =>
                                    row.map((cell, colIndex) => {
                                        const isInitial = initialPuzzle[rowIndex][colIndex] !== 0;
                                        const borderRight = (colIndex === 2 || colIndex === 5) ? 'border-r-2 border-r-gray-600' : 'border-r border-r-gray-300';
                                        const borderBottom = (rowIndex === 2 || rowIndex === 5) ? 'border-b-2 border-b-gray-600' : 'border-b border-b-gray-300';
                                        
                                        return (
                                            <input
                                                key={`${rowIndex}-${colIndex}`}
                                                type="text"
                                                maxLength={1}
                                                value={cell === 0 ? '' : cell}
                                                disabled={isInitial}
                                                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                                                className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-xl sm:text-2xl ${borderRight} ${borderBottom} ${isInitial ? 'font-bold bg-gray-200 text-gray-900' : 'text-blue-600 bg-white'}`}
                                            />
                                        );
                                    })
                                )}
                            </div>
                            
                            {/* Game Controls */}
                            <div className="flex gap-4 mt-6">
                                <button onClick={handleReset} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors">Reset Puzzle</button>
                                <button onClick={handleSolve} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors">Solve Puzzle</button>
                            </div>
                            
                            {/* Difficulty Buttons */}
                            <div className="flex gap-2 sm:gap-4 mt-4">
                                {['easy', 'medium', 'hard', 'my'].map(level => {
                                    const levelText = level === 'my' ? 'My Sudoku' : level.charAt(0).toUpperCase() + level.slice(1);
                                    return (
                                        <button 
                                            key={level}
                                            onClick={() => handleDifficultyChange(level as 'easy' | 'medium' | 'hard' | 'my')}
                                            className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base border-2 rounded-md transition-colors ${activeDifficulty === levelText ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-600 border-green-600 hover:bg-green-50'}`}
                                        >
                                            {levelText}
                                        </button>
                                    )
                                })}
                            </div>

                            {/* Rules Toggle and Content */}
                             <button onClick={() => setShowRules(!showRules)} className="mt-8 text-green-600 hover:underline">
                                {showRules ? 'Hide Sudoku Rules' : 'Show Sudoku Rules'}
                            </button>
                            {showRules && <SudokuRules />}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}