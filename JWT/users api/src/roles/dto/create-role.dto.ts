export class CreateRoleDto {
  name: string;
  permissions?: number[]; // IDs de permisos opcionales
}