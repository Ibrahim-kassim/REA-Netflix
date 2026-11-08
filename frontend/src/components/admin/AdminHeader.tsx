// Page heading for admin pages: title, one-line subtitle, and room for actions on the right.
import type { ReactNode } from 'react';

type Props = { title: string; subtitle: string; children?: ReactNode };

export function AdminHeader({ title, subtitle, children }: Props) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black md:text-3xl">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      {children}
    </header>
  );
}

export function AdminError({ message }: { message: string }) {
  return (
    <p role="alert" className="rounded-xl border border-bad/40 bg-bad/10 p-5 text-sm">
      This page couldn't load: {message}
    </p>
  );
}
