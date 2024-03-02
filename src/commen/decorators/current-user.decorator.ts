// Libs
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Files
import { ProtocolEnum } from '../enums/protocol.enum';
import { User } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext): Promise<User> => {
    const request =
      context.getType() === ProtocolEnum.WS
        ? context.switchToWs().getClient().handshake
        : context.switchToHttp().getRequest();
    return request.user;
  },
);
