// Play · My List · Like · More — the same action row on hover cards and in the modal.
import { IconButton } from '@/components/ui/IconButton';
import { CheckIcon, ChevronDownIcon, PlayIcon, PlusIcon, ThumbIcon } from '@/components/ui/Icons';
import { useMyListController } from '@/controllers/useMyListController';
import { useRatingsController } from '@/controllers/useRatingsController';

type Props = { slug: string; onPlay: () => void; onMore?: () => void };

export function TitleActions({ slug, onPlay, onMore }: Props) {
  const { isSaved, toggle } = useMyListController();
  const { ratingOf, rate } = useRatingsController();
  const saved = isSaved(slug);
  const liked = ratingOf(slug) === 1;

  return (
    <div className="flex items-center gap-2">
      <IconButton label="Play" solid onClick={onPlay}><PlayIcon /></IconButton>
      <IconButton label={saved ? 'Remove from My List' : 'Add to My List'} onClick={() => toggle.mutate({ slug, add: !saved })}>
        {saved ? <CheckIcon /> : <PlusIcon />}
      </IconButton>
      <IconButton label={liked ? 'Remove rating' : 'I like this'} onClick={() => rate.mutate({ slug, value: liked ? 0 : 1 })}
        className={liked ? 'border-white bg-white/20' : undefined}>
        <ThumbIcon />
      </IconButton>
      {onMore && (
        <IconButton label="More info" className="ml-auto" onClick={onMore}><ChevronDownIcon /></IconButton>
      )}
    </div>
  );
}
