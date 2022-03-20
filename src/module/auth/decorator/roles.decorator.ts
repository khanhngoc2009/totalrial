import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guard/roles.guard';
import { Role } from '../role/role.enum';

export const ROLES_KEY = 'role';
export const Roles = (...roles: Role[]) => {
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesGuard));
};
