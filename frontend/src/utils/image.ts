// Responsive images: { w342: url, w780: url } → "url 342w, url 780w".
import type { ImageSet } from '@/models/title';

export const srcSet = (images: ImageSet): string =>
  Object.entries(images)
    .map(([size, url]) => `${url} ${size.replace('w', '')}w`)
    .join(', ');

export const smallest = (images: ImageSet): string => Object.values(images)[0] ?? '';
