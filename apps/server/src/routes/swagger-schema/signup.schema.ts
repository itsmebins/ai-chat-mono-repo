import { FastifySwaggerAPISchema } from "../../utils/types";
import USER_SCHEMA from "./user.schema";

const SIGNUP_SWAGGER_SCHEMA: FastifySwaggerAPISchema = {
  description:
    "Registers a new user, creating accounts in both the application's primary user management system and an external rewards system.",
  tags: ["auth"],
  summary: "Sign up a new user",
  body: {
    type: "object",
    properties: {
      firstName: {
        type: "string",
        description: "The user's first name",
      },
      lastName: {
        type: "string",
        description: "The user's last name",
      },
      email: {
        type: "string",
        format: "email",
        description: "The user's email address",
      },
      password: {
        type: "string",
        description: "The user's chosen password",
      },
      postcode: {
        type: "string",
        description: "The user's postcode",
      },
      countryCode: {
        type: "string",
        description: "The user's country code",
      },
      preferences: {
        type: "object",
        properties: {
          marketing: {
            type: "boolean",
            description: "If the user opts in for marketing communications",
          },
          updates: {
            type: "boolean",
            description: "If the user opts in for updates and notifications",
          },
        },
        description: "User's communication preferences",
      },
    },
    required: ["firstName", "lastName", "email", "password"],
  },
  response: {
    "200": {
      description: "User successfully registered",
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            ...USER_SCHEMA,
            expiryDate: {
              type: "string",
              description: "The expiry date of the user's session token",
            },
          },
        },
      },
    },
    "400": {
      description: "Bad Request - Validation errors or missing fields",
      type: "object",
      properties: {
        success: { type: "boolean" },
        errorMsg: { type: "string" },
        errorCode: { type: "string" },
        errors: {
          type: "array",
          items: {
            type: "object",
            properties: {
              errorCode: {
                type: "string",
                description:
                  "Specific error code relating to the validation failure.",
              },
              fieldName: {
                type: "string",
                description: "The field that failed validation.",
              },
            },
          },
          description: "List of validation errors, if any.",
        },
      },
    },
    "401": {
      description: "Unauthorized - Invalid credentials provided",
      type: "object",
      properties: {
        success: { type: "boolean" },
        errorMsg: { type: "string" },
        errorCode: { type: "string" },
      },
    },
  },
};

export default SIGNUP_SWAGGER_SCHEMA;
