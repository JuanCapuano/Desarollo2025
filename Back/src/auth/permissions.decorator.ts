import { SetMetadata } from '@nestjs/common';

// Decorador para definir los permisos requeridos en los endpoints
// Este decorador se utiliza en los controladores para especificar 
// qué permisos son necesarios para acceder

export const Permissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);

//la sintaxis usa SetMetadata de NestJS para crear un decorador personalizado llamado Permissions, que es de tipo string[].
//que se puede aplicar a los métodos de los controladores.Lo que hace es asociar los permisos requeridos con el método del controlador.
//Esto permite que el AuthGuard pueda verificar si el usuario tiene los permisos necesarios para acceder al endpoint.