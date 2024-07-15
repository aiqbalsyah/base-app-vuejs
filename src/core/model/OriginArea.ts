import type { ICountry } from "./Country";
import type { User } from "./User";

export interface IOriginArea {
    id: string;
    country?: Partial<ICountry> | null;
    name: string;
    code: string;
    status?: boolean; // 0: inactive, 1: active, 2: suspended
    createdAt?: Date;
    updatedAt?: Date;
    statusDeleted: number; // 0: not deleted, 1: deleted
    deletedAt?: Date;
    userCreated?: Partial<User>;
    userUpdated?: Partial<User>;
    userDeleted?: Partial<User>;
    [prop: string]: any; // Indexer property to allow additional data
  }