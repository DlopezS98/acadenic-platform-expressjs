/* eslint-disable no-underscore-dangle */
import { PartialUserDTO, UserDTO } from '@DTOs/user.dto';
import IUser, { PartialUser } from '@Entities/user.entity';
import Interfaces from '@Interfaces/interfaces-inversify.mappings';
import IUsersRepository from '@Interfaces/repositories/iusers.repository';
import IUsersService from '@Interfaces/services/iusers.service';
import Regexp from '@Shared/constants/regexp';
import { BadRequestException, NotFoundException } from '@Shared/utils/http-exceptions';
import { inject, injectable } from 'inversify';

@injectable()
export default class UsersService implements IUsersService {
  constructor(
    @inject(Interfaces.UsersRepository)
    private readonly usersRepository: IUsersRepository
  ) {}

  async getByUsernameOrEmail(
    userOrEmail: string
  ): Promise<UserDTO | undefined> {
    const userEntity = await this._getByUsernameOrEmail(userOrEmail);
    return userEntity ? this.mapEntityToDto(userEntity) : undefined;
  }

  private async _getByUsernameOrEmail(userOrEmail: string): Promise<IUser | undefined> {
    const isEmail = Regexp.isEmail(userOrEmail);
   return (isEmail
      ? this.usersRepository.getByEmail(userOrEmail)
      : this.usersRepository.getByUsername(userOrEmail));
  }

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

  async validateCredentials(user: string, password: string): Promise<UserDTO> {
    const entity = await this._getByUsernameOrEmail(user);
    if(!entity) throw new NotFoundException('The user doesn\x27t exists!');

    const passwordsAreNotEquals = await this.usersRepository.matchPassword(entity.password, password);
    if(!passwordsAreNotEquals) throw new BadRequestException('The password is wrong!');
    
    return this.mapEntityToDto(entity);
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
