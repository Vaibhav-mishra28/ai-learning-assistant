const express = require('express');
const Progress = require('../models/Progress.models');
const Quiz = require('../models/Quiz.models');

const router = express.Router();

// POST /api/progress - record quiz attempt
router.post('/', async (req, res, next) => {
  try {
    const { quizId, contentId, answers = [], timeTaken = 0 } = req.body;

    if (!quizId || !contentId) {
      return res.status(400).json({ error: 'quizId and contentId are required' });
    }

    // Fetch quiz to validate and get correct answers
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const totalQuestions = quiz.questions.length;
    
    // Validate answers array
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: 'answers array is required and must not be empty' });
    }

    // Validate answers length matches quiz
    if (answers.length !== totalQuestions) {
      return res.status(400).json({ 
        error: `Answers count (${answers.length}) must match quiz questions count (${totalQuestions})` 
      });
    }

    // Process and validate each answer, calculate isCorrect on backend
    const processedAnswers = [];
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      
      // Validate required fields
      if (typeof answer.questionIndex !== 'number' || 
          answer.questionIndex < 0 || 
          answer.questionIndex >= totalQuestions) {
        return res.status(400).json({ 
          error: `Invalid questionIndex at position ${i}: must be between 0 and ${totalQuestions - 1}` 
        });
      }

      if (!['A', 'B', 'C', 'D'].includes(answer.selectedAnswer)) {
        return res.status(400).json({ 
          error: `Invalid selectedAnswer at position ${i}: must be A, B, C, or D` 
        });
      }

      // Get correct answer from quiz
      const question = quiz.questions[answer.questionIndex];
      if (!question) {
        return res.status(400).json({ 
          error: `Question at index ${answer.questionIndex} not found` 
        });
      }

      // Calculate isCorrect on backend (don't trust frontend)
      const isCorrect = question.correctAnswer === answer.selectedAnswer;

      processedAnswers.push({
        questionIndex: answer.questionIndex,
        selectedAnswer: answer.selectedAnswer,
        isCorrect: isCorrect, // Calculated here, not from frontend
        timeSpent: answer.timeSpent || 0
      });
    }

    // Calculate score
    const correctAnswers = processedAnswers.filter(a => a.isCorrect).length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Create progress doc (removed 'completed' field - not in model)
    const progressDoc = await Progress.create({
      quizId,
      contentId,
      answers: processedAnswers,
      score,
      correctAnswers,
      totalQuestions,
      timeTaken: Math.max(0, timeTaken || 0),
      completedAt: new Date()
    });

    // Update quiz isTaken status
    quiz.isTaken = true;
    await quiz.save();

    return res.status(201).json(progressDoc);
  } catch (err) {
    next(err);
  }
});

// GET /api/progress/:quizId - get progress history for a quiz
router.get('/:quizId', async (req, res, next) => {
  try {
    const progress = await Progress.find({ quizId: req.params.quizId })
      .sort({ createdAt: -1 })
      .lean();
    
    return res.json(progress);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
