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
    private reflector: Reflector //reflector es un servicio de NestJS que permite acceder a los metadatos de los decoradores
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: RequestWithUser = context.switchToHttp().getRequest(); // esta linea obtiene la solicitud HTTP actual
      const token = request.headers.authorization.replace('Bearer ', ''); // obtenemos el token del header de autorización
      if (token == null) {
        throw new UnauthorizedException('El token no existe');
      }
      const payload = this.jwtService.getPayload(token); // decodificamos el token para obtener el payload, el payload contiene la información del usuario
      const user = await this.usersService.findByEmail(payload.email); // buscamos al usuario por su email en la base de datos
      request.user = user; // guardamos el usuario en la solicitud para que esté disponible en los controladores
      

      const permissions = this.reflector.get<string[]>('permissions', context.getHandler()); // obtenemos los permisos requeridos del decorador

      // Si no hay permisos requeridos, permitir acceso
      if (!permissions || permissions.length === 0) {
        return true;
      }

      
      const userPermissions: string[] = user.permissionCodes; // obtenemos los permisos del usuario desde su perfil

      // Verificar si el usuario tiene TODOS los permisos requeridos
      const hasPermission = permissions.every((perm) => //funcion flecha que hace un recorrido por todos los permisos requeridos y verifica si el usuario tiene al menos uno de ellos
        userPermissions.includes(perm) //la variable perm es el permiso requerido y userPermissions es un array con los permisos del usuario
      );
      if (!hasPermission) {
        throw new ForbiddenException('No tienes permisos suficientes');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException(error?.message); // lanzamos una excepción si ocurre un error durante la validación del token o permisos
    }
  }
}
