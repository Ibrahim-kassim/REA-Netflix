// "97% Match · 13+ · 15m · HD" — the facts line under every preview.
import type { TitleCard } from '@/models/title';
import { Badge } from '@/components/ui/Badge';
import { useMatch } from '@/controllers/useMatch';
import { runtime } from '@/utils/format';

export function TitleFacts({ title }: { title: TitleCard }) {
  const match = useMatch();
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="font-bold text-[#46d369]">{match(title)}% Match</span>
      <Badge>{title.maturity}</Badge>
      <span className="text-text/90">{runtime(title.runtime_min)}</span>
      <span className="rounded-sm border border-white/40 px-1 text-[10px] font-bold">HD</span>
      {title.top10_rank && <span className="rounded-sm bg-brand px-1 text-[10px] font-black">TOP 10</span>}
    </div>
  );
}
