import SigninButton from './signin-button';

export default function SigninPage() {
  return (
    <section className="flex flex-col items-center gap-5">
      <h1 className="font-heading text-2xl font-bold">Signin</h1>
      <SigninButton />
    </section>
  );
}
