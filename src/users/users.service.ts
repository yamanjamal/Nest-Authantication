import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { MyLoggerService } from 'src/my-logger/my-logger.service';
import { User } from '@prisma/client';
import { FindAllQuery } from './dto/find-all.query';

@Injectable()
export class UsersService {
  private readonly logger = new MyLoggerService(UsersService.name);
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(query: FindAllQuery) {
    this.logger.log(`findAll\t`, UsersService.name);
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
    this.logger.log(`findOne\t`, UsersService.name);
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    this.logger.log(`update\t`, UsersService.name);
    return this.prismaService.user.update({
      where: { id },
      data: {
        name: dto.name,
      },
    });
  }

  async remove(id: number) {
    this.logger.log(`remove\t`, UsersService.name);
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
