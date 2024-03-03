import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserUpdatedListener } from './listeners/user-updated.listener';
import { TestJob } from './jobs/test.job';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserUpdatedListener, TestJob],
})
export class UsersModule {}
