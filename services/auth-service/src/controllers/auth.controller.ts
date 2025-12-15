import { RegisterInput } from '@/types/auth';
import { asyncHandler } from '@chatapp/common';
import { RequestHandler } from 'express';
import { register } from '@/services/auth.service';
import { HTTP_STATUS } from '@chatapp/common';

const registerHandler: RequestHandler = asyncHandler(async (req, res, next) => {
  const payload = req.body as RegisterInput;
  const tokens = await register(payload);
  res.status(HTTP_STATUS.CREATED).json(tokens);
});

export { registerHandler };
