import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from 'src/interfaces/request-user';
import { JwtService } from 'src/jwt/jwt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: RequestWithUser = context.switchToHttp().getRequest();
      const token = request.headers.authorization.replace('Bearer ', '');
      if (token == null) {
        throw new UnauthorizedException('El token no existe');
      }
      const payload = this.jwtService.getPayload(token);
      const user = await this.usersService.findByEmail(payload.email);
      request.user = user;
      //AGREGAR LOGICA PARA USAR LOS PERMISOS QUE VIENEN EN EL DECORADOR

      const permissions = this.reflector.get<string[]>('permissions', context.getHandler());

      //console.log(permissions);

      // Si no hay permisos requeridos, permitir acceso
      if (!permissions || permissions.length === 0) {
        return true;
      }

      // Obtener los permisos del usuario (getter permissionCodes)
      const userPermissions: string[] = user.permissionCodes;

      // Verificar si el usuario tiene TODOS los permisos requeridos
      const hasPermission = permissions.every((perm) =>
        userPermissions.includes(perm)
      );
      if (!hasPermission) {
        throw new ForbiddenException('No tienes permisos suficientes');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(error?.message);
    }
  }
}
