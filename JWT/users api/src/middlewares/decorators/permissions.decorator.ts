import { SetMetadata } from '@nestjs/common';
//un decorador personalizado para definir los permisos requeridos en los endpoints
//se utiliza en los controladores para especificar qué permisos son necesarios para acceder a un endpoint

export const Permissions = (permissions: string[]) =>
  SetMetadata('permissions', permissions);


//un decorador es una función que se utiliza para agregar metadatos a una clase, método o propiedad en TypeScript.
//los decoradores se utilizan en NestJS para definir comportamientos adicionales o configuraciones para las clases y métodos.