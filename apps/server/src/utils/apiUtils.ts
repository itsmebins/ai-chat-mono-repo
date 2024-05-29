import crypto from "crypto";
import { FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

import {
  SECURE_ACCESS_TOKEN_COOKIE_NAME,
  SECURE_ACCESS_TOKEN_VALIDITY,
} from "@baserepo/utils";

import { env } from "../config/common";
import { JWTTokenCreationResponse, JWTTokenDataType } from "./types";

export const setSecureTokenCookie = (
  reply: FastifyReply,
  userId: string,
  email: string,
  firstName: string,
  userName?: string,
): JWTTokenCreationResponse => {
  const tokenPayload: JWTTokenDataType = {
    id: userId,
    email,
    userName: firstName || userName || "",
  };
  const maxAge = Math.floor(SECURE_ACCESS_TOKEN_VALIDITY * 3600);
  const expiryDate: Date = new Date(Date.now() + maxAge * 1000);

  const token = jwt.sign(tokenPayload, env("JWT_SECRET") || "", {
    expiresIn: maxAge,
  });

  /* reply.setCookie(SECURE_ACCESS_TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge,
  }); */

  return { expiryDate: expiryDate.toString() };
};

export function getHashedPassword(password: string): string {
  return crypto
    .pbkdf2Sync(password, process?.env?.PASSWORD_SALT || "", 1000, 64, "sha512")
    .toString("hex");
}

export const generateId = (prefix: string, short?: boolean): string => {
  // Generate an ID based on the 'short' flag
  // Generate an ID based on the 'short' flag
  const generatedId = short
    ? `${prefix}-${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 5)}`
    : `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36)}`;

  // Convert the ID to uppercase before returning
  return generatedId.toUpperCase();
};
