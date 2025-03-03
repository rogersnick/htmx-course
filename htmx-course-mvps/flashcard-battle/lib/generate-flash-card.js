// Function to generate a flashcard using OpenAI
const ai = require('ai');
const openaiSDK = require("@ai-sdk/openai");

const prompt = `
Task:
Generate a challenging trivia question.

Response:
Reply with valid json responses.

Format:
{
  "question": "...",
  "answer": "..."
}
`

async function generateFlashcard() {
  try {
    const { text } = await ai.generateText({
      model: openaiSDK.openai('gpt-4o-mini'),
      system: "You are an unpredictable quiz master.",
      prompt,
      temperature: 0.9,
    });

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
