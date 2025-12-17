import 'dotenv/config';

import { createEnv, z } from '@chatapp/common';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  GATEWAY_SERVICE_PORT: z.coerce.number().int().min(0).max(65_535).default(6003),
  AUTH_SERVICE_URL: z.string().url(),
});

type EnvType = z.infer<typeof envSchema>;

const env: EnvType = createEnv(envSchema, {
  serviceName: 'gateway-service',
});

export type Env = typeof env;
export { env };
