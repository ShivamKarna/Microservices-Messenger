import { DataTypes, Model, useInflection, type Optional } from 'sequelize';
import { sequelize } from '@/db/sequelize';
import { UserCredentails } from '@/models/user-credentials.model';
import { execSync } from 'child_process';

export interface RefreshTokenAttributes {
  id: string;
  userID: string;
  tokenId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type RefreshTokenCreationAttribute = Optional<
  RefreshTokenAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

export class RefreshToken
  extends Model<RefreshTokenAttributes, RefreshTokenCreationAttribute>
  implements RefreshTokenAttributes
{
  declare id: string;
  declare userID: string;
  declare tokenId: string;
  declare expiresAt: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    tokenId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'refresh_tokens',
  },
);

UserCredentails.hasMany(RefreshToken, {
  foreignKey: 'userId',
  as: 'refreshTokens',
  onDelete: 'CASCADE',
});

UserCredentails.belongsTo(UserCredentails, {
  foreignKey: 'userId',
  as: 'user',
});
