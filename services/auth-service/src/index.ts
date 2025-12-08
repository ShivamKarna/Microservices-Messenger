import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();

const PORT = env.AUTH_SERVICE_PORT;

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
