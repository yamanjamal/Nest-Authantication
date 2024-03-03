// Libs
import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

export class EnvironmentVariables {
  // JWT
  @IsString()
  JWT_SECRET: string;
  @IsString()
  TOKEN_EXPIRATION_TIME: string;
  @IsString()
  AWS_ACCESS_KEY_ID: string;
  @IsString()
  AWS_SECRET_ACCESS_KEY: string;
  @IsString()
  AWS_S3_REGION: string;
  @IsString()
  AWS_BUCKET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
