import { GoogleGenerativeAI } from '@google/generative-ai';

// API Key کو ہمیشہ Environment Variables سے اٹھایا جاتا ہے
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req) {
  try {
    const { budget, familySize, dietaryPreference } = await req.json();

    if (!budget || !familySize) {
      return Response.json(
        { error: 'برائے مہربانی بجٹ اور افراد کی تعداد درج کریں۔' },
        { status: 400 }
      );
    }

    // AI System Instructions / Prompt
    const systemPrompt = `
      You are the AI Grocery & Shopping Assistant for "MegaMart".
      Create a recommended weekly grocery shopping list based on the user's constraints.
      
      User Constraints:
      - Weekly Budget: PKR ${budget}
      - Family Size: ${familySize} persons
      - Preferences/Notes: ${dietaryPreference || 'Standard groceries'}
      
      Instructions:
      1. Provide a categorized list (e.g., Staples, Vegetables, Dairy, Meat/Protein).
      2. Keep total estimated cost strictly within the given budget in PKR.
      3. Format the output cleanly in readable Markdown with estimated item prices.
      4. Give 1-2 money-saving tips at the end.
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();

    return Response.json({ success: true, plan: responseText });
  } catch (error) {
    console.error('AI Processing Error:', error);
    return Response.json(
      { error: 'سرور میں خرابی پیش آئی ہے۔ بعد میں کوشش کریں۔' },
      { status: 500 }
    );
  }
}
