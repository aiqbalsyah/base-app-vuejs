import type { User } from "./User";

export enum HscodeStatus {
  Inactive = 0,
  Active = 1,
}

export interface IHscode {
  id: string;
  code: string;
  name: string;
  description?: string;
  bm? : number;
  ppn? : number;
  pph? : number;
  lartas? : boolean;
  spiPermit? : boolean;
  sni? : boolean;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  statusDeleted?: number;
  deletedAt?: Date;
  userCreated?: User;
  userUpdated?:User;
  userDeleted?: User;
}
  