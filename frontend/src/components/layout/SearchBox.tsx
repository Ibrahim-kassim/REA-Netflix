// Netflix-style search: an icon that opens into an input; typing updates /search?q= (debounced).
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { SearchIcon } from '@/components/ui/Icons';
import { useDebounced } from '@/hooks/useDebounced';
import { paths } from '@/routes/paths';
import { cn } from '@/utils/cn';

export function SearchBox() {
  const location = useLocation();
  const navigate = useNavigate();
  const initial = new URLSearchParams(location.search).get('q') ?? '';
  const [open, setOpen] = useState(initial !== '');
  const [text, setText] = useState(initial);
  const query = useDebounced(text.trim(), 300);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query) navigate(`${paths.search}?q=${encodeURIComponent(query)}`, { replace: location.pathname === paths.search });
    else if (location.pathname === paths.search) navigate(paths.browse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className={cn('flex items-center gap-2 border px-2 py-1 transition-all', open ? 'border-white bg-ink/80' : 'border-transparent')}>
      <button type="button" aria-label="Search" onClick={() => (setOpen(true), setTimeout(() => input.current?.focus(), 0))} className="text-xl">
        <SearchIcon />
      </button>
      <input
        ref={input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => !text && setOpen(false)}
        placeholder="Titles, genres"
        aria-label="Search titles"
        className={cn('bg-transparent text-sm outline-none transition-all', open ? 'w-44 md:w-60' : 'w-0')}
      />
    </div>
  );
}
