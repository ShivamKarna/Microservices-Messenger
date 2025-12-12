import { Sequelize } from 'sequelize';
import { env } from '@/config/env';
import { logger } from '@/utils/logger';

const sequelize = new Sequelize(env.AUTH_DB_URL, {
  dialect: 'mysql',
  logging:
    env.NODE_ENV === 'development'
      ? (msg: unknown) => {
          logger.debug({ sequelize: msg });
        }
      : false,
  define: {
    underscored: true,
    freezeTableName: true,
  },
});

const connectToDatabase = async () => {
  await sequelize.authenticate();
  logger.info('Auth databse connection SuccessFulll');
};

const closeDatabase = async () => {
  await sequelize.close();
  logger.info('Auth Database Connection Closed');
};

export { sequelize, connectToDatabase, closeDatabase };
