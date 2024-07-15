export interface IBankAccount {
    name: string;
    accountNumber: string;
    accountName: string;
    swiftCode?: string;
    [prop: string]: any; // Indexer property to allow additional data
  }
  