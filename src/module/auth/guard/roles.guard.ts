import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseService } from 'src/base.service';
import { DEFIND_ROLE } from 'src/contant/Contant';
import { User } from 'src/module/user/entities/user.entities';
import { UserReponsitory } from 'src/module/user/reponsitory/user.reponsitory';
import { Connection, Repository } from 'typeorm';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { Role } from '../role/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  public repository: Repository<User>;
  constructor(private conection: Connection, private reflector: Reflector) {
    this.repository = this.conection.getCustomRepository(UserReponsitory);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const base = new BaseService();
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const request: { headers: { authorization?: string } } = context
      .switchToHttp()
      .getRequest();

    const authorization = request.headers.authorization;
    if (!authorization) return false;

    const token = authorization.replace('Bearer ', '');

    const responseToken: { id: number } = await base.generalToken(token);

    const user = await this.repository.findOne(responseToken.id);

    if (!user) return false;

    if (user.token !== token) return false;

    const isRole = requiredRoles.find(
      (e) => DEFIND_ROLE[`${e}`].role === user.role,
    );

    if (!isRole) return false;

    return true;
  }
}
