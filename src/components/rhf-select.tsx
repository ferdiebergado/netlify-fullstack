import type { ControllerFieldState, ControllerRenderProps, FieldValues } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Item = {
  label: string;
  value: string;
};

type RHFSelectProps<T extends FieldValues> = {
  field: ControllerRenderProps<T>;
  fieldState: ControllerFieldState;
  isLoading: boolean;
  items: Item[];
  placeholder?: string;
};

export default function RHFSelect<T extends FieldValues>({
  field,
  fieldState,
  isLoading,
  items,
  placeholder = 'Select an item',
}: RHFSelectProps<T>) {
  return (
    <Select
      items={items}
      name={field.name}
      value={field.value === 0 ? '' : field.value?.toString()}
      onValueChange={field.onChange}
    >
      <SelectTrigger id={field.name} aria-invalid={fieldState.invalid} className="w-full">
        <SelectValue placeholder={isLoading ? 'Loading...' : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map(item => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
