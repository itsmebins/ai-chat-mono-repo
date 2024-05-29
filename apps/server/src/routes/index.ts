import { FastifyInstance } from "fastify";

import openAIUserChat from "./chat/openAIUserChat";
import signin from "./signin";
import signup from "./signup";

export default async function (fastify: FastifyInstance): Promise<void> {
  fastify.register(signin);
  fastify.register(signup);
  fastify.register(openAIUserChat);
}
