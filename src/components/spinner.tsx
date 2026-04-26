import { RiLoader2Line } from '@remixicon/react';

type SpinnerProps = {
  text?: string;
};

export default function Spinner({ text = 'Loading....' }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <RiLoader2Line className="animate-spin" data-icon="inline-start" />
      {text}
    </div>
  );
}
