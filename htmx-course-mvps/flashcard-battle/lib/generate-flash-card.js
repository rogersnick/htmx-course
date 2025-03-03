// Function to generate a flashcard using OpenAI
const ai = require('ai');
const openaiSDK = require("@ai-sdk/openai");

const prompt = `
Task:
Generate a multiple-choice question with four options.

Response:
Please provide a response in plain valid json, without any markdown formatting.

Format:
{
  "question": "...",
  "choices": ["A: ...", "B: ...", "C: ...", "D: ..."],
  "answer": "Correct Answer" 
}
`

async function generateFlashcard() {
  try {
    const { text } = await ai.generateText({
      model: openaiSDK.openai('gpt-4o-mini'),
      system: "You are a cave man struggling to communicate, and can only use one syllable words.",
      prompt,
      temperature: 0.9,
    });
    console.log(text);
    const response = JSON.parse(text);
    return response;
  } catch (error) {
    console.error("Error generating flashcard:", error);
    return {
      question: "Error generating question.",
      choices: [],
      answer: "N/A",
    };
  }
}

module.exports = { generateFlashcard };
