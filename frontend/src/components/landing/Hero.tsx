// Landing hero: a tilted wall of real posters behind the headline and the email call to action.
import { BRAND } from '@/brand/brand';
import type { TitleCard } from '@/models/title';
import { EmailCta } from './EmailCta';

export function Hero({ posters }: { posters: TitleCard[] }) {
  const wall = Array.from({ length: 36 }, (_, i) => posters[i % Math.max(1, posters.length)]).filter(Boolean);
  return (
    <section className="relative flex min-h-[94vh] items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden className="absolute -inset-x-24 -top-24 grid -rotate-6 scale-110 grid-cols-6 gap-3 opacity-70 md:grid-cols-9">
        {wall.map((t, i) => (
          <img key={i} src={t.poster.w342} alt="" loading={i < 18 ? 'eager' : 'lazy'} decoding="async" className="aspect-[2/3] w-full rounded object-cover" />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,7,11,0.55),rgba(7,7,11,0.95))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div className="relative flex max-w-3xl flex-col items-center gap-6 pt-20">
        <h1 className="text-4xl font-black leading-tight md:text-7xl">Unlimited open films, shorts and more</h1>
        <p className="text-xl font-bold md:text-2xl">{BRAND.promise}</p>
        <p className="text-lg text-white/85">Ready to watch? Enter your email to create your free account.</p>
        <EmailCta />
      </div>
      <Arc />
    </section>
  );
}

function Arc() {
  return (
    <div aria-hidden className="absolute -bottom-px left-1/2 h-24 w-[180%] -translate-x-1/2 rounded-[100%_100%_0_0] border-t-4 border-brand bg-ink shadow-[0_-20px_60px_rgba(139,92,246,0.45)]" />
  );
}
