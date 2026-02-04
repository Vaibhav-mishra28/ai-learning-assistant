import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { uploadContent, uploadPDF, generateQuiz } from '../services/api';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';

// Simple cleaner to make Gemini markdown summaries more readable
const cleanSummary = (text) => {
  if (!text) return '';
  let cleaned = text;
  // Remove code fences
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
  // Remove headings markers
  cleaned = cleaned.replace(/^\s*#{1,6}\s*/gm, '');
  // Convert bullets to a simple dot
  cleaned = cleaned.replace(/^\s*[-*+]\s+/gm, '• ');
  // Trim extra asterisks/underscores
  cleaned = cleaned.replace(/[*_]{2,}/g, '');
  // Collapse multiple blank lines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  return cleaned.trim();
};

// Turn cleaned text into display-friendly blocks (headings, subheadings, bullets, paragraphs)
const parseSummaryBlocks = (text) => {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);

  const blocks = [];
  let bulletBuffer = [];

  const looksLikeSubheading = (line) => {
    const keywords = /^(objective|problem|motivation|solution|approach|methodology|results|conclusion|summary|key points|overview)\b/i;
    return keywords.test(line) || /:\s*$/.test(line);
  };

  const flushBullets = () => {
    if (bulletBuffer.length) {
      blocks.push({ type: 'bullets', items: bulletBuffer.slice() });
      bulletBuffer = [];
    }
  };

  lines.forEach((line, idx) => {
    // Treat first line as a heading-ish line if it's not a bullet
    if (idx === 0 && !/^•\s+/.test(line)) {
      flushBullets();
      blocks.push({ type: 'heading', text: line });
      return;
    }

    // Subheading detection
    if (!/^•\s+/.test(line) && looksLikeSubheading(line)) {
      flushBullets();
      blocks.push({ type: 'subheading', text: line.replace(/:$/, '') });
      return;
    }

    // Bullets
    if (/^•\s+/.test(line)) {
      bulletBuffer.push(line.replace(/^•\s+/, ''));
      return;
    }

    // Numbered bullets like "1. ..." or "- ..."
    if (/^(\d+\.\s+|-+\s+)/.test(line)) {
      const normalized = line.replace(/^(\d+\.\s+|-+\s+)/, '');
      bulletBuffer.push(normalized);
      return;
    }

    // Paragraph
    flushBullets();
    blocks.push({ type: 'paragraph', text: line });
  });

  flushBullets();
  return blocks;
};

const Document = () => {
  const { darkMode } = useDarkMode();
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const [contentId, setContentId] = useState(null);
  const [summary, setSummary] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [quizLoading, setQuizLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    setSummary(null);
    setContentId(null);
    setUploading(true);

    try {
      let resp;
      if (file) {
        resp = await uploadPDF({ file, title });
      } else if (text.trim()) {
        resp = await uploadContent({ text, title });
      } else {
        setError('Please provide text or a PDF file.');
        return;
      }
      setContentId(resp.contentId);
      const readableSummary = cleanSummary(
        resp.summary || 'Summary is being prepared...'
      );
      setSummary(readableSummary);
    } catch (err) {
      setError(err?.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!contentId) return;
    setQuizLoading(true);
    setError('');
    try {
      const quiz = await generateQuiz({
        contentId,
        numQuestions: 5,
        difficulty: 'medium',
      });
      navigate(`/quiz/${quiz._id}`);
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to generate quiz');
    } finally {
      setQuizLoading(false);
    }
  };

  return (
    <div className={`w-full min-h-screen pt-[110px] p-6 transition-colors ${darkMode ? 'bg-[#1a1a1a]' : 'bg-[#EBDCCB]'}`}>
      <Navbar />
      <div className={`max-w-4xl mx-auto rounded-xl shadow p-6 transition-colors ${darkMode ? 'bg-[#2d2d2d]' : 'bg-[#FDF5EA]'}`}>
        <h1 className={`text-3xl font-bold mb-4 transition-colors ${darkMode ? 'text-white' : 'text-[#4b3b1c]'}`}>
          Upload Content
        </h1>
        <p className={`mb-4 transition-colors ${darkMode ? 'text-gray-300' : 'text-[#4b3b1c]/80'}`}>
          Paste text or upload a PDF to generate a summary and quiz.
        </p>

        <form className="space-y-4" onSubmit={handleUpload}>
          <div className="flex flex-col gap-2">
            <label className={`text-sm font-semibold transition-colors ${darkMode ? 'text-white' : 'text-[#4b3b1c]'}`}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Optional title"
              className={`border rounded-lg p-2 transition-colors ${darkMode ? 'border-gray-600 bg-[#1a1a1a] text-white placeholder-gray-400' : 'border-[#e8d6c5] bg-white'}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={`text-sm font-semibold transition-colors ${darkMode ? 'text-white' : 'text-[#4b3b1c]'}`}>
              Paste text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="Paste your study material..."
              className={`border rounded-lg p-3 transition-colors ${darkMode ? 'border-gray-600 bg-[#1a1a1a] text-white placeholder-gray-400' : 'border-[#e8d6c5] bg-white'}`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={`text-sm font-semibold transition-colors ${darkMode ? 'text-white' : 'text-[#4b3b1c]'}`}>
              Or upload a PDF
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className={`border rounded-lg p-2 transition-colors ${darkMode ? 'border-gray-600 bg-[#1a1a1a] text-white' : 'border-[#e8d6c5] bg-white'}`}
            />
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded p-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className={`px-4 py-2 rounded-lg text-white ${
              uploading ? 'bg-gray-400' : 'bg-[#E2A16F] hover:scale-[1.02]'
            } transition`}
          >
            {uploading ? 'Uploading...' : 'Upload & Summarize'}
          </button>
        </form>

        {summary && (
          <div className={`mt-6 border rounded-lg p-4 transition-colors ${darkMode ? 'bg-[#1a1a1a] border-gray-700' : 'bg-white border-[#e8d6c5]'}`}>
            <h2 className={`text-xl font-semibold mb-2 transition-colors ${darkMode ? 'text-white' : 'text-[#4b3b1c]'}`}>
              Summary
            </h2>
            <div className={`space-y-3 transition-colors ${darkMode ? 'text-gray-200' : 'text-[#4b3b1c]'}`}>
              {parseSummaryBlocks(summary).map((block, idx) => {
                if (block.type === 'heading') {
                  return (
                    <p
                      key={idx}
                      className={`text-xl font-semibold transition-colors ${darkMode ? 'text-white' : 'text-[#4b3b1c]'}`}
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'subheading') {
                  return (
                    <p
                      key={idx}
                      className={`text-lg font-semibold transition-colors ${darkMode ? 'text-white' : 'text-[#4b3b1c]'}`}
                    >
                      {block.text}
                    </p>
                  );
                }
                if (block.type === 'bullets') {
                  return (
                    <ul key={idx} className="list-disc list-inside space-y-1">
                      {block.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {block.text}
                  </p>
                );
              })}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleGenerateQuiz}
                disabled={!contentId || quizLoading}
                className={`px-4 py-2 rounded-lg text-white ${
                  !contentId || quizLoading
                    ? 'bg-gray-400'
                    : 'bg-[#E2A16F] hover:scale-[1.02]'
                } transition`}
              >
                {quizLoading ? 'Generating quiz...' : 'Generate Quiz'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Document;
