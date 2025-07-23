import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permissions } from '../middlewares/decorators/permissions.decorator';
import { AuthGuard } from '../middlewares/auth.middleware';

//el controlador maneja las solicitudes HTTP relacionadas a los roles
// define los endpoints para crear, obtener, actualizar y eliminar roles

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  
  //endpoint para crear un nuevo rol
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }
//endpoint para obtener todos los roles
  @Get()
  @UseGuards(AuthGuard)
  @Permissions(['roles_read'])
  findAll() {
    return this.rolesService.findAll();
  }
//endpoint para obtener un rol específico por su ID
  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(['roles_read'])
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }
//endpoint para actualizar un rol específico por su ID
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

//endpoint para eliminar un rol específico por su ID
  
  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(['roles_delete'])
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
