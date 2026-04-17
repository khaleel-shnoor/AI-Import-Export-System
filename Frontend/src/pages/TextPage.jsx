import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function TextPage({ title, content, onBack }) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-white font-sans overflow-x-hidden">
      <nav className="w-full bg-[#1a2744] text-white flex items-center px-8 py-5 shrink-0 shadow-md">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mr-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <span className="text-xl font-bold font-serif tracking-wide">
          SHNOOR INTERNATIONAL
        </span>
      </nav>

      <main className="flex-1 w-full max-w-4xl mx-auto py-16 px-8">
        <h1 className="text-4xl font-bold text-[#1a2744] font-serif mb-8">{title}</h1>
        <div className="prose prose-blue max-w-none text-gray-700 space-y-6 text-lg leading-relaxed">
          {content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </main>

      <footer className="bg-[#1a2744] py-8 px-8 w-full border-t border-gray-800 text-center text-sm text-gray-400">
        © 2025 Shnoor International LLC. All rights reserved.
      </footer>
    </div>
  );
}
