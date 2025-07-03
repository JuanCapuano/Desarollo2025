import { extend } from 'dayjs';
import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  // Relación: un rol puede tener muchos permisos
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
