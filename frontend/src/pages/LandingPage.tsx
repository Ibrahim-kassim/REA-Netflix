// Signed-out home page, mirroring the sections REA found: hero, Trending Now, reasons, FAQ.
import { useQuery } from '@tanstack/react-query';
import { Hero } from '@/components/landing/Hero';
import { Top10Row } from '@/components/landing/Top10Row';
import { ValueProps } from '@/components/landing/ValueProps';
import { FaqSection } from '@/components/landing/FaqSection';
import { queryKeys } from '@/services/queryKeys';
import { titlesApi } from '@/services/titles.api';

export default function LandingPage() {
  const { data: top10 = [] } = useQuery({ queryKey: queryKeys.top10(false), queryFn: ({ signal }) => titlesApi.top10(false, signal) });
  return (
    <div className="flex flex-col gap-16">
      <Hero posters={top10} />
      <Top10Row />
      <ValueProps />
      <FaqSection />
    </div>
  );
}
