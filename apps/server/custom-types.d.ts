import { FastifyRequest as OriginalFastifyRequest } from "fastify";

declare module "fastify" {
  interface FastifyRequest extends OriginalFastifyRequest {
    user?: {
      id: string;
      email: string;
      userName: string;
    };
  }
}
