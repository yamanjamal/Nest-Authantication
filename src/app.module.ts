import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    MyLoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
})
export class AppModule {}
