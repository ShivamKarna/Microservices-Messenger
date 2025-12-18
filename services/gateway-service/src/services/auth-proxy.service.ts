import { HttpError } from '@chatapp/common';
import axios from 'axios';
import { env } from '@/config/env';

const client = axios.create({
  baseURL: env.AUTH_SERVICE_URL,
  timeout: 5000,
});

const authHeader = {
  headers: {
    'X-INTERNAL-Token': env.INTERNAL_API_TOKEN,
  },
} as const;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserData {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface AuthResponse extends AuthTokens {
  user: UserData;
}

export interface RegisterPayload {
  email: string;
  password: string;
  displayName: string;
}

export type loginPayload = Pick<RegisterPayload, 'email' | 'password'>;

export type RefreshPayload = Pick<AuthTokens, 'refreshToken'>;

export interface RevokePayload {
  userId: string;
}

const resolvedMessage = <T extends { message?: string }>(status: number, data: T): string => {
  if (data?.message && data.message.trim().length > 0) {
    return data.message;
  }
  return status >= 500
    ? 'Authentication Service is Unavailable'
    : 'An Error Occured while processing the Request';
};

const handleAxiosError = <T extends { message?: string }>(error: unknown): never => {
  if (!axios.isAxiosError(error) || !error.response) {
    throw new HttpError(500, 'Authentication Serivice is Unavailable');
  }
  const { status, data } = error.response as { status: number; data: T };
  throw new HttpError(status, resolvedMessage(status, data));
};

// export const authProxyService..................
