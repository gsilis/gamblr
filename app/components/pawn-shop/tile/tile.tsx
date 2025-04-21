import Currency from "~/components/currency/currency";
import "./tile.css";

interface TileProps {
  title: string,
  description: string,
  price: number,
  confirmText: string,
  onConfirm: () => void,
  quantity?: number,
}

export default function Tile({
  title,
  description,
  price,
  confirmText,
  onConfirm,
  quantity,
}: TileProps) {
  return <div className="tile">
    <h1 className="title">
      <span>{ title }</span>
      <button onClick={ onConfirm }>{ confirmText }</button>
    </h1>
    <p className="description">{ description }</p>
    <dl className="specs">
      <div className="spec">
        <dt>Value</dt>
        <dd>{ price }</dd>
      </div>
      { quantity && (<div className="spec">
        <dt>Quantity</dt>
        <dd>{ quantity }</dd>
      </div>) }
    </dl>
  </div>;
}