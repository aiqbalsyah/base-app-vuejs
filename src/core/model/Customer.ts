import type { User } from "./User";

export interface ICustomer {
    id: string;
    code: string;
    name: string;
    pic: string;
    phoneNumber: string;
    taxNumber?: string;
    address: string;
    email?: string;
    imageUrl?: string;
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