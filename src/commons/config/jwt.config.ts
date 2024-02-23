// Libs
import { registerAs } from '@nestjs/config';

export const FUSIONAUTH_ENV = 'fusionauth_env';
export default registerAs(FUSIONAUTH_ENV, () => ({
  SECRET: process.env.JWT_SECRET,
  EXPIRATION_TIME: process.env.TOKEN_EXPIRATION_TIME,
}));
