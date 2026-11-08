// Signed-in home: billboard, Continue Watching, Top 10 and every genre row (one request for all rows).
import { Billboard } from '@/components/media/Billboard';
import { LandscapeCard } from '@/components/media/LandscapeCard';
import { RankedCard } from '@/components/media/RankedCard';
import { Row } from '@/components/media/Row';
import { Spinner } from '@/components/ui/Spinner';
import { useBrowseController } from '@/controllers/useBrowseController';

export default function BrowsePage() {
  const { featured, rows, top10, continueWatching, profileName, isLoading } = useBrowseController();
  if (isLoading) return <Spinner label="Loading titles" />;

  return (
    <div className="pb-8">
      {featured && <Billboard title={featured} />}
      <div className="relative z-10 -mt-[6vw] flex flex-col gap-4 md:gap-8">
        {continueWatching.length > 0 && (
          <Row title={`Continue Watching for ${profileName}`} count={continueWatching.length}>
            {continueWatching.map((t) => <LandscapeCard key={t.slug} title={t} progress={t.progress} />)}
          </Row>
        )}
        <Row title="Top 10 Films Today" count={top10.length} placeholderClass="h-48 w-48 md:h-60 md:w-60">
          {top10.map((t, i) => <RankedCard key={t.slug} title={t} rank={i + 1} />)}
        </Row>
        {rows.map((row) => (
          <Row key={row.slug} title={row.name} count={row.titles.length}>
            {row.titles.map((t) => <LandscapeCard key={t.slug} title={t} />)}
          </Row>
        ))}
      </div>
    </div>
  );
}
