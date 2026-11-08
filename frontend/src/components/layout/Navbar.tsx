// Signed-in header: logo, sections, search, kids badge and the profile menu; turns solid on scroll.
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Logo } from '@/components/ui/Logo';
import { useActiveProfile } from '@/hooks/useActiveProfile';
import { paths } from '@/routes/paths';
import { cn } from '@/utils/cn';
import { ProfileMenu } from './ProfileMenu';
import { SearchBox } from './SearchBox';

const links = [
  { to: paths.browse, label: 'Home', end: true },
  { to: paths.newPopular, label: 'New & Popular', end: false },
  { to: paths.myList, label: 'My List', end: false },
];

export function Navbar() {
  const [solid, setSolid] = useState(false);
  const { profile } = useActiveProfile();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn('fixed inset-x-0 top-0 z-30 transition-colors duration-500', solid ? 'bg-ink' : 'bg-gradient-to-b from-ink/80 to-transparent')}>
      <nav className="flex h-16 items-center gap-6 px-4 md:h-[68px] md:px-12" aria-label="Main">
        <Link to={paths.browse}><Logo className="text-2xl md:text-3xl" /></Link>
        <ul className="hidden gap-5 text-sm md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={({ isActive }) => cn('transition hover:text-text/70', isActive ? 'font-bold' : 'text-text/90')}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-5">
          <SearchBox />
          {profile?.kids && <span className="rounded bg-white px-2 text-xs font-black text-ink">KIDS</span>}
          <ProfileMenu />
        </div>
      </nav>
    </header>
  );
}
