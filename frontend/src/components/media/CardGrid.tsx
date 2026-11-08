// Wrapping grid of 16:9 cards (My List, search, New & Popular).
import type { TitleCard } from '@/models/title';
import { LandscapeCard } from './LandscapeCard';

export function CardGrid({ titles }: { titles: TitleCard[] }) {
  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-8">
      {titles.map((title) => (
        <LandscapeCard key={title.slug} title={title} />
      ))}
    </div>
  );
}
