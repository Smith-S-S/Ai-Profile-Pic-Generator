// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from '@google/genai';

export async function AiPromptResult(prompt: string) {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  const config = {
    thinkingConfig: {
      thinkingBudget: 0,
    },
    systemInstruction: [
      {
        text: `No explanation, just the JSON prompt only`,
      },
    ],
  };
  const model = 'gemini-2.5-flash-lite';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }
  return { response: { text: () => result } };
}
