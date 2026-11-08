// "Trending Now" on the landing page: the public Top 10 (clicks lead to sign-up).
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { RankedCard } from '@/components/media/RankedCard';
import { Row } from '@/components/media/Row';
import { queryKeys } from '@/services/queryKeys';
import { titlesApi } from '@/services/titles.api';
import { paths } from '@/routes/paths';

export function Top10Row() {
  const navigate = useNavigate();
  const { data = [] } = useQuery({ queryKey: queryKeys.top10(false), queryFn: ({ signal }) => titlesApi.top10(false, signal) });
  return (
    <Row title="Trending Now" count={data.length} placeholderClass="h-48 w-48 md:h-60 md:w-60">
      {data.map((title, index) => (
        <RankedCard key={title.slug} title={title} rank={index + 1} onSelect={() => navigate(paths.signup)} />
      ))}
    </Row>
  );
}
