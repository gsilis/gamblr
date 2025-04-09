import { use, useCallback, useMemo, useState } from "react";
import type { CityKey } from "~/constants/city";
import { ScreenPrompt } from "../screen-prompt/screen-prompt";
import "./nuclear-option.css";
import { NuclearOptionContext } from "~/contexts/nuclear-option-context";

export type NuclearOptionProps = {
  city: CityKey,
  balance: number,
};

export default function NuclearOption(props: NuclearOptionProps) {
  const nuclearOptionContext = use(NuclearOptionContext);

  const [phrase, setPhrase] = useState('');
  const [touched, setTouched] = useState(false);
  const rando = useMemo(() => {
    return (`${Math.round(Math.random() * 200000000)}`).substring(0, 6);
  }, []);
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setPhrase(value);

    if (value === rando) {
      setTouched(true);
    }
  }, [setPhrase, setTouched, rando]);
  const onConfirm = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (`${phrase}` === `${rando}`) {
      nuclearOptionContext.eraseEverything();
    }
  }, [phrase, rando, nuclearOptionContext.eraseEverything]);
  const onTouch = useCallback(() => {
    setTouched(true);
  }, [setTouched]);
  const verifications = useMemo<string[]>(() => {
    const classes: string[] = ['validation'];
    const hasValue = Boolean(phrase);
    const matching = `${phrase}` === `${rando}`;

    if (touched) {
      classes.push(hasValue && matching ? 'valid' : 'invalid');
    } else {
      classes.push('clean');
    }

    return classes;
  }, [touched, phrase, rando]);
  const valid = verifications.includes('valid') && `✅`;
  const invalid = verifications.includes('invalid') && `❌`;
  const neutral = !valid && !invalid && `ℹ️`;
  const verificationMessage = neutral || valid || invalid;

  return <ScreenPrompt
    className="nuclear-option"
    title="Clean Slate"
    confirmText="Start Fresh"
    onConfirm={ onConfirm }
    padded={ true }
  >
    <div className="description">
      <p>Ok, you've basically run out of places to bolt. Luckily, this is just a game and you can erase all of your history and start over!</p>
      <p>Ready to wipe the slate clean?</p>
      <p>Type <span className="phrase">{ rando }</span> into the input below to erase everything.</p>
      <div className="field">
        <label>Phrase</label>
        <input type="text" value={ phrase } onChange={ onChange } onBlur={ onTouch } />
        <span className={ verifications.join(' ') }>{ verificationMessage }</span>
      </div>
    </div>
  </ScreenPrompt>
}