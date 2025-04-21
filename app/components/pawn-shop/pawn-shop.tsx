import { use } from "react";
import "./pawn-shop.css";
import type { City } from "~/constants/city";
import { PawnShopContext } from "~/contexts/pawn-shop-context";
import { assetFor, type ASSET_NAME, PawnAssets, type PawnAsset } from "~/constants/pawn-asset";
import Tile from "./tile/tile";

type PawnShopProps = {
  city: City,
  balance: number,
};

export default function PawnShop(props: PawnShopProps) {
  const assetsContext = use(PawnShopContext);

  return <div className="pawn-shop">
    <div className="asset-list">
      <h1>Pawn Shop</h1>
      <div className="assets">
        { PawnAssets.sort((a, b) => {
          return a.buyPrice - b.buyPrice;
        }).map((asset: PawnAsset, index: number) => {
          return (
            <Tile
              key={ index }
              title={ asset.title }
              description={ asset.description }
              price={ asset.buyPrice }
              confirmText={ 'Buy' }
              onConfirm={ () => {} }
            />
          );
        }) }
      </div>
    </div>
  </div>;
}