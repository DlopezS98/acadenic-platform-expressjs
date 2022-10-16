import IResource, { Columns, PartialResource } from '@Entities/resource.entity';

export default interface IResourcesRepository {
  create(resource: PartialResource): Promise<IResource>;
  getAll(): Promise<Array<IResource>>;
  getAll(columns: Array<Columns>): Promise<Array<IResource>>;
}
