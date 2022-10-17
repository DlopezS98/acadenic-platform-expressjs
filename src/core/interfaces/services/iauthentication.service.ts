import { SignInRequestDTO, SignInResponseDTO, SignUpRequestDTO } from '@DTOs/authentication.dto';
import { UserDTO } from '@DTOs/user.dto';
import JWTPayload from '@Shared/types/jwt.payload';

export default interface IAuthenticationService {
  signIn(user: SignInRequestDTO): Promise<SignInResponseDTO>;
  singUp(user: SignUpRequestDTO): Promise<UserDTO>;
  verifyToken(token: string): JWTPayload;
  getJwtPayloadFromDTO(user: UserDTO): JWTPayload;
}
