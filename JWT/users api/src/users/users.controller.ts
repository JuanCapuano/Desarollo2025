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

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req: RequestWithUser) {
    return {
      email: req.user.email,
      role: req.user.role?.name,
      permissionCodes: req.user.permissionCodes,
    };
  }

  @Post('login')
  login(@Body() body: LoginDTO) {
    return this.service.login(body);
  }

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.service.register(body);
  }

  @Get('can-do/:permission')
  @UseGuards(AuthGuard)
  canDo(
    @Req() request: RequestWithUser,
    @Param('permission') permission: string,
  ) {
    const allowed = this.service.canDo(request.user, permission);

    return {
      allowed,
      permission,
      user: request.user,
    };
  }

  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.service.refreshToken(
      request.headers['refresh-token'] as string,
    );
  }

  @Patch('users/:id/role')
  assignRole(
    @Param('id') userId: number,
    @Body('roleId') roleId: number,
  ) {
    return this.service.assignRole(userId, roleId);
  }
}
