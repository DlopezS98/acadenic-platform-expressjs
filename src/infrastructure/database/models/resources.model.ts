import IResource from '@Entities/resource.entity';
import { MimeTypes } from '@Shared/types/common.cd';
import { Model } from 'objection';

export default class Resources extends Model implements IResource {
  id!: string;
  url!: string;
  public!: boolean;
  title!: string;
  description?: string | undefined;
  shortDescription?: string | undefined;
  tags?: string[] | undefined;
  type!: MimeTypes;
  createdAt!: Date;
  updatedAt?: Date | undefined;
  createdBy!: string;
  updatedBy?: string | undefined;

  static get tableName(): string {
    return 'resources';
  }
}
