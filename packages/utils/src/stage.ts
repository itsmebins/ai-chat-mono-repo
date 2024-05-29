/**
 * BE related constants used in different libs
 */
export const SECURE_ACCESS_TOKEN_COOKIE_NAME = "app.t";
// Unit is hours, 1 hour, 2 hour etc, default value is 1 day ie 24 hours
// export const SECURE_ACCESS_TOKEN_VALIDITY = 0.008334;
export const SECURE_ACCESS_TOKEN_VALIDITY = 24;
// Unit is hours, 1 hour, 2 hour etc, default value is 1 day ie 24 hours
export const RESET_PASSWORD_LINK_VALIDITY = 24;
export const USER_DATA_STORAGE_VALIDITY = 24 * 60 * 60 * 1000; // 24 hours;

export const USER_TYPE_STORAGE_KEY = "userType";
export const USER_STORAGE_KEY = "user";
export const USER_EXPIRY_DATE_KEY = "userExpiryDate";
export type UserType = "guest" | "user";
export const USER_TYPES = {
  GUEST: "guest",
  USER: "user",
} as const;

/**
 * Env specific setup
 */
export type StageName = "Prod" | "QA" | "Dev";

interface Stages {
  PROD: StageName;
  QA: StageName;
  DEV: StageName;
}
export type Stage = keyof Stages;

export const BACKEND_STAGES: Stages = {
  PROD: "Prod",
  QA: "QA",
  DEV: "Dev",
} as const;
