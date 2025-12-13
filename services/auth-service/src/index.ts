import { createApp } from '@/app';
import { createServer } from 'http';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';
import { closeDatabase, connectToDatabase } from '@/db/sequelize';
import { initModels } from '@/models';

const main = async () => {
  try {
    await connectToDatabase(); // Connect to db first
    await initModels(); // initialize the model
    const app = createApp();
    const server = createServer(app);
    const port = env.AUTH_SERVICE_PORT || 6000;

    server.listen(port, () => {
      logger.info({ port }, 'Auth Service is running Great');
    });

    const shutDown = () => {
      logger.info('Shutting Down the Service...');

      Promise.all([closeDatabase()])
        .catch((e: unknown) => {
          logger.error({ e }, 'Error During shutdown tasks');
        })
        .finally(() => {
          server.close(() => process.exit(0));
        });
    };
    process.on('SIGINT', shutDown);
    process.on('SIGTERM', shutDown);
  } catch (error) {
    logger.error({ error }, 'Failed to start Auth Service');
    process.exit(1);
  }
};

void main();
