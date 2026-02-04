import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Content
export const uploadContent = async ({ text, title = '' }) => {
  const res = await api.post('/content', { text, title });
  return res.data;
};

export const uploadPDF = async ({ file, title = '' }) => {
  const formData = new FormData();
  formData.append('file', file);
  if (title) formData.append('title', title);

  const res = await api.post('/content', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

// Quiz
export const generateQuiz = async ({
  contentId,
  numQuestions = 5,
  difficulty = 'medium',
}) => {
  const res = await api.post('/quiz', { contentId, numQuestions, difficulty });
  return res.data;
};

export const getQuiz = async (quizId) => {
  const res = await api.get(`/quiz/${quizId}`);
  return res.data;
};

export const getQuizResults = async (quizId) => {
  const res = await api.get(`/quiz/${quizId}/results`);
  return res.data;
};

// Progress
export const submitProgress = async ({
  quizId,
  contentId,
  answers,
  timeTaken = 0,
}) => {
  const res = await api.post('/progress', {
    quizId,
    contentId,
    answers,
    timeTaken,
  });
  return res.data;
};

export default api;
