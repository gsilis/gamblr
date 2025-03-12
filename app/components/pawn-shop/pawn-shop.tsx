import type { CityKey } from "~/constants/city";

type PawnShopProps = {
  city: CityKey,
  balance: number,
};

export default function PawnShop(props: PawnShopProps) {
  return 'Pawn shop';
}