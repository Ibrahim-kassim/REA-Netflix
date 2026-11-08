// "More Like This": titles that share the most genres (one API call, cached per profile).
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { LazyImage } from '@/components/media/LazyImage';
import { IconButton } from '@/components/ui/IconButton';
import { CheckIcon, PlayIcon, PlusIcon } from '@/components/ui/Icons';
import { useActiveProfileId } from '@/hooks/useActiveProfile';
import { useMyListController } from '@/controllers/useMyListController';
import { queryKeys } from '@/services/queryKeys';
import { titlesApi } from '@/services/titles.api';
import { paths } from '@/routes/paths';
import { TitleFacts } from './TitleFacts';

export function MoreLikeThis({ slug }: { slug: string }) {
  const id = useActiveProfileId();
  const { data = [] } = useQuery({ queryKey: queryKeys.similar(id, slug), queryFn: ({ signal }) => titlesApi.similar(slug, signal) });
  const { isSaved, toggle } = useMyListController();
  const navigate = useNavigate();

  return (
    <section>
      <h3 className="mb-4 text-2xl font-bold">More Like This</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {data.map((t) => (
          <article key={t.slug} className="overflow-hidden rounded-md bg-surface-2">
            <button type="button" className="relative block aspect-video w-full" onClick={() => navigate(paths.watch(t.slug))} aria-label={`Play ${t.title}`}>
              <LazyImage images={t.backdrop} alt="" sizes="260px" />
              <span className="absolute inset-0 grid place-items-center text-3xl opacity-0 transition hover:opacity-100"><PlayIcon /></span>
            </button>
            <div className="flex flex-col gap-2 p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold">{t.title}</p>
                <IconButton label="My List" onClick={() => toggle.mutate({ slug: t.slug, add: !isSaved(t.slug) })}>
                  {isSaved(t.slug) ? <CheckIcon /> : <PlusIcon />}
                </IconButton>
              </div>
              <TitleFacts title={t} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
