import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { Request } from 'express';
import { AuthGuard } from '../middlewares/auth.middleware';
import { RequestWithUser } from 'src/interfaces/request-user';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';

@Controller('')
export class UsersController {
  constructor(private service: UsersService) {}

  //endpoint para obtener los datos del usuario autenticado
  //se utiliza el decorador @Req para acceder a la solicitud y obtener el usuario autenticado
  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: RequestWithUser) {
    return {
      email: req.user.email, //correo electrónico del usuario autenticado
      role: req.user.role?.name, //nombre del rol del usuario
      permissionCodes: req.user.permissionCodes, //permisos del usuario
    };
  }

  //endpoint para iniciar sesión y registrar un nuevo usuario

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.service.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.service.register(body);
  }

  //enpoint para verificar si un usuario tiene un permiso específico
  @Get('can-do/:permission')
  @UseGuards(AuthGuard)
  canDo(
    @Req() request: RequestWithUser,
    @Param('permission') permission: string,
  ) {
    const allowed = this.service.canDo(request.user, permission);


    return {
      allowed, //indica si el usuario tiene el permiso solicitado
      permission, //permisos del usuario
      user: request.user, //datos del usuario autenticado
    };
  }

  //endpoint para refrescar el token de acceso

  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.service.refreshToken(
      request.headers['refresh-token'] as string,
    );
  }
//endpoint para actualizar el rol de un usuario específico por su ID
  @Patch('users/:id/role')
  assignRole(
    @Param('id') userId: number,
    @Body('roleId') roleId: number,
  ) {
    return this.service.assignRole(userId, roleId);
  }
}
