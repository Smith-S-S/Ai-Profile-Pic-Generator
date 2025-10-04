import { NextResponse } from 'next/server';
import { AiPromptResult } from '@/configs/AiModel';

export async function POST(request: Request) {
  const { platform, keywords, design } = await request.json();

  try {
    const prompt = `Generate 4 creative logo ideas for a ${platform} profile picture. 
    The user is a ${keywords?.join(', ')} developer. 
    The design style is ${design?.title}.
    Return exactly 4 short phrases (maximum 4 words each) that describe unique logo concepts.
    Format as JSON array: ["idea1", "idea2", "idea3", "idea4"]`;

    const result = await AiPromptResult(prompt);
    let responseText = result.response.text();
    responseText = responseText.replace(/```json|```/g, '').trim();
    
    try {
      const ideas = JSON.parse(responseText);
      if (Array.isArray(ideas)) {
        return NextResponse.json({ 
          success: true, 
          ideas: ideas.slice(0, 4) // Ensure only 4 ideas
        });
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // Fallback ideas
      return NextResponse.json({ 
        success: true, 
        ideas: [
          "Code Warrior",
          "Debug Master", 
          "Pixel Artist",
          "Tech Innovator"
        ]
      });
    }
  } catch (error) {
    console.error('Error generating logo ideas:', error);
    // Fallback ideas
    return NextResponse.json({ 
      success: true, 
      ideas: [
        "Code Warrior",
        "Debug Master", 
        "Pixel Artist",
        "Tech Innovator"
      ]
    });
  }

  // Final fallback
  return NextResponse.json({ 
    success: true, 
    ideas: [
      "Code Warrior",
      "Debug Master", 
      "Pixel Artist",
      "Tech Innovator"
    ]
  });
}
