// Responsive, lazy-loaded image that fades in once decoded (no layout shift: the parent sets the size).
import { useState } from 'react';
import type { ImageSet } from '@/models/title';
import { cn } from '@/utils/cn';
import { smallest, srcSet } from '@/utils/image';

type Props = { images: ImageSet; alt: string; sizes: string; className?: string; eager?: boolean };

export function LazyImage({ images, alt, sizes, className, eager = false }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={smallest(images)}
      srcSet={srcSet(images)}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={cn('h-full w-full object-cover transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0', className)}
    />
  );
}
