import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, JwtService],
  controllers: [UsersController],
  exports: [UsersService, JwtService], // Exporta el servicio si lo usas en otros módulos
})
export class UsersModule {}