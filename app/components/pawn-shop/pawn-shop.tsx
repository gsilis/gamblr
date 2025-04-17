import "./pawn-shop.css";
import UnderConstruction from "~/../assets/under-construction.gif";
import type { City } from "~/constants/city";

type PawnShopProps = {
  city: City,
  balance: number,
};

export default function PawnShop(props: PawnShopProps) {
  return <div className="pawn-shop">
    <img src={ UnderConstruction } alt="Working on it!" />
  </div>;
}