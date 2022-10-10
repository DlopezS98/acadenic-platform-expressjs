import { Response } from 'express';
import {
  SignInRequestDTO,
  SignInResponseDTO,
  SignUpRequestDTO,
  SignUpResponseDTO,
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

@controller('/auth')
export default class AuthenticationController extends BaseApiController {
  @httpPost('/signin')
  public signIn(
    @response() res: Response,
    @requestBody() body: SignInRequestDTO
  ): Response<IHttpResponse<SignInResponseDTO>> {
    // eslint-disable-next-line no-console
    console.log('sigin-request', body);

    const data: SignInResponseDTO = {
      email: '01dlopezs98@gmail.com',
      jwt: { token: 's3cr3t3_jwt_t0k3n', expiresIn: '1d' },
      username: 'DlopezS98',
    };

    return res
      .status(HttpStatusCodes.Ok)
      .json(Ok('You\x27re logged in successfully!', data));
  }

  @httpPost('/signup')
  SignUp(
    @requestBody() body: SignUpRequestDTO,
    @response() res: Response
  ): Response<SignInResponseDTO> {
    const singUpResponse: SignUpResponseDTO = {
      id: '12DD880kmsJJDasjJS778NSU7hs7AUJUa7238',
      email: body.email,
      fullname: `${body.firstname} ${body.lastname}`,
      createdAt: new Date(),
    };

    return res
      .status(HttpStatusCodes.Ok)
      .json(Ok('you has been registered successfully!', singUpResponse));
  }
}
