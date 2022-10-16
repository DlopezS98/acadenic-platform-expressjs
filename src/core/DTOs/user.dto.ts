import { PartialBy } from '@Shared/types/common.cd';

export interface UserDTO {
  id: string;
  username: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  locked: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export type PartialUserDTO = PartialBy<UserDTO, 'id' | 'createdAt'>;
