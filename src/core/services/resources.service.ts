import { PartialResourceDTO, ResourceDTO } from '@DTOs/resource.dto';
import IResource, { PartialResource } from '@Entities/resource.entity';
import Interfaces from '@Interfaces/interfaces-inversify.mappings';
import IResourcesRepository from '@Interfaces/repositories/iresources.repository';
import IResourcesService from '@Interfaces/services/iresources.service';
import { inject, injectable } from 'inversify';

@injectable()
export default class ResourcesService implements IResourcesService {
  constructor(
    @inject(Interfaces.ResourcesRepository)
    private readonly resourcesRepository: IResourcesRepository
  ) {}
  
  async getAll(): Promise<ResourceDTO[]> {
    const resources = await this.resourcesRepository.getAll();
    return resources.map((entity) => this.mapEntityToDto(entity));
  }

  async create(
    resource: PartialResourceDTO,
    user: string
  ): Promise<ResourceDTO> {
    const resourceDto = this.mapDtoToEntity(resource, user);
    const resourceEntity = await this.resourcesRepository.create(resourceDto);
    return this.mapEntityToDto(resourceEntity);
  }

  private mapDtoToEntity(
    dto: PartialResourceDTO,
    user: string
  ): PartialResource {
    return {
      url: dto.url,
      public: dto.public,
      title: dto.title,
      type: dto.type,
      createdBy: user,
      description: dto.description,
      shortDescription: dto.shortDescription,
      tags: dto.tags,
    };
  }

  private mapEntityToDto(entity: IResource): ResourceDTO {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      shortDescription: entity.shortDescription,
      public: entity.public,
      url: entity.url,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      createdBy: entity.createdBy,
      updatedBy: entity.updatedBy,
      type: entity.type,
      tags: entity.tags,
    };
  }
}
