import type { FastifyCookieOptions } from "@fastify/cookie";
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import multipart from "@fastify/multipart";
import fastify, { FastifyInstance } from "fastify";
import fastifyRawBody from "fastify-raw-body";

import { version } from "../package.json";
import { env } from "./config/common";
import { getLogLevel } from "./config/logger";
import auth from "./middlewares/auth-plugin";
import routes from "./routes";

let isTerminating = false;
// readiness probe is set failureThreshold: 2, periodSeconds: 2 (4s) + small delay
const GRACEFUL_DELAY = 2 * 2 * 1000 + 5000;

const app: FastifyInstance = fastify({
  logger: {
    level: getLogLevel(),
  },
  trustProxy: true,
  bodyLimit: 10 * 1024 * 1024, // 10 MB;
});

const gracefulShutdown = () => {
  app.log.info("starting termination");
  isTerminating = true;
  setTimeout(async () => {
    await app.close();
    process.exit();
  }, GRACEFUL_DELAY);
};
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

app.register(helmet);
// Configure CORS
app.register(cors, {
  hook: "preHandler",
  delegator: (req, callback) => {
    const origin = req.headers?.origin || "";
    const url = req.raw?.url || "";
    // If the Origin header is not present, block the request by calling the callback with an error.
    // This ensures that only requests with a valid Origin header that matches the allowed list are accepted.
    const allowedDomains = [
      /\.frontend\.exampledomain\.com(:\d+)?$/,
      /\.frontend\.exampledomain\.dog(:\d+)?$/,
      /exampledomain\.com(:\d+)?$/,
      /\.exampledomain\.com(:\d+)?$/,
      /\.preprod\.exampledomain\.com(:\d+)?$/,
      /\.backend\.exampledomain\.dog(:\d+)?$/,
    ];
    const isAllowed = true; // allowedDomains.some((regex) => regex.test(origin));
    if (isAllowed) {
      callback(null, {
        origin: (origin, cb) => {
          if (!origin) return cb(null, false);
          cb(null, origin);
        },
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        credentials: true,
      });
      // Allow healthcheck routes
    } else if (["/health", "/"].includes(url)) {
      callback(null, { origin: true });
    } else {
      callback(new Error("Not allowed by CORS"), { origin: false });
    }
  },
});

// Auth plugin to set user info
app.register(auth);

app.register(multipart, { attachFieldsToBody: true });

// Register the cookie parser plugin
app.register(fastifyCookie, {
  secret: env("JWT_SECRET"), // Used to sign cookies
} as FastifyCookieOptions);

app.register(fastifyRawBody, {
  field: "rawBody",
  global: false,
  encoding: "utf8",
  runFirst: true,
});

app.register(async function (fastifyInstance) {
  fastifyInstance.get("/", async (req, reply) => {
    if (isTerminating) {
      reply.status(500).send({
        status: "down",
        version: version,
      });
    } else {
      reply.send({
        status: "up",
        version: version,
      });
    }
  });

  fastifyInstance.get("/health", async (req, reply) => {
    if (isTerminating) {
      reply.status(500).send({
        status: "down",
        version: version,
      });
    } else {
      reply.send({
        status: "up",
        version: version,
      });
    }
  });
});

// Routes
app.register(routes, { prefix: "/api" });

export default app;
