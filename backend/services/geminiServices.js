const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

async function main() {
 try {
     const response = await ai.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: 'Why is the sky blue?',
     }) 
    console.log(response.text);
 } catch (e) {
    console.error('error name: ', e.name);
    console.error('error message: ', e.message);
    console.error('error status: ', e.status);
 }

}

main();