import { sequelize } from '@/db/sequelize';
import { RefreshToken, UserCredentails } from '@/models';
import { AuthResponse, RegisterInput } from '@/types/auth';
import { hashPassword, signAccessToken, signRefreshToken } from '@/utils/token';
import { HTTP_STATUS, HttpError } from '@chatapp/common';
import { Op, Transaction } from 'sequelize';
import crypto from 'crypto';

const REFRESH_TOKEN_TTL = 30;

export const register = async (input: RegisterInput): Promise<AuthResponse> => {
  // first check for existing
  // create transaction
  // hash password
  // give access and refresh tokens
  // check if user created or not(maybe optional)
  // send created user in controller
  const existingUser = await UserCredentails.findOne({
    where: { email: { [Op.eq]: input.email } },
  });
  if (existingUser) {
    throw new HttpError(HTTP_STATUS.CONFLICT, 'User with thiis email already exists');
  }
  const transaction = await sequelize.transaction();
  try {
    const passwordHash = await hashPassword(input.password);
    const userRecord = await UserCredentails.create(
      {
        email: input.email,
        displayName: input.displayName,
        passwordHash,
      },
      { transaction },
    );
    const refreshTokenRecord = await generateRefreshToken(userRecord.id, transaction);
    await transaction.commit();

    // give the tokens
    const accessToken = signAccessToken({ userId: userRecord.id, email: userRecord.email });
    const refreshToken = signRefreshToken({
      userId: userRecord.id,
      tokenId: refreshTokenRecord.tokenId,
    });

    // create user
    const userData = {
      id: userRecord.id,
      email: userRecord.email,
      displayName: userRecord.displayName.toLowerCase(),
      createdAt: userRecord.createdAt.toISOString(),
    };
    // TODO : Publish event User Registerded
    return {
      accessToken,
      refreshToken,
      user: userData,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const generateRefreshToken = async (
  userId: string,
  transaction?: Transaction,
): Promise<RefreshToken> => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_TTL); // this basically means 30days from now if it's 7 days then 7 i knowman
  const tokenId = crypto.randomUUID();
  const record = await RefreshToken.create(
    {
      userId,
      tokenId,
      expiresAt,
    },
    { transaction },
  );
  return record;
};
