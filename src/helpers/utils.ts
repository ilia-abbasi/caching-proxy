import { OsName, Tag } from "./types.js";

export function customLog(tag: Tag, text: string | undefined | null): void {
  console.log(`[${tag.toUpperCase()}] ${text}`);
}

export function fixHost(host: string): string {
  host = host.toLowerCase();

  if (!host.startsWith("http")) {
    host = `http://${host}`;
  }

  return host;
}

export function getOsName(): OsName {
  const platform = process.platform.toLowerCase();

  if (platform.includes("lin")) return "lin";
  if (platform.includes("win")) return "win";

  return "none";
}
