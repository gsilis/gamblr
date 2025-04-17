import { useCallback } from "react";
import "./bet-control.css";

interface BetControlProps {
  title: string,
  value: number,
  setValue: React.Dispatch<React.SetStateAction<number>>,
  disabled?: boolean,
  magnitude: number,
  suffix: string,
}

export default function BetControl({
  title,
  value,
  setValue,
  disabled = false,
  magnitude,
  suffix,
}: BetControlProps) {
  const classes = ['control'];
  const addValue = useCallback((delta: number) => {
    if (disabled) {
      return;
    }

    setValue((value) => Math.max(0, value + delta));
  }, [setValue, disabled]);

  if (value > 0) {
    classes.push('has-value');
  }

  return <div className={ classes.join(' ') }>
    <label>{ title }</label>
    <button className="even" onClick={ () => addValue(-value) }>0</button>
    <input type="text" value={ value } readOnly />
    <button className="raise" onClick={ () => addValue(1 * magnitude) }>1{ suffix }</button>
    <button className="raise" onClick={ () => addValue(10 * magnitude) }>10{ suffix }</button>
    <button className="raise" onClick={ () => addValue(100 * magnitude) }>100{ suffix }</button>
  </div>;
}