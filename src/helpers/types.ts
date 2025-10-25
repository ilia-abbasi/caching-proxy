export interface Options {
  port?: Number;
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
