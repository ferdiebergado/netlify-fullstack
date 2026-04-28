import { Card, CardContent } from '@/components/ui/card';
import SigninButton from './signin-button';

export default function SigninPage() {
  return (
    <Card className="mx-auto max-w-sm p-10">
      <CardContent className="flex flex-col items-center gap-10">
        <h1 className="text-center text-xl font-semibold text-balance">Sign in to your Account</h1>
        <SigninButton />
      </CardContent>
    </Card>
  );
}
