import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    //console.log(createRoleDto);
    const role = this.roleRepository.create({name:createRoleDto.name,permissions:createRoleDto.permissions.map(p=>{return {id:p}})});
    //console.log(role)
    await this.roleRepository.save(role);
    return role;
  }

  async findAll() {
    return this.roleRepository.find({ relations: ['permissions'] });
  }

  async findOne(id: number) {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    if (!role) {
      throw new Error('Rol no encontrado');
    }

    if (updateRoleDto.name) {
      role.name = updateRoleDto.name;
    }

    if (updateRoleDto.permissions) {
      // Asigna los permisos usando los IDs recibidos
      role.permissions = updateRoleDto.permissions.map(pid => ({ id: pid })) as any;
    }

    await this.roleRepository.save(role);

    // Vuelve a buscar el rol con los permisos actualizados para la respuesta
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async remove(id: number) {
    await this.roleRepository.delete(id);
    return { deleted: true };
  }
}
