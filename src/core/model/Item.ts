import type { IHscode } from "./HsCode";
import type { IOriginArea } from "./OriginArea";
import type { ISupplier } from "./Supplier";
import type { User } from "./User";
  // src/types/IItem.ts
  export interface IName {
    english: string;
    mandarin: string;
    document?: string;
  }
  
  export interface IItemPicture {
    product?: string;
    packaging?: string;
  }
  
  export interface IItemDimension {
    length: number;
    width: number;
    height: number;
    volume: number;
  }
  
  export interface IPackagingDetail {
    name: string;
    quantity: number;
    dimension: IItemDimension;
  }
  
  export interface IItemPrice {
    currency: string;
    base: number;
    selling: number;
    under?: number;
  }
  
  export interface IItem {
    id: string;
    picture?: IItemPicture;
    name: IName;
    type: string;
    color?: string;
    remark?: string;
    dimension: IItemDimension;
    originArea: IOriginArea;
    supplier: ISupplier;
    packingQty?: number;
    packingDetail?: IPackagingDetail[];
    qtyPerPacking: number;
    unitName: string;
    packingVolume: number;
    volume: number;
    netWeight: number;
    grossWeight: number;
    hscode: IHscode;
    materialCategory: string;
    material: string;
    price?: IItemPrice[];
    updatedAt?: Date;
    statusDeleted: number;
    deletedAt?: Date;
    userCreated?: Partial<User>;
    userUpdated?: Partial<User>;
    userDeleted?: Partial<User>;
    [prop: string]: any; // Indexer property to allow additional data
  }
  