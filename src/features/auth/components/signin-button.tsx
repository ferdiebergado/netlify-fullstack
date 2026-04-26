import { Button } from '@/components/ui/button';
import { genGoogleAuthUrl } from '..';

export default function SigninButton() {
  return (
    <Button size="lg" onClick={() => (globalThis.location.href = genGoogleAuthUrl())}>
      Continue with Google
    </Button>
  );
}
