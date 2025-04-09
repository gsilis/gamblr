import { useCallback, useMemo, useState } from "react";
import { ScreenPrompt } from "../screen-prompt/screen-prompt";
import './picker.css';

export type PickerOption = {
  title: string,
  available: boolean,
  value: string,
};

export type PickerProps = {
  prompt: string,
  options: PickerOption[],
  selected?: PickerOption,
  confirm: string,
  onSelect: (option: PickerOption) => void,
};

export default function Picker({
  prompt,
  options,
  selected,
  confirm,
  onSelect
}: PickerProps) {
  const [selectedOption, setSelectedOption] = useState(selected);
  const onConfirm = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!selectedOption) {
      e.preventDefault();
      return;
    }

    onSelect(selectedOption);
  }, [selectedOption, setSelectedOption, onSelect]);
  const confirmClasses = !!selectedOption ? '' : 'invalid';
  const promptClasses = useMemo(() => {
    const classes = ['picker'];

    if (!!selectedOption) {
      classes.push('invalid');
    }

    return classes;
  }, [selectedOption]);

  return <ScreenPrompt
    className={ promptClasses.join(' '  ) }
    title={ prompt }
    onConfirm={ onConfirm }
    confirmText={ confirm }
  >
    {
      options.map(option => {
        const active = selectedOption === option ? 'active option' : 'option';

        return <div onClick={ () => setSelectedOption(option) } key={ option.value } className={ active }>
          { option.title }
        </div>;
      })
    }
  </ScreenPrompt>;
}