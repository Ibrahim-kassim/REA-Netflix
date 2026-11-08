// "Enter your email" call to action; used in the hero and again above the footer.
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/Button';
import { paths } from '@/routes/paths';

export function EmailCta() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate(`${paths.signup}?email=${encodeURIComponent(email)}`);
  };

  return (
    <form onSubmit={submit} className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="cta-email">Email address</label>
      <input
        id="cta-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        autoComplete="email"
        className="h-14 flex-1 rounded-md border border-white/30 bg-ink/60 px-5 text-lg backdrop-blur focus:border-brand focus:outline-none"
      />
      <Button type="submit" size="lg">Get Started ›</Button>
    </form>
  );
}
