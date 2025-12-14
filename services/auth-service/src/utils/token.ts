import bcrypt from 'bcrypt';
import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { env } from '@/config/env';

const ACCESS_TOKEN: Secret = env.JWT_SECRET;
const REFRESH_TOKEN: Secret = env.JWT_REFRESH_SECRET;
const ACCESS_OPTIONS: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] };
const REFRESH_OPTIONS: SignOptions = {
  expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'],
};

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = await bcrypt.genSalt(13);
  return bcrypt.hash(password, saltRounds);
};
const verifyPassword = async (
  candidatePassword: string,
  passwordHashStoredInDb: string,
): Promise<boolean> => {
  return bcrypt.compare(candidatePassword, passwordHashStoredInDb);
};

export interface AccessTokenPayload {
  userId: string; // sub v likha sake xiyai
  email: string;
}
export interface RefreshTokenPayload {
  userId: string;
  tokenId: string;
}
export const signAccessToken = (accessTokenParams: AccessTokenPayload): string => {
  return jwt.sign(accessTokenParams, ACCESS_TOKEN, ACCESS_OPTIONS);
};
export const signRefreshToken = (refreshTokenParams: RefreshTokenPayload): string => {
  return jwt.sign(refreshTokenParams, REFRESH_TOKEN, REFRESH_OPTIONS);
};
export const verifyRefreshToken = (candidateRefreshToken: string): RefreshTokenPayload => {
  return jwt.verify(candidateRefreshToken, REFRESH_TOKEN) as RefreshTokenPayload;
};
export { hashPassword };
