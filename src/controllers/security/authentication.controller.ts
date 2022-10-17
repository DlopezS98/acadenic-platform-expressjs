import { Response } from 'express';
import {
  SignInRequestDTO,
  SignInResponseDTO,
  SignUpRequestDTO,
} from '@Shared/dtos/security/authentication.dto';
import {
  controller,
  httpPost,
  requestBody,
  response,
} from 'inversify-express-utils';
import { IHttpResponse } from '@Shared/types/common.cd';
import BaseApiController from '@Controllers/base-api.controller';
import { Ok } from '@Shared/utils/http-responses';
import HttpStatusCodes from '@Shared/types/http-status-codes';
import { inject } from 'inversify';
import Interfaces from '@Interfaces/interfaces-inversify.mappings';
import IAuthenticationService from '@Interfaces/services/iauthentication.service';

@controller('/auth')
export default class AuthenticationController extends BaseApiController {
  constructor(
    @inject(Interfaces.AuthenticationService)
    private readonly authService: IAuthenticationService
  ) {
    super();
  }

  @httpPost('/signin')
  public async signIn(
    @response() res: Response,
    @requestBody() body: SignInRequestDTO
  ): Promise<Response<IHttpResponse<SignInResponseDTO>>> {
    const sigInResponse = await this.authService.signIn(body);
    return res
      .status(HttpStatusCodes.Ok)
      .json(Ok('You\x27re logged in successfully!', sigInResponse));
  }

  @httpPost('/signup')
  public async signUp(
    @requestBody() body: SignUpRequestDTO,
    @response() res: Response
  ): Promise<Response<SignInResponseDTO>> {
    const singUpResponse = this.authService.singUp(body);

    return res
      .status(HttpStatusCodes.Ok)
      .json(Ok('you has been registered successfully!', singUpResponse));
  }
}
