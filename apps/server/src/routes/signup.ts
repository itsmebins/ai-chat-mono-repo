import crypto from "crypto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import {
  API_ROUTES,
  ApiPayload,
  BaseUser,
  ERRORS_ENUM,
  FieldError,
} from "@baserepo/utils";

import logger from "../config/logger";

const validateSignUp = (userData: BaseUser) => {
  const errors: FieldError[] = [];

  return errors;
};

export default async function signupRoute(
  fastify: FastifyInstance,
): Promise<void> {
  fastify.post(
    API_ROUTES.SIGN_UP,
    async (request: FastifyRequest, reply: FastifyReply) => {
      const errorPayload = {
        success: false,
        errorMsg: ERRORS_ENUM.SIGN_UP_ERROR,
        errorCode: ERRORS_ENUM.SIGN_UP_ERROR,
      };
      try {
        // Validate signup data
        const userData = request.body as BaseUser;
        const errors = validateSignUp(userData);
        if (errors && errors.length > 0) {
          return reply.code(400).send({
            ...errorPayload,
            errors,
          });
        }
        return reply.send({ nsg: "dummy response" });
      } catch (error: unknown) {
        const errorCode = ERRORS_ENUM.API_SERVER_DOWN;
        logger.error("Error during user sign-up:", error);
        reply.code(400).send({ ...errorPayload, errorCode });
      }
    },
  );
}
