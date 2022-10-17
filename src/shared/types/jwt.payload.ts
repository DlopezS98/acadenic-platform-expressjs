import Jwt from 'jsonwebtoken';

export default interface JWTPayload extends Jwt.JwtPayload {
  id: string;
  username: string;
  email: string;
  roles: Array<string>;
}
