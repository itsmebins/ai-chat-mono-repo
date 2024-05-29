// src/config/openai.ts
import OpenAIApi from "openai";

import logger from "./logger";

let openaiInstance: OpenAIApi | null = null;

function getOpenAIApi(): OpenAIApi {
  if (!openaiInstance) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key is not set!");
    }

    openaiInstance = new OpenAIApi({ apiKey: apiKey });
    logger.info("OpenAI API client created.");
  } else {
    logger.info("Using existing OpenAI API client.");
  }

  return openaiInstance;
}

export { getOpenAIApi };
