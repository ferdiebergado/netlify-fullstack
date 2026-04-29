import { RiAlertFill, RiRefreshFill, RiRefreshLine } from '@remixicon/react';
import type { FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export default function Fallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <Empty className="flex h-dvh items-center justify-center border">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="text-destructive">
          <RiAlertFill />
        </EmptyMedia>
        <EmptyTitle className="text-destructive text-xl font-semibold">
          An unexpected error has occurred.
        </EmptyTitle>
        <EmptyDescription className="max-w-xs text-balance">
          Please try again or reload the page. Contact support if the problem persists.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button onClick={() => resetErrorBoundary()}>
          <RiRefreshLine data-icon="inline-start" />
          Try again
        </Button>
        <Button variant="outline" onClick={() => globalThis.location.reload()}>
          <RiRefreshFill data-icon="inline-start" />
          Reload page
        </Button>
      </EmptyContent>
    </Empty>
  );
}
