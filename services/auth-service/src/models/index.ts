import { sequelize } from '@/db/sequelize';
import { UserCredentails } from '@/models/user-credentials.model';
import { RefreshToken } from '@/models/refresh-token.model';
export const initModels = async () => {
  await sequelize.sync();
};

export { UserCredentails, RefreshToken };
