import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtService } from 'src/jwt/jwt.service';

//el módulo es responsable de la configuración del módulo de roles
// importa el servicio de roles y el controlador de roles

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    UsersModule,
  ],
  providers: [RolesService],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}