import { createApp } from "@/app";
import { createServer } from "http";
import { env } from "@/config/env";
import { logger } from "./logger";

const main = async () => {
  try {
    const app = createApp();
    const server = createServer(app);
    const port = env.AUTH_SERVICE_PORT || 6000;

    server.listen(port, () => {
      logger.info({ port }, "Auth Service is running Great");
    });
  } catch (error) {
    logger.error({ error }, "Failed to start Auth Service");
    process.exit(1);
  }
};

void main();
