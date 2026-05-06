import type { FieldValues, useForm } from 'react-hook-form';
import { Button } from './ui/button';

type FormButtonsProps<T extends FieldValues> = {
  form: ReturnType<typeof useForm<T>>;
  isPending: boolean;
  onSubmit: (values: T) => void;
};

export default function FormButtons<T extends FieldValues>({
  form,
  isPending,
  onSubmit,
}: FormButtonsProps<T>) {
  return (
    <>
      <Button type="button" variant="outline" onClick={() => form.reset()}>
        Reset
      </Button>
      <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
        {isPending ? 'Saving...' : 'Submit'}
      </Button>
    </>
  );
}
