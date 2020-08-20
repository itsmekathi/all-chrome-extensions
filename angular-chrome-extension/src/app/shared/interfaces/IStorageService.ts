export interface IStorageService {
  get(key: string, noExpire?: boolean): Promise<any>;
  set(key: string, value: any, expiration?: Date): Promise<any>;
  remove(key: string): Promise<void>;
  exist(key: string): Promise<boolean>;
  clear(...excludedKeys: string[]): Promise<void>;
}
