import IRole from '@Entities/role.entity';
import { Model } from 'objection';

export default class Roles extends Model implements IRole {
  id!: string;
  name!: string;
  description?: string | undefined;
  active!: boolean;

  static get tableName(): string {
    return 'roles';
  }
}
