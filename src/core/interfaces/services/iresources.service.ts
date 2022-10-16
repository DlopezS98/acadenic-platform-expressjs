import { PartialResourceDTO, ResourceDTO } from '@DTOs/resource.dto';

export default interface IResourcesService {
  create(resource: PartialResourceDTO, user: string): Promise<ResourceDTO>;
  getAll(): Promise<Array<ResourceDTO>>;
}
