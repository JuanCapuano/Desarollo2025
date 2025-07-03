import { BaseEntity } from 'typeorm';
import { UserEntity } from './user.entity';
import { Permission } from './permission.entity';
export declare class Role extends BaseEntity {
    id: number;
    name: string;
    users: UserEntity[];
    permissions: Permission[];
}
