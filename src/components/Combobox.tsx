import { useContext } from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  ComboBox as AriaComboBox,
  ComboBoxProps as AriaComboBoxProps,
  Input as AriaInput,
  InputProps as AriaInputProps,
  ListBox as AriaListBox,
  ListBoxProps as AriaListBoxProps,
  PopoverProps as AriaPopoverProps,
  ValidationResult as AriaValidationResult,
  ComboBoxStateContext,
  composeRenderProps,
  Text,
} from "react-aria-components";

import {
  Button,
  FieldError,
  FieldGroup,
  Label,
  ListBoxCollection,
  ListBoxHeader,
  ListBoxItem,
  ListBoxSection,
  Popover,
} from "@/components";

import { cn } from "@/global";


const Combobox = AriaComboBox;

const ComboboxItem = ListBoxItem;

const ComboboxHeader = ListBoxHeader;

const ComboboxSection = ListBoxSection;

const ComboboxCollection = ListBoxCollection;

const ComboboxInput = ({ className, ...props }: AriaInputProps) => (
  <AriaInput
    className={composeRenderProps(className, (className) =>
      cn(
        "flex h-10 w-full bg-background px-3 py-2 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground",
        /* Disabled */
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className
      )
    )}
    {...props}
  />
);

const ComboboxPopover = ({ className, ...props }: AriaPopoverProps) => (
  <Popover
    className={composeRenderProps(className, (className) =>
      cn("w-[calc(var(--trigger-width)+4px)] bg-background", className)
    )}
    {...props}
  />
);

function ComboboxClearButton() {
  const state = useContext(ComboBoxStateContext)!;
  return (
    <Button
      slot={null}
      variant="ghost"
      size="icon"
      className="mr-1 size-6 data-[focus-visible]:ring-offset-0"
      onPress={() => {
        state.setSelectedKey(null);
        state?.setInputValue("");
      }}
    >
      ✕
    </Button>
  );
}

const ComboboxListBox = <T extends object>({
  className,
  ...props
}: AriaListBoxProps<T>) => (
  <AriaListBox
    className={composeRenderProps(className, (className) =>
      cn(
        "max-h-[inherit] overflow-auto p-1 outline-none [clip-path:inset(0_0_0_0_round_calc(var(--radius)-2px))]",
        className
      )
    )}
    {...props}
  />
);

interface JollyComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, "children"> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

function JollyComboBox<T extends object>({
  label,
  description,
  errorMessage,
  className,
  children,
  ...props
}: JollyComboBoxProps<T>) {
  return (
    <Combobox
      className={composeRenderProps(className, (className) =>
        cn("group flex flex-col gap-2", className)
      )}
      {...props}
    >
      <Label>{label}</Label>
      <FieldGroup className="p-0">
        <ComboboxInput />
        <Button variant="ghost" size="icon" className="mr-1 size-6 p-1">
          <ChevronsUpDown aria-hidden="true" className="size-4 opacity-50" />
        </Button>
      </FieldGroup>
      {description && (
        <Text className="text-sm text-muted-foreground" slot="description">
          {description}
        </Text>
      )}
      <FieldError>{errorMessage}</FieldError>
      <ComboboxPopover>
        <ComboboxListBox>{children}</ComboboxListBox>
      </ComboboxPopover>
    </Combobox>
  );
}

export {
  ComboboxSection,
  Combobox,
  ComboboxListBox,
  ComboboxInput,
  ComboboxCollection,
  ComboboxItem,
  ComboboxHeader,
  ComboboxPopover,
  JollyComboBox,
  ComboboxClearButton,
};
export type { JollyComboBoxProps };
