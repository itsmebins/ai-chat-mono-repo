import { FastifySwaggerAPISchema } from "../../utils/types";
import USER_SCHEMA from "./user.schema";

const SIGNIN_SWAGGER_SCHEMA: FastifySwaggerAPISchema = {
  description: "User sign-in",
  tags: ["auth"],
  summary: "Sign in a user",
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 12 },
    },
  },
  response: {
    200: {
      description: "Successful sign-in",
      type: "object",
      properties: {
        success: { type: "boolean", default: true },
        data: {
          type: "object",
          properties: {
            ...USER_SCHEMA,
            expiryDate: { type: "string", format: "date-time" },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      type: "object",
      properties: {
        success: { type: "boolean", default: false },
        errorCode: { type: "string" },
        errorMsg: { type: "string" },
        errors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              errorCode: { type: "string" },
              fieldName: { type: "string" },
            },
          },
        },
        data: {
          type: "object",
          properties: {
            signInAttemptsLeft: {
              type: "integer",
              minimum: 0,
              description:
                "The number of remaining sign-in attempts before the account is locked, present only when applicable.",
            },
          },
        },
      },
    },
  },
};

export default SIGNIN_SWAGGER_SCHEMA;
