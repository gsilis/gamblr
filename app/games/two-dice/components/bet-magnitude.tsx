import { useCallback, useState } from "react";
import "./bet-magnitude.css";
import {
  HUNDREDS,
  THOUSANDS,
  MILLIONS,
  BILLIONS,
  TRILLIONS,
  QUADRILLIONS
} from "~/constants/magnitude";

interface BetMagnitudeProps {
  magnitude: number,
  updateMagnitude(value: number): void,
}

export default function BetMagnitude({
  magnitude,
  updateMagnitude
}: BetMagnitudeProps) {
  return <div className="bet-magnitude">
    <label>Magnitude</label>
    <div className="bet-magnitude-options">
      <button
        className={ magnitude === HUNDREDS ? 'selected' : '' }
        onClick={ () => updateMagnitude(HUNDREDS) }
      >H</button>
      <button
        className={ magnitude === THOUSANDS ? 'selected' : '' }
        onClick={ () => updateMagnitude(THOUSANDS) }
      >T</button>
      <button
        className={ magnitude === MILLIONS ? 'selected' : '' }
        onClick={ () => updateMagnitude(MILLIONS) }
      >M</button>
      <button
        className={ magnitude === BILLIONS ? 'selected' : '' }
        onClick={ () => updateMagnitude(BILLIONS) }
      >B</button>
      <button
        className={ magnitude === TRILLIONS ? 'selected' : '' }
        onClick={ () => updateMagnitude(TRILLIONS) }
      >T</button>
      <button
        className={ magnitude === QUADRILLIONS ? 'selected' : '' }
        onClick={ () => updateMagnitude(QUADRILLIONS) }
      >Q</button>
    </div>
  </div>;
}