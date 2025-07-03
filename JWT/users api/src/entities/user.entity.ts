import { UserI } from '../interfaces/user.interface';
import { BaseEntity, Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';
import { ManyToOne, JoinColumn } from 'typeorm';
@Entity('users')
export class UserEntity extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({unique:true})
  @Column()
  email: string;
  @Column()
  password: string;

  get permissionCodes(): string[] {
    // Si el usuario tiene un rol y ese rol tiene permisos, devuelve los códigos de esos permisos
    return this.role?.permissions?.map((perm) => perm.code) || [];
  }

  // Un usuario tiene un solo rol
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}

