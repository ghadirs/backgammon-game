
import { GoogleGenAI, Type } from "@google/genai";
import { BoardState, Move, Player } from '../types';

export class AiService {
  // Use gemini-3-pro-preview for complex reasoning tasks like backgammon strategy
  private modelId = 'gemini-3-pro-preview';

  async getBestMove(
    board: BoardState,
    dice: number[],
    player: Player
  ): Promise<{ rationale: string; moves: Move[] }> {
    
    // Create a new GoogleGenAI instance right before the call to ensure the most up-to-date API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Construct a representation of the board for the AI
    const boardDescription = `
      You are playing as ${player === Player.White ? 'White' : 'Black'}.
      Board Configuration (Index 0-23):
      ${JSON.stringify(board.points)}
      Positive numbers are White pieces, negative are Black.
      
      Bar: White=${board.whiteBar}, Black=${board.blackBar}
      Off: White=${board.whiteOff}, Black=${board.blackOff}
      
      Dice Roll: ${JSON.stringify(dice)}
      
      Instructions:
      1. Identify the best sequence of moves.
      2. You must use as many dice as possible.
      3. Use the following index mapping: 
         - Main Board: 0 to 23.
         - White Bar: 24.
         - Black Bar: -1.
         - White Off: -1.
         - Black Off: 24.
      4. Return a JSON object with a 'rationale' string and a 'moves' array.
    `;

    try {
      const response = await ai.models.generateContent({
        model: this.modelId,
        contents: boardDescription,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    rationale: { 
                      type: Type.STRING,
                      description: "Strategic explanation for the chosen moves"
                    },
                    moves: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                from: { type: Type.INTEGER },
                                to: { type: Type.INTEGER }
                            },
                            propertyOrdering: ["from", "to"]
                        }
                    }
                },
                propertyOrdering: ["rationale", "moves"]
            }
        }
      });

      // Extract text directly from the response property and trim to ensure valid JSON parsing
      const jsonStr = response.text?.trim();
      if (!jsonStr) throw new Error("No response from AI");
      
      const result = JSON.parse(jsonStr);
      return result;
    } catch (error) {
      console.error("AI Error:", error);
      // Fallback or empty move if AI fails
      return { rationale: "AI failed to think or encountered an error.", moves: [] };
    }
  }
}

export const aiService = new AiService();
