import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

class Gemini {
  private gen: GoogleGenerativeAI;
  private model: string;

  constructor() {
    this.gen = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    this.model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
  }

  async prompt(msg: string | string[]) {
    const model = this.gen.getGenerativeModel({ model: this.model });
    const result = await model.generateContent(msg);
    if (
      !result.response.candidates ||
      result.response.candidates.length === 0
    ) {
      return null;
    }
    return result.response.candidates[0].content.parts;
  }

  async promptJson(msg: string | string[]): Promise<any> {
    const model = this.gen.getGenerativeModel({
      model: this.model,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
    const result = await model.generateContent(msg);
    if (
      !result.response.candidates ||
      result.response.candidates.length === 0
    ) {
      return null;
    }
    const content = result.response.candidates[0].content.parts[0];
    return JSON.parse(content.text || "");
  }
}

export default Gemini;
