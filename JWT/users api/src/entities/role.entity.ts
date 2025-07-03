import { Entity,BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from './user.entity';
import { Permission } from './permission.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Relación: un rol puede tener muchos usuarios
  @OneToMany(() => UserEntity, (user) => user.role)
  users: UserEntity[];

  // Relación: un rol puede tener muchos permisos
  @ManyToMany(() => Permission,(permission) => permission.roles)
  @JoinTable()
  permissions: Permission[];
}
