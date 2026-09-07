export const parseGeminiJSON = (text) => {
  try {
    let cleanText = text.trim();

    // Check if there is a json markdown code block anywhere
    const match = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
      cleanText = match[1];
    } else {
      // If no code fence, extract substring from first JSON bracket to last bracket
      const firstBracket = cleanText.search(/[\[\{]/);
      const lastBracket = Math.max(cleanText.lastIndexOf('}'), cleanText.lastIndexOf(']'));
      if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
        cleanText = cleanText.substring(firstBracket, lastBracket + 1);
      }
    }

    return JSON.parse(cleanText.trim());
  } catch (error) {
    console.error('Failed to parse Gemini JSON response:', error.message);
    console.error('Raw text was:', text);
    throw new Error('Failed to parse AI response. The AI returned an unexpected format.');
  }
};