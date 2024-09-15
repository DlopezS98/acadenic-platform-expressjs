import { RequiredBy } from '@Shared/types/common.cd';

export default interface IRole {
  id: string;
  name: string;
  description?: string;
  active: boolean;
}

export type PartialRole = RequiredBy<IRole, 'name'>;
