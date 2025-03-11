import { useCallback, useState, type MouseEventHandler } from "react";
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

  return <section className="picker">
    <header className="title">
      { prompt }
    </header>
    <main className="options">
      {
        options.map(option => {
          const active = selectedOption === option ? 'active option' : 'option';

          return <div onClick={ () => setSelectedOption(option) } key={ option.value } className={ active }>
            { option.title }
          </div>;
        })
      }
    </main>
    <footer className="footer">
      <button onClick={ onConfirm } className={ confirmClasses }>{ confirm }</button>
    </footer>
  </section>;
}