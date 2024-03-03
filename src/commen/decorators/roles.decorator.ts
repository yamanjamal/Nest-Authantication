// Libs
import { SetMetadata } from '@nestjs/common';
// Files
import { UserRolesEnum } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRolesEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
