import { useCallback } from "react";
import "./bet-control.css";

interface BetControlProps {
  title: string,
  value: number,
  setValue: React.Dispatch<React.SetStateAction<number>>,
  disabled?: boolean,
}

export default function BetControl({
  title,
  value,
  setValue,
  disabled = false,
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
    <button className="raise" onClick={ () => addValue(1) }>1</button>
    <button className="raise" onClick={ () => addValue(10) }>10</button>
    <button className="raise" onClick={ () => addValue(100) }>100</button>
    <button className="raise" onClick={ () => addValue(1000) }>1K</button>
    <button className="raise" onClick={ () => addValue(10000) }>10K</button>
    <button className="raise" onClick={ () => addValue(100000) }>100K</button>
    <button className="raise" onClick={ () => addValue(1000000) }>1M</button>
    <button className="raise" onClick={ () => addValue(10000000) }>10M</button>
    <button className="raise" onClick={ () => addValue(100000000) }>100M</button>
    <button className="raise" onClick={ () => addValue(1000000000) }>1B</button>
    <button className="raise" onClick={ () => addValue(10000000000) }>10B</button>
    <button className="raise" onClick={ () => addValue(100000000000) }>100B</button>
  </div>;
}