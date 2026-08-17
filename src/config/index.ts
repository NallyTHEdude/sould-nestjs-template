import { configSchema } from '@/config/env';

const config = configSchema.parse(process.env);

export default config;
