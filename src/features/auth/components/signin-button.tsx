import { RiGoogleFill } from '@remixicon/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { genGoogleAuthUrl } from '..';

export default function SigninButton() {
  const [isPending, setIsPending] = useState(false);

  const handleClick = () => {
    setIsPending(true);
    globalThis.location.href = genGoogleAuthUrl();
  };

  return (
    <Button size="lg" className="w-full" onClick={handleClick} disabled={isPending}>
      {isPending ? (
        'Redirecting to Google...'
      ) : (
        <>
          <RiGoogleFill data-icon="inline-start" /> Continue with Google
        </>
      )}
    </Button>
  );
}
