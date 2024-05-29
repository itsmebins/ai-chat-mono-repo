import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import OpenAI from "openai";

import {
  API_ROUTES,
  ApiPayload,
  ChatMessage,
  ERRORS_ENUM,
} from "@baserepo/utils";

import logger from "../../config/logger";
import { getOpenAIApi } from "../../config/openai";

interface ChatRequest {
  Body: {
    prompt: string;
  };
}
interface APIRequest {
  prompt: string;
}

/*const sampleMessage = {
  response: {
    id: "chatcmpl-9UE1cpFDxPuDORM7h4zFjJNPrvLQh",
    object: "chat.completion",
    created: 1716990780,
    model: "gpt-3.5-turbo-0125",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "This is a test.",
        },
        logprobs: null,
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 12,
      completion_tokens: 5,
      total_tokens: 17,
    },
    system_fingerprint: null,
  },
}; */

export default async function openAIUserChat(
  fastify: FastifyInstance,
): Promise<void> {
  fastify.post(
    API_ROUTES.PROCESS_USER_AUERy,
    async (request: FastifyRequest, reply: FastifyReply) => {
      const errorPayload = {
        success: false,
        errorMsg: ERRORS_ENUM.GENERIC_ERROR,
        errorCode: ERRORS_ENUM.GENERIC_ERROR,
      };
      try {
        const requestBody = request.body as APIRequest;
        if (!requestBody?.prompt) {
          return reply
            .status(400)
            .send({ ...errorPayload, errorMsg: "Prompt is required" });
        }

        const params: OpenAI.Chat.ChatCompletionCreateParams = {
          messages: [{ role: "user", content: requestBody?.prompt }],
          model: "gpt-3.5-turbo",
        };
        const chatCompletion: OpenAI.Chat.ChatCompletion =
          await getOpenAIApi().chat.completions.create(params);
        logger.info(chatCompletion);
        const msg = chatCompletion.choices[0].message;
        const openAIReply: ChatMessage = {
          id: chatCompletion.id,
          chatID: chatCompletion.id, // DB value
          timestamp: chatCompletion.created,
          role: "assistant",
          content: msg.content || "",
        };

        /*const sampleMsg = {
          id: `${Date.now()}`,
          chatID: "chat1", // DB value
          timestamp: Date.now(),
          role: "assistant",
          content: `Answered at  ${Date.now()}`,
        }; */
        const successPayload: ApiPayload<ChatMessage> = {
          success: true,
          data: openAIReply,
        };
        if (msg.content) {
          reply.send(successPayload);
        } else {
          reply.status(500).send({
            ...errorPayload,
            errorMsg: "Failed to get a valid response from OpenAI",
          });
        }
      } catch (error: any) {
        reply.status(500).send({ ...errorPayload, errorMsg: error.message });
      }
    },
  );
}
