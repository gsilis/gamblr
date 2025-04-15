import type { City, CityKey } from "~/constants/city";

type PawnShopProps = {
  city: City,
  balance: number,
};

export default function PawnShop(props: PawnShopProps) {
  return 'Pawn shop';
}