import { PartialUserDTO, UserDTO } from '@DTOs/user.dto';

export default interface IUsersService {
  create(user: PartialUserDTO): Promise<UserDTO>;
  getAll(): Promise<Array<UserDTO>>;
  getById(id: string): Promise<UserDTO | undefined>;
  getByUsernameOrEmail(userOrEmail: string): Promise<UserDTO | undefined>;
}
