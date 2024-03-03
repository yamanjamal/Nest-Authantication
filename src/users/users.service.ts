import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { User } from '@prisma/client';
import { FindAllQuery } from './dto/find-all.query';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserUpdatedEvent } from './events/user-updated.event';

@Injectable()
export class UsersService {
  private readonly logger = new MyLoggerService(UsersService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findAll(query: FindAllQuery) {
    this.logger.log(`UsersService:findAll\t`, UsersService.name);
    const { skip, take, cursor, where, orderBy } = query;
    return this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(id: number): Promise<User | null> {
    this.logger.log(`UsersService:findOne\t`, UsersService.name);
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    this.logger.log(`UsersService:update\t`, UsersService.name);
    this.eventEmitter.emit(
      'user.updated',
      new UserUpdatedEvent(
        'user update',
        'update the user information from the user serivce',
      ),
    );
    return this.prismaService.user.update({
      where: { id },
      data: {
        name: dto.name,
      },
    });
  }

  async remove(id: number) {
    this.logger.log(`UsersService:remove\t`, UsersService.name);
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
