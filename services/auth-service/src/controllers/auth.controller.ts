import { RegisterInput } from '@/types/auth';
import { asyncHandler } from '@chatapp/common';
import { RequestHandler } from 'express';
import { register } from '@/services/auth.service';

const registerHandler: RequestHandler = asyncHandler(async (req, res, next) => {
  const payload = req.body as RegisterInput;
  const tokens = await register(payload);
  res.status(201).json(tokens);
});

export { registerHandler };
