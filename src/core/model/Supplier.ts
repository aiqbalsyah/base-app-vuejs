import type { IBankAccount } from "./BankAccount";
import type { ICountry } from "./Country";
import type { IOriginArea } from "./OriginArea";
import type { User } from "./User";

export interface ISupplier {
    id: string;
    name: string;
    country?: Partial<ICountry> | null;
    originArea?: Partial<IOriginArea> | null;
    initial?: string;
    alias?: string;
    pic: string;
    taxNumber?: string;
    address: string;
    phoneNumber: string;
    email?: string;
    imageUrl?: string;
    bankAccount?: Partial<IBankAccount>[];
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
  