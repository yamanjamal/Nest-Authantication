// Libs
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Files
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRolesEnum } from '../enums/role.enum';
import { ProtocolEnum } from '../enums/protocol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRolesEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { user } =
      context.getType() === ProtocolEnum.WS
        ? context.switchToWs().getClient().handshake
        : context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
