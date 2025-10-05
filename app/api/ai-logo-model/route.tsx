import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import mime from 'mime';
import { AiPromptResult } from '@/configs/AiModel';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';

// Use native Buffer if needed (for base64 conversion)
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: Request) {
  const { prompt, email, title, desc, type, userCredit } = await request.json();
  let base64ImageWithMime = "";
  let imageUrl = ""; // Declare imageUrl at function scope

  try {
    // Step 1: Use Gemini (text model) to refine the prompt if needed
    // (Assuming AiPromptResult is custom function using Gemini or similar)
    const result = await AiPromptResult(prompt);
    let responseText = result.response.text();
    responseText = responseText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(responseText);
    console.log('AI logo prompt result:', parsed);

    // Step 2: Generate image using Gemini 2.5 Flash Image Preview model
    const model = 'gemini-2.5-flash-image-preview';

    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: parsed.prompt || prompt, // use refined prompt if available
          },
        ],
      },
    ];

    if (type == "Pro") {
    const imageResponse = await genAI.models.generateContentStream({
      model,
      contents,
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    });

    // Step 3: Parse streamed image content
    let base64Image = '';
    for await (const chunk of imageResponse) {
      const part = chunk?.candidates?.[0]?.content?.parts?.[0];
      if (part?.inlineData?.data) {
        base64Image = part.inlineData.data; // This is already base64
        break;
      }
    }

    if (!base64Image) {
      throw new Error('No image returned from Gemini model');
    }

    const mimeType = 'image/png'; // Default, or parse from model if available
    base64ImageWithMime = `data:${mimeType};base64,${base64Image}`;

    // Don't store image in Firestore - it's too large
    // Just return the full image to the user
    imageUrl = base64ImageWithMime;

    if (userCredit) {
      // Deduct user credits or perform any other logic
      await updateDoc(doc(db, 'users', email), { credits: userCredit - 1 });
    }

    } else {
      // For free users, also return full image
      imageUrl = base64ImageWithMime;
    }

    // Save only metadata to Firestore (no image data)
    try {
      const timestamp = Date.now().toString();
      
      await setDoc(doc(db, 'users', email, "logos", timestamp), {
        title: title,
        desc: desc,
        timestamp: timestamp,
        platform: type || 'Unknown',
        imageGenerated: true,
        imageSize: 'Large - displayed only, not stored'
      });
      
      console.log('Successfully saved metadata to Firestore');
    } catch (err) {
      console.error('Error saving to Firestore:', err);
    }

    return NextResponse.json({ image: imageUrl || base64ImageWithMime });
  } catch (error) {
    console.error('Error in AI logo model:', error);
    return NextResponse.json(
      { error: 'Error generating AI logo' },
      { status: 500 }
    );
  }
}
