import { ObjectKeys, PartialBy } from '@Shared/types/common.cd';

export default interface IUser {
  id: string;
  email: string;
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;
  normalizedUsername: string;
  normalizedEmail: string;
  locked: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

/** Type that omits autogenerated columns in the database */
export type PartialUser = PartialBy<IUser, 'id' | 'createdAt' | 'normalizedUsername' | 'normalizedEmail' | 'locked'>;
export type Columns = ObjectKeys<IUser>;
