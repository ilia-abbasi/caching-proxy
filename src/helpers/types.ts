export interface Options {
  clearCache?: boolean;
  port?: number;
  origin?: string;
}

export interface PackageData {
  name: string;
  description: string;
  version: string;
}

export interface ResponseObj {
  contentType: string;
  body: string;
}

export type Tag = "server" | "redis";
export type RedisValue = string | number | null;
export type OsName = "none" | "lin" | "win";
