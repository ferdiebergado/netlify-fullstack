import * as React from 'react';
import { type ComponentProps } from 'react';

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';

type GenericComboboxProps<T> = {
  /** Array of items to display in the combobox */
  items: T[];

  /** Function to extract the display label from an item */
  itemToStringLabel: (item: T) => string;

  /** Function to extract the value from an item */
  itemToStringValue: (item: T) => string;

  /** Current selected value */
  value?: T | null;

  /** Callback when value changes */
  onValueChange?: (value: T | null) => void;

  /** Custom render function for each item */
  renderItem?: (item: T) => React.ReactNode;

  /** Additional props passed to ComboboxInput */
  comboboxInputProps?: Omit<ComponentProps<typeof ComboboxInput>, 'value' | 'onValueChange'>;
};

export default function GenericCombobox<T>({
  items = [],
  itemToStringLabel,
  itemToStringValue,
  value,
  onValueChange,
  renderItem,
  comboboxInputProps = {},
}: GenericComboboxProps<T>) {
  // Default render function if none provided
  const defaultRenderItem = (item: T) => {
    // Type guard to ensure item is not null or undefined
    // eslint-disable-next-line unicorn/no-null
    if (!item) return null;

    return (
      <Item size="xs" className="p-0">
        <ItemContent>
          <ItemTitle>{itemToStringLabel(item)}</ItemTitle>
          {/* Only show description if item is an object with a description property */}
          {typeof item === 'object' && item && 'description' in item && (
            <ItemDescription>
              {String((item as Record<string, unknown>).description)}
            </ItemDescription>
          )}
        </ItemContent>
      </Item>
    );
  };

  return (
    <Combobox
      items={items}
      itemToStringLabel={itemToStringLabel}
      itemToStringValue={itemToStringValue}
      value={value}
      onValueChange={onValueChange}
    >
      <ComboboxInput {...comboboxInputProps} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: T) => (
            <ComboboxItem key={itemToStringValue(item)} value={item}>
              {renderItem ? renderItem(item) : defaultRenderItem(item)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
