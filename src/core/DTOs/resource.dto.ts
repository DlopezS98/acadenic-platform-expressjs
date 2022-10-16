import { MimeTypes } from '@Shared/types/common.cd';

export interface ResourceDTO {
  id: string;
  url: string;
  title: string;
  public: boolean;
  description?: string;
  shortDescription?: string;
  tags?: Array<string>;
  type: MimeTypes;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: string;
  updatedBy?: string;
}

// export type PartialResourceDTO = PartialBy<ResourceDTO, 'id' | 'createdAt' | 'createdBy'>
export type PartialResourceDTO = Omit<
  ResourceDTO,
  'id' | 'createdAt' | 'createdBy' | 'updatedBy' | 'updatedAt'
>;
