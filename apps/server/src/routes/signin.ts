import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import { API_ROUTES, ERRORS_ENUM, SigninRequest } from "@baserepo/utils";

import logger from "../config/logger";

export default async function signinRoute(
  fastify: FastifyInstance,
): Promise<void> {
  fastify.post(
    API_ROUTES.SIGN_IN,
    async (request: FastifyRequest, reply: FastifyReply) => {
      const errorPayload = {
        success: false,
        errorMsg: ERRORS_ENUM.SIGN_IN_ERROR,
        errorCode: ERRORS_ENUM.SIGN_IN_ERROR,
      };
      try {
        const userData = request.body as SigninRequest;
        // Validate signup data

        return reply.send({ msg: "dummy response" });
      } catch (error: unknown) {
        const errorCode = ERRORS_ENUM.API_SERVER_DOWN;
        const signInAttemptsLeft = undefined;
        logger.error("Error during user sign-in:", error);
        reply.code(400).send({
          ...errorPayload,
          errorCode,
          data: {
            signInAttemptsLeft,
          },
        });
      }
    },
  );
}
