"use client";

import { useState, useRef } from 'react';
import { X, UploadCloud, FileText, AlertTriangle, Plus, RefreshCw, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";

// ====================================
// ===== RESUME UPLOAD MODAL COMPONENT =====
// ====================================
const ResumeUploadModal = ({ onClose, onGenerate, isLoading }: { onClose: () => void, onGenerate: (file: File) => void, isLoading: boolean }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf" && file.size <= 3 * 1024 * 1024) {
      setSelectedFile(file);
    } else {
      alert("Please upload a PDF file that is 3MB or less.");
      setSelectedFile(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleGenerateClick = () => {
    if (selectedFile) {
      onGenerate(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8 relative text-gray-800">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-2">Create resume interview questions</h2>
        <p className="text-gray-600 mb-6">
          Upload your resume and we will generate personalized interview questions for you to practice.
        </p>
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col justify-center items-center text-center cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition-all"
        >
          {selectedFile ? (
            <>
              <p className="font-semibold text-green-700">File Selected:</p>
              <p className="text-sm text-gray-600 mt-1">{selectedFile.name}</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-green-100 flex justify-center items-center">
                <UploadCloud size={24} className="text-green-600" />
              </div>
              <p className="font-semibold mt-4">Upload your resume</p>
              <p className="text-sm text-gray-500">.pdf up to 3MB</p>
            </>
          )}
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden"/>
        <Button 
          disabled={!selectedFile || isLoading}
          onClick={handleGenerateClick}
          className="w-full mt-6 bg-green-500 text-white font-semibold py-3 text-base hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? <><Loader2 size={20} className="animate-spin" /> Generating...</> : 'Create questions'}
        </Button>
      </div>
    </div>
  );
};

// ====================================
// ===== MAIN RESUME AI PAGE =====
// ====================================
export default function ResumeAiPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumes, setResumes] = useState<{ name: string, file: File, questions: { text: string, status: string, tags: string[] }[] }[]>([]);
  const [activeResumeIndex, setActiveResumeIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callGenerateApi = async (file: File, existingQuestions: string[] = []) => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('existingQuestions', JSON.stringify(existingQuestions));
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `Error: ${response.statusText}`);
      }
      return data.questions.map((q: string) => ({ text: q, status: "Not Practiced", tags: ["Resume-Based"] }));
    } catch (err: any) {
      if (err instanceof SyntaxError) {
          setError("Failed to get a valid response from the server. Please check your API key and restart the server.");
      } else {
          setError(err.message || "An unknown error occurred.");
      }
      console.error(err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuestions = async (file: File) => {
    const newQuestions = await callGenerateApi(file);
    if (newQuestions.length > 0) {
      const newResume = { name: file.name, file, questions: newQuestions };
      setResumes(prev => {
        const updatedResumes = [...prev, newResume];
        setActiveResumeIndex(updatedResumes.length - 1);
        return updatedResumes;
      });
      setIsModalOpen(false);
    }
  };

  const handleLoadMoreQuestions = async () => {
    if (activeResumeIndex === null) return;
    const currentResume = resumes[activeResumeIndex];
    if (!currentResume) return;
    const existingQuestionTexts = currentResume.questions.map(q => q.text);
    const newQuestions = await callGenerateApi(currentResume.file, existingQuestionTexts);
    if (newQuestions.length > 0) {
      const updatedResumes = [...resumes];
      updatedResumes[activeResumeIndex].questions.push(...newQuestions);
      setResumes(updatedResumes);
    } else if (!error) {
      alert("AI could not generate more unique questions for this resume.");
    }
  };

  const activeResume = activeResumeIndex !== null ? resumes[activeResumeIndex] : null;

  return (
    <>
      {isModalOpen && <ResumeUploadModal onClose={() => setIsModalOpen(false)} onGenerate={handleGenerateQuestions} isLoading={isLoading} />}
      <div className="bg-white min-h-screen w-full flex">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-50 border-r border-gray-200 p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800">Your resumes</h2>
          <div className="mt-4 space-y-2 flex-grow">
            {resumes.length === 0 ? (
              <div className="text-sm text-gray-500 flex items-start gap-2 p-2">
                <AlertTriangle size={16} className="mt-0.5 flex-shrink-0"/>
                <span>No Questions Yet. Upload a resume to start.</span>
              </div>
            ) : (
              resumes.map((resume, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveResumeIndex(index)}
                  className={`w-full text-left flex items-start gap-2 p-2 rounded-md font-semibold transition-colors ${activeResumeIndex === index ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FileText size={16} className="mt-0.5 flex-shrink-0"/>
                  <span className="truncate">{resume.name}</span>
                </button>
              ))
            )}
          </div>
          <div>
              <button className="text-sm font-semibold text-gray-600 hover:text-black">Get Hired Faster &gt;</button>
          </div>
        </aside>
        {/* Main Content */}
        <main className="w-3/4 p-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Practice questions based on your resume</h1>
              <p className="text-gray-600">Select a resume to view the questions generated from it, or upload a new resume to get started.</p>
            </div>
            <Button onClick={() => setIsModalOpen(true)} className="bg-green-500 text-white hover:bg-green-600 flex items-center gap-2">
              <Plus size={16}/> Upload a new resume
            </Button>
          </div>
          {error && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">{error}</div>}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-500 uppercase tracking-wider">
              <div className="col-span-8">Question</div>
              <div className="col-span-2">Tags</div>
              <div className="col-span-2">Status</div>
            </div>
            {!activeResume ? (
              <div className="p-16 text-center">
                <AlertTriangle size={32} className="mx-auto text-gray-400" />
                <p className="mt-4 font-semibold text-gray-700">No Questions Yet</p>
                <p className="text-sm text-gray-500">Upload a resume to generate your first set of questions.</p>
              </div>
            ) : (
              activeResume.questions.map((q, index) => (
                <div key={index} className="grid grid-cols-12 p-4 items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50">
                  <div className="col-span-8 text-gray-800 font-medium pr-4">{q.text}</div>
                  <div className="col-span-2 flex flex-wrap gap-2">
                    {q.tags.map((tag: string) => <span key={tag} className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-md border border-gray-200">{tag}</span>)}
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full border border-yellow-200">{q.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          {activeResume && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleLoadMoreQuestions}
                disabled={isLoading}
                className="bg-green-100 text-green-800 font-semibold hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                {isLoading ? "Generating..." : "Give me 5 more questions"}
              </Button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}