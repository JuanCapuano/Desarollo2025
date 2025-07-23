import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersModule } from './users/users.module';
import { RolesService } from './roles/roles.service';
import { PermissionsService } from './permissions/permissions.service';
import { RolesController } from './roles/roles.controller';
import { PermissionsController } from './permissions/permissions.controller';
//módulo principal de la aplicación
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'postgres',      
      password: 'postgres',   
      database: 'jwt_db',         
      entities,
      synchronize: true,         
    }),
    TypeOrmModule.forFeature(entities),
    RolesModule,
    PermissionsModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController,],
  providers: [AuthGuard, JwtService,],
})
export class AppModule {}
