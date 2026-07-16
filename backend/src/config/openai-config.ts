import OpenAI from "openai";

export const configureOpenAI = () => {
  if (!process.env.OPEN_AI_KEY) {
    throw new Error("OPEN_AI_KEY is not defined");
  }

  return new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
    organization: process.env.OPENAI_ORGANIZATION_ID,
  });
};