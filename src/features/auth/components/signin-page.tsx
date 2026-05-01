import { Card, CardContent } from '@/components/ui/card';
import config from '@/config';
import SigninButton from './signin-button';

export default function SigninPage() {
  return (
    <Card className="px-6 py-10">
      <CardContent className="flex flex-col items-center gap-10">
        <h1 className="text-center text-3xl font-semibold text-balance">
          Welcome to {config.appTitle}
        </h1>
        <SigninButton />
      </CardContent>
    </Card>
  );
}
