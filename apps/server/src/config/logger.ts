import pino from "pino";

import { BACKEND_STAGES } from "@baserepo/utils";

import { APP_ENV_KEY } from "./common";

export function getLogLevel(): pino.LevelWithSilent {
  const LOG_LEVEL = process.env?.LOG_LEVEL as pino.LevelWithSilent;

  // Define a set of valid log levels
  const validLevels: Set<pino.LevelWithSilent> = new Set([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]);

  // Check if the provided LOG_LEVEL is valid
  if (LOG_LEVEL && validLevels.has(LOG_LEVEL)) {
    return LOG_LEVEL;
  }

  /*If you set the level to warn, Pino will log messages with the levels warn, error, and fatal. Setting the level to trace will include all log levels, capturing the most detailed log information.

  Once production is stable, you can set the logging level to "fatal" to exclude "error", "warn", and all other log messages, focusing only on critical issues.
  */
  const currentEnv = process?.env?.[APP_ENV_KEY] || "";
  switch (currentEnv) {
    case BACKEND_STAGES.DEV:
      return "trace";
    case BACKEND_STAGES.QA:
      return "warn";
    case BACKEND_STAGES.PROD:
      return "warn";
    default:
      return "info";
  }
}

const logger = pino({
  level: getLogLevel(),
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
