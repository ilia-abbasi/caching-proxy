import { Tag } from "./types.js";

export function customLog(tag: Tag, text: string | undefined | null): void {
  console.log(`[${tag.toUpperCase()}] ${text}`);
}
