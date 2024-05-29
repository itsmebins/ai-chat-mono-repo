import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import jwt from "jsonwebtoken";

import { SECURE_ACCESS_TOKEN_COOKIE_NAME } from "@baserepo/utils";

import { env } from "../config/common";
import { JWTTokenDataType } from "../utils/types";

export type AccessToken = { token: string; expiresIn: Date };

interface Options {
  secret: string;
}

const plugin = async (
  fastify: FastifyInstance,
  opts: Options,
): Promise<void> => {
  fastify.decorateRequest("userId", null);
  // fastify.decorateRequest('accessToken', null);

  // Machine-to-machine authentication
  fastify.addHook("preHandler", async (request) => {
    try {
      const token = request.cookies[SECURE_ACCESS_TOKEN_COOKIE_NAME];
      if (token) {
        const decodedData = jwt.verify(
          token,
          env("JWT_SECRET") || "",
        ) as JWTTokenDataType;

        // Check if the decoded object contains the necessary user details
        if (decodedData.id && decodedData.email) {
          // Add user details to the request
          request.user = {
            id: decodedData.id,
            email: decodedData.email,
            userName: decodedData.userName,
          };
        }
      }
    } catch (err) {}
  });
};

export default fp(plugin, {
  name: "authentication",
});
