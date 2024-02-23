import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const newuser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
      },
      include: { posts: true },
    });
    return newuser;
  }

  async login(dto: SignupDto, req: Request, res: Response) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new BadRequestException('Wrong credentials');
    }
    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Wrong credentials');
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    if (!token) {
      throw new ForbiddenException();
    }
    res.cookie('token', token);
    return res.send({ message: 'logged in successfuly' });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'logged out successfuly' });
  }
}
