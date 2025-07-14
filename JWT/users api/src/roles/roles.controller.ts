import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permissions } from '../middlewares/decorators/permissions.decorator';


import { AuthGuard } from '../middlewares/auth.middleware';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  
  
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(['roles_read'])
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(['roles_read'])
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }


  
  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(['roles_delete'])
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
