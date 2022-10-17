import Jwt from 'jsonwebtoken';
import Environment from '@Config/environment';
import {
  SignInRequestDTO,
  SignInResponseDTO,
  SignUpRequestDTO,
} from '@DTOs/authentication.dto';
import { UserDTO } from '@DTOs/user.dto';
import Interfaces from '@Interfaces/interfaces-inversify.mappings';
import IAuthenticationService from '@Interfaces/services/iauthentication.service';
import JWTPayload from '@Shared/types/jwt.payload';
import { inject, injectable } from 'inversify';
import { IHttpResponse } from '@Shared/types/common.cd';
import { isErrorObject } from '@Shared/guards/common-types.guard';
import HttpException from '@Shared/utils/http-exceptions';
import HttpStatusCodes from '@Shared/types/http-status-codes';
import UsersService from '@Services/users.service';

@injectable()
export default class AuthenticationService implements IAuthenticationService {
  private readonly environment: Environment;

  constructor(
    @inject(Interfaces.UsersService) private readonly usersService: UsersService
  ) {
    this.environment = new Environment();
  }

  async signIn(userDto: SignInRequestDTO): Promise<SignInResponseDTO> {
    const user = await this.usersService.validateCredentials(
      userDto.user,
      userDto.password
    );
    const payload: JWTPayload = this.getJwtPayloadFromDTO(user);
    const token: string = Jwt.sign(payload, this.environment.JWT_SECRETE_KEY, {
      expiresIn: this.environment.JWT_EXPIRES_IN,
    });

    return {
      email: user.email,
      username: user.email,
      jwt: { token, expiresIn: this.environment.JWT_EXPIRES_IN },
    };
  }

  singUp(user: SignUpRequestDTO): Promise<UserDTO> {
    const { email, password, username } = user;
    return this.usersService.create({
      username,
      email,
      password,
      locked: false,
    });
  }

  verifyToken(token: string): JWTPayload {
    try {
      return <JWTPayload>Jwt.verify(token, this.environment.JWT_SECRETE_KEY);
    } catch (error) {
      const { message, code } = this.jwtErrorHanlder(error);
      throw new HttpException({ message, code });
    }
  }

  private jwtErrorHanlder(
    error: unknown
  ): Pick<IHttpResponse, 'message' | 'code'> {
    if (!isErrorObject(error)) throw new HttpException();

    if (error.name === 'TokenExpiredError')
      return {
        message: 'The user token has been expired, please sign in again!',
        code: HttpStatusCodes.Unauthorized,
      };

    return { message: error.message, code: HttpStatusCodes.Unauthorized };
  }

  getJwtPayloadFromDTO(user: UserDTO): JWTPayload {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: [],
    };
  }
}
