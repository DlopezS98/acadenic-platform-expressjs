import Resources from '@Database/models/resources.model';
import IResource, { Columns, PartialResource } from '@Entities/resource.entity';
import IResourcesRepository from '@Interfaces/repositories/iresources.repository';
import { injectable } from 'inversify';

@injectable()
export default class ResourcesRepository implements IResourcesRepository {

  async getAll(): Promise<Array<IResource>>;
  async getAll(columns: Array<Columns>): Promise<Array<IResource>>;
  async getAll(columns?: Array<unknown>): Promise<Array<IResource>> {
    const resources = await (
      columns && columns.length
        ? Resources.query().select(columns)
        : Resources.query().select('*')
    );

    return resources.map((model) => this.mapModelToEntity(model));
  }
  
  async create(resource: PartialResource): Promise<IResource> {
    const resourceModel = await Resources.query().insert(resource);
    return this.mapModelToEntity(resourceModel);
  }

  private mapModelToEntity(model: Resources): IResource {
    return {
      id: model.id,
      url: model.url,
      public: model.public,
      title: model.title,
      description: model.description,
      shortDescription: model.shortDescription,
      type: model.type,
      tags: model.tags,
      createdAt: model.createdAt,
      createdBy: model.createdBy,
      updatedAt: model.updatedAt,
      updatedBy: model.updatedBy,
    };
  }
}
