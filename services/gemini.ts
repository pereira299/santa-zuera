import {GoogleGenAI, Model, Pager} from '@google/genai';

class Gemini {
  private gen: GoogleGenAI;
  private model: string;

  constructor() {
    this.gen = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY || ""});
    this.model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  }

  async getModels(): Promise<Pager<Model>> {
    return this.gen.models.list();
  }

  async prompt(msg: string | string[]) {
    const result = await this.gen.models.generateContent({
      model: this.model,
      contents: msg,
    })
    if (
      !result.candidates ||
      result.candidates.length === 0
    ) {
      return null;
    }
    return result.text;
  }

  async promptJson(msg: string | string[]): Promise<any> {
    const result = await this.gen.models.generateContent({
      model: this.model,
      contents: msg,
      config: {
        responseMimeType: "application/json",
      }
    });
    result.text;
    if (
      !result.candidates ||
      result.candidates.length === 0
    ) {
      return null;
    }
    const content = result.text
    return JSON.parse(content || "");
  }
}

export default Gemini;
