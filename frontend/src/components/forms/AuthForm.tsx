// One form for Sign In and Sign Up (the "name" field appears only for sign-up).
import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthController } from '@/controllers/useAuthController';
import { ApiError } from '@/services/http';
import { paths } from '@/routes/paths';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ name: '', email: params.get('email') ?? '', password: '' });
  const { login, signup } = useAuthController();
  const action = mode === 'login' ? login : signup;
  const error = action.error instanceof ApiError ? action.error : null;
  const set = (key: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (mode === 'login') login.mutate({ email: form.email, password: form.password });
    else signup.mutate(form);
  };

  return (
    <form onSubmit={submit} className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-ink/80 p-10 backdrop-blur" noValidate>
      <h1 className="mb-2 text-3xl font-black">{mode === 'login' ? 'Sign In' : 'Create your account'}</h1>
      {mode === 'signup' && <Input label="Name" value={form.name} onChange={(e) => set('name')(e.target.value)} error={error?.fields?.name} autoComplete="name" />}
      <Input label="Email" type="email" value={form.email} onChange={(e) => set('email')(e.target.value)} error={error?.fields?.email} autoComplete="email" />
      <Input label="Password" type="password" value={form.password} onChange={(e) => set('password')(e.target.value)} error={error?.fields?.password} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
      {error && !error.fields && <p role="alert" className="text-brand-2">{error.message}</p>}
      <Button type="submit" size="lg" disabled={action.isPending}>{action.isPending ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Start watching'}</Button>
      <p className="text-muted">
        {mode === 'login' ? 'New to REAflix? ' : 'Already have an account? '}
        <Link className="font-bold text-text hover:underline" to={mode === 'login' ? paths.signup : paths.login}>
          {mode === 'login' ? 'Sign up now' : 'Sign in'}
        </Link>
      </p>
    </form>
  );
}
