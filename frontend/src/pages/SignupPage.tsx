import { AuthForm } from '@/components/forms/AuthForm';
import { AuthBackdrop } from './AuthBackdrop';

export default function SignupPage() {
  return (
    <AuthBackdrop>
      <AuthForm mode="signup" />
    </AuthBackdrop>
  );
}
