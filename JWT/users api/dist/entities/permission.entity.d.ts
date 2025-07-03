import { BaseEntity } from 'typeorm';
import { Role } from './role.entity';
export declare class Permission extends BaseEntity {
    id: number;
    code: string;
    description: string;
    roles: Role[];
}
