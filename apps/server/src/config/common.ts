import dotenv from "dotenv";

dotenv.config();

export const APP_ENV_KEY = "APP_ENV";

export function getFrontEndUrl(): string {
  return env("WEB_APP_BASE_URL");
}

export function getResetPasswordSubject(): string {
  return "Reset your password";
}

export const env = (variable: string) => {
  return process?.env?.[variable] || "";
};

type SecretKey = "OPENAI_API_KEY";

export const SECRET_KEYS: SecretKey[] = ["OPENAI_API_KEY"];

type SecretKeys = (typeof SECRET_KEYS)[number];

type Secrets = {
  // eslint-disable-next-line no-unused-vars
  [key in SecretKeys]: string;
};
