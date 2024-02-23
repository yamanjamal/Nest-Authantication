import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, dto: UpdateUserDto) {
    return `This action updates a #${dto} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
