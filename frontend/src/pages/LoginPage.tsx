import { AuthForm } from '@/components/forms/AuthForm';
import { AuthBackdrop } from './AuthBackdrop';

export default function LoginPage() {
  return (
    <AuthBackdrop>
      <AuthForm mode="login" />
    </AuthBackdrop>
  );
}
