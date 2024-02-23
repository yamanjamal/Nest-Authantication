import { registerAs } from '@nestjs/config';

export const JWT_ENV = 'jwt_env';
export default registerAs(JWT_ENV, () => ({
  SECRET: process.env.JWT_SECRET,
  EXPIRATION_TIME: process.env.TOKEN_EXPIRATION_TIME,
}));
