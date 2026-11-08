import { ButtonLink } from '@/components/ui/Button';
import { paths } from '@/routes/paths';

export default function NotFoundPage() {
  return (
    <section className="grid min-h-screen place-items-center gap-6 text-center">
      <div>
        <h1 className="text-6xl font-black text-brand-gradient">Lost your way?</h1>
        <p className="mt-4 text-xl text-muted">This page doesn't exist.</p>
        <ButtonLink to={paths.home} className="mt-8" size="lg">REAflix Home</ButtonLink>
      </div>
    </section>
  );
}
