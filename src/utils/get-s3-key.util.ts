export function getS3KeyFromUrl(url: string): string {
  return new URL(url).pathname.slice(1);
}
