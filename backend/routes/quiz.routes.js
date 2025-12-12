const express = require('express');
const Content = require('../models/Content.models');
const Quiz = require('../models/Quiz.models');
const { generateQuiz } = require('../services/geminiServices');

const router = express.Router();

// Helper: basic validation for a single question object
function isValidQuestion(q) {
  if (!q || typeof q !== 'object') return false;
  if (typeof q.question !== 'string' || q.question.trim().length === 0) return false;
  if (!q.options || typeof q.options !== 'object') return false;
  const opts = ['A','B','C','D'];
  for (const k of opts) {
    if (typeof q.options[k] !== 'string' || q.options[k].trim().length === 0) return false;
  }
  if (!['A','B','C','D'].includes(q.correctAnswer)) return false;
  // Check explanation exists (required by model)
  if (!q.explanation || typeof q.explanation !== 'string' || q.explanation.trim().length === 0) return false;
  return true;
}

// POST /api/quiz - generate and store quiz from contentId
router.post('/', async (req, res, next) => {
  try {
    const { contentId, numQuestions = 5, difficulty = 'medium' } = req.body;

    if (!contentId) return res.status(400).json({ error: 'contentId is required' });

    // Clamp numQuestions (schema max is 20)
    const n = Math.max(1, Math.min(20, parseInt(numQuestions, 10) || 5));

    const content = await Content.findById(contentId);
    if (!content || !content.text) {
      return res.status(404).json({ error: 'Content not found or empty' });
    }

    // Call LLM to generate quiz data
    const quizData = await generateQuiz(content.text, n, difficulty);

    // Validate structure
    if (!quizData || !Array.isArray(quizData.questions) || quizData.questions.length === 0) {
      return res.status(500).json({ error: 'Quiz generation failed: invalid response from generator' });
    }

    // Sanitize & validate each question
    const validQuestions = [];
    for (const q of quizData.questions) {
      // Normalization with required explanation
      const normalized = {
        question: (q.question || '').toString().trim().slice(0, 1000),
        options: {
          A: (q.options?.A || '').toString().trim().slice(0, 300),
          B: (q.options?.B || '').toString().trim().slice(0, 300),
          C: (q.options?.C || '').toString().trim().slice(0, 300),
          D: (q.options?.D || '').toString().trim().slice(0, 300),
        },
        correctAnswer: (q.correctAnswer || '').toString().trim(),
        // FIXED: Provide default explanation if missing (required by model)
        explanation: (q.explanation || 'No explanation provided.').toString().trim().slice(0, 1000)
      };

      if (!isValidQuestion(normalized)) {
        continue; // Skip invalid questions
      }
      validQuestions.push(normalized);
    }

    if (validQuestions.length === 0) {
      return res.status(500).json({ error: 'Quiz generation failed: no valid questions produced' });
    }

    // Create quiz doc
    const quizDoc = await Quiz.create({
      contentId,
      questions: validQuestions,
      difficulty,
      numQuestions: validQuestions.length,
      quizType: 'mcq',
      isTaken: false,
    });

    return res.status(201).json(quizDoc);
  } catch (err) {
    console.error('Quiz generation error:', err);
    next(err);
  }
});

// GET /api/quiz/:id - fetch stored quiz (public view: hide correct answers for taking quiz)
router.get('/:id', async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).lean();
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    // Return version without revealing correct answers or explanations
    const publicQuiz = {
      _id: quiz._id,
      contentId: quiz.contentId,
      difficulty: quiz.difficulty,
      numQuestions: quiz.numQuestions,
      quizType: quiz.quizType,
      isTaken: quiz.isTaken,
      createdAt: quiz.createdAt,
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options
        // Intentionally omit correctAnswer and explanation
      }))
    };

    return res.json(publicQuiz);
  } catch (err) {
    next(err);
  }
});

// GET /api/quiz/:id/results - fetch quiz with answers (for showing results after submission)
router.get('/:id/results', async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).lean();
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    // Return full quiz with answers and explanations
    return res.json(quiz);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
