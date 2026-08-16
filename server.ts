import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google Gen AI client server-side safely
const getGenAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API Endpoint for AI Property Matching & Valuation Recommendation
app.post('/api/ai-match', async (req, res) => {
  try {
    const { budget, preferredCity, propertyType, bedroomsNeeded, lifestyleTags, additionalNotes } = req.body;

    const ai = getGenAIClient();
    if (!ai) {
      // Fallback response if GEMINI_API_KEY is missing
      return res.json({
        recommendation: {
          summary: `Matching properties in ${preferredCity} for a budget of $${(budget / 1000000).toFixed(1)}M.`,
          topMatches: [
            {
              propertyId: 'prop-101',
              matchScore: 96,
              reasoning: `Matches your $${(budget / 1000000).toFixed(1)}M luxury budget, ${bedroomsNeeded}+ bed requirement, and modern architectural preference in ${preferredCity}.`,
            },
            {
              propertyId: 'prop-103',
              matchScore: 92,
              reasoning: `Tranquil residential layout with high lifestyle compatibility for ${lifestyleTags?.join(', ') || 'family living'}.`,
            },
          ],
          lifestyleTips: [
            `Properties in ${preferredCity} maintain strong value appreciation.`,
            `Consider proximity to top schools and transit hubs.`,
          ],
        },
      });
    }

    const prompt = `You are a top luxury real estate AI advisor for EstateHub.
Analyze the user's property preference:
- Budget: $${budget} USD
- Preferred City: ${preferredCity}
- Property Category: ${propertyType}
- Bedrooms Needed: ${bedroomsNeeded}
- Lifestyle Tags: ${lifestyleTags?.join(', ') || 'General'}
- Additional Notes: ${additionalNotes || 'None'}

Return a JSON object with this exact structure:
{
  "summary": "Short 2-sentence summary of recommendations",
  "topMatches": [
    {
      "propertyId": "prop-101",
      "matchScore": 95,
      "reasoning": "Reason why this property fits"
    },
    {
      "propertyId": "prop-103",
      "matchScore": 91,
      "reasoning": "Reason why this second property fits"
    }
  ],
  "lifestyleTips": [
    "Tip 1 for living in this city/neighborhood",
    "Tip 2 about market investment"
  ]
}
Return ONLY valid JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const jsonText = response.text || '';
    const parsed = JSON.parse(jsonText);
    res.json({ recommendation: parsed });
  } catch (error: any) {
    console.error('Error in /api/ai-match:', error);
    // Return fallback JSON so client experience is smooth
    res.json({
      recommendation: {
        summary: 'Generated high-match property recommendations from catalog.',
        topMatches: [
          {
            propertyId: 'prop-101',
            matchScore: 95,
            reasoning: 'Prime luxury villa with top amenities matching your budget.',
          },
          {
            propertyId: 'prop-103',
            matchScore: 91,
            reasoning: 'Waterfront family estate in Miami with dock & pool.',
          },
        ],
        lifestyleTips: ['High historical appreciation in this zip code.'],
      },
    });
  }
});

// Vite middleware for development vs static serve for production
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EstateHub Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
