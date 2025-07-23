import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';


//el servico se encarga de la logica de negocio relacionada a los permisos
// contiene los metodos para crear, obtener, actualizar y eliminar permisos

export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permission = this.permissionRepository.create(createPermissionDto);
    await this.permissionRepository.save(permission);
    return permission;
  }

  async findAll() {
    return this.permissionRepository.find();
  }

  async findOne(id: number) {
    return this.permissionRepository.findOneBy({ id });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    await this.permissionRepository.update(id, updatePermissionDto);
    return this.permissionRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.permissionRepository.delete(id);
    return { deleted: true };
  }
}
