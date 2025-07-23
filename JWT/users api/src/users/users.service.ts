import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';


@Injectable()
export class UsersService {
  repository = UserEntity;
  constructor(private jwtService: JwtService) {}

  async refreshToken(refreshToken: string) {
    return this.jwtService.refreshToken(refreshToken);
  }

  //el canDo es un método que verifica si el usuario tiene un permiso específico
  canDo(user: UserI, permission: string): boolean {
    console.log('Permisos del usuario:', user.permissionCodes);
    console.log('Permiso solicitado:', permission);

    const result = user.permissionCodes.includes(permission); //permision es el permiso que se le pasa al método y user.permissionCodes es un array con los permisos del usuario
    if (!result) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async register(body: RegisterDTO) {
    try {
      const user = new UserEntity();
      Object.assign(user, body);
      user.password = hashSync(user.password, 10); //usamos hash para encriptar la contraseña, lo que hace es convertir la contraseña en un hash de 10 rondas
      await this.repository.save(user);
      return { status: 'created' };
    } catch (error) {
      throw new HttpException('Error de creacion', 500); 
    }
  }

  async login(body: LoginDTO) {
    const user = await this.findByEmail(body.email); //buscamos al usuario por su email en la base de datos
    if (user == null) {
      throw new UnauthorizedException(); //si el usuario no existe, lanzamos una excepción de autorización
    }
    const compareResult = compareSync(body.password, user.password); //compareSync compara la contraseña ingresada con el hash almacenado en la base de datos
    if (!compareResult) {
      throw new UnauthorizedException(); //si la contraseña no coincide, lanzamos una excepción de autorización
    }
    return {
      accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'), //generamos un token de acceso con el email del usuario y el tipo de token 'auth'
      refreshToken: this.jwtService.generateToken(
        { email: user.email },
        'refresh',
      )
    };
  }
  async findByEmail(email: string): Promise<UserEntity> {
    return await UserEntity.findOne({
      where: { email },
      relations: ['role', 'role.permissions'], 
    });
  }

  async assignRole(userId: number, roleId: number) {
    const user = await this.repository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }
    user.role = roleId as any; // O busca el rol si necesitas el objeto completo
    await this.repository.save(user);
    return { status: 'rol asignado' };
  }
}
