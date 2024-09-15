import Roles from '@Database/models/roles.model';
import RoleEntity, { PartialRole } from '@Entities/role.entity';
import { IRolesRepository } from '@Interfaces/repositories/iroles.repository';

export default class RolesRepository implements IRolesRepository {
  getById(id: string): Promise<RoleEntity | undefined> {
    throw new Error('Method not implemented.');
  }
  getByName(name: string): Promise<RoleEntity | undefined> {
    throw new Error('Method not implemented.');
  }
  async create(role: PartialRole): Promise<RoleEntity> {
    const roleModel = await Roles.query().insert(role);
    return roleModel.toJSON();
  }
  async update(role: PartialRole): Promise<RoleEntity> {
    await Roles.query().update(role);
    return 
  }
  async delete(id: string): Promise<RoleEntity> {
    throw new Error('Method not implemented.');
  }
  async getAll(): Promise<RoleEntity[]> {
    throw new Error('Method not implemented.');
  }
}
