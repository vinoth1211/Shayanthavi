export type BlobAccess = "public" | "private";

/** Must match your Vercel Blob store access setting (Storage → your store). Server-side only. */
export function getBlobAccess(): BlobAccess {
  const access = process.env.BLOB_ACCESS?.toLowerCase();
  if (access === "public" || access === "private") {
    return access;
  }
  return "private";
}

function isPrivateBlobUrl(url: string): boolean {
  return url.includes(".private.blob.vercel-storage.com");
}

/** Resolve image URL for use in img src (proxies private blob URLs through /api/media). */
export function resolveImageUrl(url: string): string {
  if (!url) return url;
  if (url.startsWith("/")) return url;
  if (isPrivateBlobUrl(url)) {
    return `/api/media?url=${encodeURIComponent(url)}`;
  }
  return url;
}
