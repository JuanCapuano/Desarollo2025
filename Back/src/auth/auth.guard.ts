import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import axios from 'axios';

//Guard de autenticación que verifica el token JWT y los permisos del usuario
//Este guard se utiliza para proteger los endpoints que requieren autenticación y autorización

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Obttenemos el header de autorización que contiene el token JWT
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('El token no existe');
    }

    // Verificar que el token tenga el formato correcto, replace lo que hace es eliminar el prefijo 'Bearer '

    const token = authHeader.replace('Bearer ', '');

    // Obtener los permisos requeridos del decorador
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());

    //Si no hay permisos requeridos, ya se validó el token, dejamos pasar
    if (!permissions || permissions.length === 0) {
      return true;
    }

    try {
      //como existen permisos, se accede al primero
      const permission = permissions[0];

      //usamos axios para hacer una petición al microservicio de autenticación, verificamos el token y los permisos 
      const response = await axios.get(
        `http://localhost:3001/can-do/${permission}`, //el cando-do es un endpoint que verifica si el usuario tiene el permiso solicitado, es del microservicio de autenticación
        {
          headers: {
            Authorization: `Bearer ${token}`, // pasamos el token en el header de autorización
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
