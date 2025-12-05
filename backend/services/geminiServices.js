const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

/**
 * Generate a summary of the provided content
 * @param {string} content - The content to summarize
 * @param {string} length - Summary length: 'short', 'medium', or 'detailed' (default: 'medium')
 * @returns {Promise<string>} - The generated summary
 */

async function generateSummary(content, length = 'medium') {
   try {

      if(!content || typeof content !== 'string' || content.trim().length === 0){
         throw new Error('Content is required and must be a non-empty string');
      }

      const lengthInstructions = {
         short: 'Provide a concise summary of the main points',
         medium: 'Provide a detailed summary of the main points',
         detailed: 'Provide a comprehensive summary of the main points',
      };

      const prompt = `${lengthInstructions[length] || lengthInstructions.medium}\n\nContent:\n${content}`;

      const response = await ai.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: prompt,
      });

      return response.text || response;
      
   } catch (error) {
      console.error('Error generating summary:', error);
      throw new Error(`Failed to generate summary: ${error.message}`);
   }
}



/**
 * Generate a quiz based on the provided content
 * @param {string} content - The content to generate quiz from
 * @param {number} numQuestions - Number of questions to generate (default: 5)
 * @param {string} difficulty - Difficulty level: 'easy', 'medium', or 'hard' (default: 'medium')
 * @returns {Promise<Object>} - Quiz object with questions array
 */

async function generateQuiz(content, numQuestions = 5, difficulty = 'medium') {
   try {
      if (!content || typeof content !== 'string' || content.trim().length === 0) {
         throw new Error('Content is required and must be a non-empty string');
       }

       if(numQuestions < 1 || numQuestions > 20){
         throw new Error('Number of questions must be between 1 and 20');
       }

       const prompt = `Generate a multiple-choice quiz based on the following content. 
       Create ${numQuestions} questions with ${difficulty} difficulty level.
       For each question, provide:
       1. The question text
       2. Four answer options (A, B, C, D)
       3. The correct answer (A, B, C, or D)
       4. A brief explanation for the correct answer
       
       Format the response as a JSON object with this structure:
       {
         "questions": [
           {
             "question": "Question text here",
             "options": {
               "A": "Option A text",
               "B": "Option B text",
               "C": "Option C text",
               "D": "Option D text"
             },
             "correctAnswer": "A",
             "explanation": "Explanation for why this is correct"
           }
         ]
       }

       Content:\n${content}`;

       const response = await ai.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: prompt,
       });

       const responseText = response.text || response;

       //Try to parse json from the response
       //Sometimes AI wraps JSON in markdown code
       let quizData;
       try {

         const cleanedText = responseText.replace(/\n?/g, '').replace(/```\n?/g, '').trim();
         quizData = JSON.parse(cleanedText);

       } catch (error) {
         //if JSON parsing fails, try to extract JSON from the text
         const jsonMatch = responseText.match(/\{[\s\S]*\}/);
         if(jsonMatch){
            quizData = JSON.parse(jsonMatch[0]);
         } else {
            throw new Error('Failed to parse quiz data from AI response');
         }
       }

      //validate quiz structure
      if(!quizData || !quizData.questions || !Array.isArray(quizData.questions)){
         throw new Error('Invalid quiz data format returned by AI');
      }

      return quizData;

   } catch (error) {
      console.error('Error generating quiz:', error);
      throw new Error(`Failed to generate quiz: ${error.message}`);
   }
}


module.exports = {
   generateSummary,
   generateQuiz,
};