import type { ButtonHTMLAttributes } from 'react';
import { Button } from './ui/button';

export default function NavMenuButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button variant="ghost" className="w-full justify-start" {...props}>
      {props.children}
    </Button>
  );
}
