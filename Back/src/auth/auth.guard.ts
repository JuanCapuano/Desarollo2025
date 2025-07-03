import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import axios from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('El token no existe');
    }

    const token = authHeader.replace('Bearer ', '');

    // Obtener los permisos requeridos del decorador
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());

    // ✅ Si no hay permisos requeridos, ya validaste el token, dejás pasar
    if (!permissions || permissions.length === 0) {
      return true;
    }

    try {
      // ✅ Ahora sí, como existen permisos, accedés al primero
      const permission = permissions[0];

      const response = await axios.get(
        `http://localhost:3001/can-do/${permission}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      request.user = response.data.user; // Guardar el usuario en la request

      if (response.data && response.data.allowed) {
        return true;
      } else {
        throw new ForbiddenException('No tienes permisos suficientes');
      }
    } catch (error) {
      throw new UnauthorizedException(error?.message || 'No autorizado');
    }
  }
}
