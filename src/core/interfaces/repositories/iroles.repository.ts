import IRole, { PartialRole } from '@Entities/role.entity';

export interface IRolesRepository {
  create(role: PartialRole): Promise<IRole>;
  update(role: PartialRole): Promise<IRole>;
  delete(id: string): Promise<IRole>;
  getAll(): Promise<Array<IRole>>;
  getById(id: string): Promise<IRole | undefined>;
  getByName(name: string): Promise<IRole | undefined>;
}
