import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { AuthGuard } from '../middlewares/auth.middleware';
import { Permissions } from '../middlewares/decorators/permissions.decorator';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.create(createPermissionDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(['permissions_read'])
  findAll() {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(['permissions_read'])
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Permissions(['permissions_update'])
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionsService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(['permissions_delete'])
  remove(@Param('id') id: string) {
    return this.permissionsService.remove(+id);
  }
}
