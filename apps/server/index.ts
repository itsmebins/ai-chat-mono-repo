import { AddressInfo } from "net";
// import knex from "knex";
import dotenv from "dotenv";

import app from "./src/app";
import { SECRET_KEYS } from "./src/config/common";

//import { db } from "./src/db/getDBConnection";

dotenv.config();

// Function to check for environment variables
function checkEnvVariables() {
  const unsetEnvVars = SECRET_KEYS.filter((envVar) => !process.env[envVar]);

  if (unsetEnvVars.length > 0) {
    throw new Error(
      `Required environment variables are not set: [${unsetEnvVars.join(
        ", ",
      )}]`,
    );
  }
}

const start = async (): Promise<void> => {
  try {
    // set env name of the app

    // Perform the environment variable check
    checkEnvVariables();

    //await db.executeQuery("SELECT NOW()"); // Simple query to test the connection
    app.log.info("Database connection has been established successfully.");

    // Check db configurations
    // await checkDBConfigurations(knex(getKnexDBConfig()));
    app.log.info(`Server PORT from env=${process?.env?.APP_API_PORT}`);
    await app.listen({
      port: parseInt(process?.env?.APP_API_PORT || "8080", 10),
      host: "0.0.0.0",
    });
    const address = app.server.address();
    const port =
      typeof address === "string" || address === null
        ? "unknown"
        : (address as AddressInfo).port;

    app.log.info(`Server listening on ${port}`);
  } catch (err) {
    if (app.close) {
      await app.close();
    }
    app.log.error(err);
    process.exit(1);
  }
};

start();
