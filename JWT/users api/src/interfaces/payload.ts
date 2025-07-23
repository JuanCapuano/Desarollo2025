import { JwtPayload } from 'jsonwebtoken';
//un interface es una forma de definir la estructura de un objeto en TypeScript.
//Payload es la interfaz que define la estructura del payload del token JWT.
//Contiene el email del usuario y la fecha de expiración del token.
export interface Payload extends JwtPayload {
  email: string;
  exp: number;
}
