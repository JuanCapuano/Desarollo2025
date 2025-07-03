import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { Request } from 'express';
import { RequestWithUser } from 'src/interfaces/request-user';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    me(req: RequestWithUser): {
        email: string;
        role: string;
        permissionCodes: string[];
    };
    login(body: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    register(body: RegisterDTO): Promise<{
        status: string;
    }>;
    canDo(request: RequestWithUser, permission: string): {
        allowed: boolean;
        permission: string;
        user: import("../entities/user.entity").UserEntity;
    };
    refreshToken(request: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    assignRole(userId: number, roleId: number): Promise<{
        status: string;
    }>;
}
