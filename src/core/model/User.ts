export interface IUser {
  id: string;
  displayName: string;
  email: string;
  password?: string | null; 
  role: string;
  imageUrl: string;
  api_token: string;
  status:  boolean;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: number;
  updatedBy?: number;
  statusDeleted?: number;
}

export class User implements IUser {
  constructor(
    public id: string,
    public displayName: string,
    public email: string,
    public password: string | null = null,
    public role: string,
    public imageUrl: string,
    public api_token: string,
    public status:  boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
    public createdBy?: number,
    public updatedBy?: number,
    public statusDeleted?: number,
  ) {}
}
