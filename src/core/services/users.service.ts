import { PartialUserDTO, UserDTO } from '@DTOs/user.dto';
import IUser, { PartialUser } from '@Entities/user.entity';
import Interfaces from '@Interfaces/interfaces-inversify.mappings';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import IUsersService from '@Interfaces/services/iusers.service';
import { inject } from 'inversify';

export default class UsersService implements IUsersService {
  constructor(
    @inject(Interfaces.UsersRepository)
    private readonly usersRepository: IUsersRepository
  ) {}

  async create(user: PartialUserDTO): Promise<UserDTO> {
    const partialEntity = this.mapDtoToEntity(user);
    const entity = await this.usersRepository.create(partialEntity);
    return this.mapEntityToDto(entity);
  }

  async getAll(): Promise<Array<UserDTO>> {
    const userEntities = await this.usersRepository.getAll();
    return userEntities.map((entity) => this.mapEntityToDto(entity));
  }

  async getById(id: string): Promise<UserDTO | undefined> {
    const entity = await this.usersRepository.getById(id);
    return entity ? this.mapEntityToDto(entity) : undefined;
  }

  private mapDtoToEntity(userDto: PartialUserDTO): PartialUser {
    return {
      email: userDto.email,
      username: userDto.username,
      password: userDto.password,
      firstname: userDto.firstname,
      lastname: userDto.lastname,
      locked: userDto.locked,
    };
  }

  private mapEntityToDto(userEntity: IUser): UserDTO {
    return {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
      password: '',
      locked: userEntity.locked,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
      firstname: userEntity.firstname,
      lastname: userEntity.lastname,
    };
  }
}
