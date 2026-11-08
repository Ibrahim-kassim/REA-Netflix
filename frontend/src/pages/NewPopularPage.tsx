// New & Popular: the newest films and what everyone is watching.
import { useQuery } from '@tanstack/react-query';
import { LandscapeCard } from '@/components/media/LandscapeCard';
import { RankedCard } from '@/components/media/RankedCard';
import { Row } from '@/components/media/Row';
import { useActiveProfile } from '@/hooks/useActiveProfile';
import { queryKeys } from '@/services/queryKeys';
import { titlesApi } from '@/services/titles.api';

export default function NewPopularPage() {
  const { id, profile } = useActiveProfile();
  const kids = Boolean(profile?.kids);
  const { data: newest = [] } = useQuery({ queryKey: queryKeys.newest(id), queryFn: ({ signal }) => titlesApi.newest(signal) });
  const { data: top10 = [] } = useQuery({ queryKey: queryKeys.top10(kids), queryFn: ({ signal }) => titlesApi.top10(kids, signal) });

  return (
    <div className="flex flex-col gap-8 pt-28">
      <Row title="🍿 New on REAflix" count={newest.length}>
        {newest.map((t) => <LandscapeCard key={t.slug} title={t} />)}
      </Row>
      <Row title="🔥 Everyone's Watching: Top 10" count={top10.length} placeholderClass="h-48 w-48 md:h-60 md:w-60">
        {top10.map((t, i) => <RankedCard key={t.slug} title={t} rank={i + 1} />)}
      </Row>
    </div>
  );
}
