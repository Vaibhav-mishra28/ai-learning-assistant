import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import {
  getQuiz,
  submitProgress,
  getQuizResults,
} from '../services/api';
import { useDarkMode } from '../contexts/DarkModeContext.jsx';

const TakeQuiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const canSubmit = useMemo(() => {
    if (!quiz) return false;
    return quiz.questions.every((_, idx) => answers[idx]);
  }, [quiz, answers]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await getQuiz(quizId);
        setQuiz(data);
      } catch (err) {
        setError(err?.response?.data?.error || 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };
    if (quizId) fetchQuiz();
  }, [quizId]);

  const handleSelect = (idx, option) => {
    setAnswers((prev) => ({ ...prev, [idx]: option }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    setSubmitting(true);
    setError('');
    try {
      const payloadAnswers = quiz.questions.map((_, idx) => ({
        questionIndex: idx,
        selectedAnswer: answers[idx],
        timeSpent: 0,
      }));

      const progress = await submitProgress({
        quizId: quiz._id,
        contentId: quiz.contentId,
        answers: payloadAnswers,
        timeTaken: 0,
      });

      const fullResults = await getQuizResults(quiz._id);
      setResult({
        progress,
        fullResults,
      });
    } catch (err) {
      setError(err?.response?.data?.error || 'Failed to submit answers');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={`w-full min-h-screen flex items-center justify-center transition-colors ${darkMode ? 'bg-[#1a1a1a]' : 'bg-[#EBDCCB]'}`}>
        <p className={`text-xl transition-colors ${darkMode ? 'text-white' : 'text-[#4b3b1c]'}`}>Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full min-h-screen flex flex-col items-center justify-center gap-4 transition-colors ${darkMode ? 'bg-[#1a1a1a]' : 'bg-[#EBDCCB]'}`}>
        <p className="text-xl text-red-600">{error}</p>
        <button
          onClick={() => navigate('/document')}
          className="bg-[#E2A16F] text-white px-4 py-2 rounded-lg"
        >
          Go back
        </button>
      </div>
    );
  }

  if (!quiz) return null;

  return (
    <div className={`w-full min-h-screen pt-[110px] p-6 transition-colors ${darkMode ? 'bg-[#1a1a1a]' : 'bg-[#EBDCCB]'}`}>
      <Navbar />

      <div className={`max-w-4xl mx-auto rounded-xl shadow p-6 transition-colors ${darkMode ? 'bg-[#2d2d2d]' : 'bg-[#FDF5EA]'}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[#4b3b1c]">Quiz</h1>
            <p className="text-sm text-[#4b3b1c]/70">
              Difficulty: {quiz.difficulty} • Questions: {quiz.numQuestions}
            </p>
          </div>
          <button
            className="text-sm text-[#E2A16F] underline"
            onClick={() => navigate('/document')}
          >
            Upload new content
          </button>
        </div>

        <div className="space-y-6">
          {quiz.questions.map((q, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-[#e8d6c5] p-4"
            >
              <p className="font-semibold text-[#4b3b1c] mb-3">
                Q{idx + 1}. {q.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(q.options).map(([key, value]) => (
                  <label
                    key={key}
                    className={`border rounded-lg p-3 cursor-pointer transition ${
                      answers[idx] === key
                        ? 'border-[#E2A16F] bg-[#fff6ee]'
                        : 'border-[#e8d6c5] bg-white hover:border-[#E2A16F]/60'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${idx}`}
                      value={key}
                      checked={answers[idx] === key}
                      onChange={() => handleSelect(idx, key)}
                      className="mr-2"
                    />
                    <span className="font-medium text-[#4b3b1c]">{key}.</span>{' '}
                    <span className="text-[#4b3b1c]/80">{value}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button
            disabled={!canSubmit || submitting}
            onClick={handleSubmit}
            className={`px-5 py-2 rounded-lg text-white transition ${
              !canSubmit || submitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#E2A16F] hover:scale-[1.02]'
            }`}
          >
            {submitting ? 'Submitting...' : 'Submit Answers'}
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-white rounded-lg border border-[#e8d6c5] p-4">
            <h2 className="text-xl font-semibold text-[#4b3b1c] mb-2">
              Results
            </h2>
            <p className="text-[#4b3b1c]/80">
              Score: {result.progress.score}% ({result.progress.correctAnswers}/
              {result.progress.totalQuestions})
            </p>

            <div className="mt-4 space-y-3">
              {result.fullResults.questions.map((q, idx) => {
                const userAnswer = answers[idx];
                const isCorrect = q.correctAnswer === userAnswer;
                return (
                  <div
                    key={idx}
                    className={`rounded-lg p-3 border ${
                      isCorrect
                        ? 'border-green-200 bg-green-50'
                        : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <p className="font-semibold text-[#4b3b1c]">
                      Q{idx + 1}. {q.question}
                    </p>
                    <p className="text-sm text-[#4b3b1c]/80">
                      Your answer: {userAnswer || 'Not answered'}
                    </p>
                    <p className="text-sm text-[#4b3b1c]/80">
                      Correct answer: {q.correctAnswer}
                    </p>
                    <p className="text-sm text-[#4b3b1c]/90 mt-1">
                      Explanation: {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;
