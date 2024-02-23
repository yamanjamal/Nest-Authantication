import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_ENV } from 'src/commons/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenFromCookie = this.extractTokenFromCookie(request);
    //if there is no cookie use this
    // const token = this.extractTokenFromHeader(request);
    if (!tokenFromCookie) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(tokenFromCookie, {
        secret: this.configService.get(`${JWT_ENV}.SECRET`),
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  //   private extractTokenFromHeader(request: Request): string | undefined {
  //     const [type, token] = request.headers.authorization?.split(' ') ?? [];
  //     return type === 'Bearer' ? token : undefined;
  //   }

  private extractTokenFromCookie(request: Request): string | undefined {
    if (request.cookies && 'token' in request.cookies) {
      return request.cookies.token;
    }
    return null;
  }
}
