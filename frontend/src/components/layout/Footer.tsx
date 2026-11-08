import { BRAND } from '@/brand/brand';

const links = ['FAQ', 'Help Centre', 'Account', 'Privacy', 'Terms of Use', 'Contact Us'];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line px-6 py-12 text-sm text-muted">
      <div className="mx-auto max-w-6xl">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-6">
          {links.map((link) => (
            <li key={link} className="underline-offset-4 hover:underline">
              {link}
            </li>
          ))}
        </ul>
        <p className="mt-8">{BRAND.credit}</p>
        <p className="mt-2">© {new Date().getFullYear()} {BRAND.name}. A demo built with REA + Claude Code.</p>
      </div>
    </footer>
  );
}
