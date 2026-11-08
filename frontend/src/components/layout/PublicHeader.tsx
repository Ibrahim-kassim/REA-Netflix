// Header for signed-out pages: logo and Sign In (like the page REA scanned).
import { Link } from 'react-router';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { paths } from '@/routes/paths';

export function PublicHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to={paths.home}>
          <Logo />
        </Link>
        <ButtonLink to={paths.login} size="md">
          Sign In
        </ButtonLink>
      </div>
    </header>
  );
}
