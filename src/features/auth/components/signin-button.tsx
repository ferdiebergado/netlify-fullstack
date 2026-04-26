import { Button } from '@/components/ui/button';
import { RiGoogleLine } from '@remixicon/react';
import { genGoogleAuthUrl } from '..';

export default function SigninButton() {
  return (
    <Button size="lg" onClick={() => (globalThis.location.href = genGoogleAuthUrl())}>
      <RiGoogleLine data-icon="inline-start" /> Continue with Google
    </Button>
  );
}
