import { createContext, use, useCallback, useMemo, useState } from "react";
import { assetFor, type ASSET_NAME } from "~/constants/pawn-asset";
import { AccountContext } from "./account-context";
import { FactoryContext } from "./factory-context";
import type { KeyedStorage } from "~/game-support/keyed-storage";
import { PAWN_ASSETS } from "~/constants/storage";

type AssetBalances = {
  [key in ASSET_NAME]?: number
}

interface PawnShopContextShape {
  assets: AssetBalances,
  buy(asset: ASSET_NAME, amount: number): void,
  sell(asset: ASSET_NAME, amount: number): void,
}

export const PawnShopContext = createContext<PawnShopContextShape>({
  assets: {},
  buy: (asset: ASSET_NAME, amount: number) => {},
  sell: (asset: ASSET_NAME, amount: number) => {},
});

interface PawnShopProviderProps {
  children: any,
}

export function PawnShopProvider({
  children,
}: PawnShopProviderProps) {
  const accountContext = use(AccountContext);
  const factoryContext = use(FactoryContext);

  const assetStore = useMemo<KeyedStorage<AssetBalances>>(() => {
    return factoryContext.storageFactory.createStringKeyedStorage(
      PAWN_ASSETS,
      (balances) => JSON.stringify(balances),
      (stringBalances) => {
        try {
          return JSON.parse(stringBalances);
        } catch (e) {
          return {};
        }
      }
    );
  }, [factoryContext.storageFactory]);

  const [assets, setAssets] = useState<AssetBalances>(assetStore.retrieve({}));

  const buy = useCallback((assetName: ASSET_NAME, amount: number) => {
    const asset = assetFor(assetName);

    if (!asset) {
      return;
    }

    const price = amount * asset.buyPrice;

    if (accountContext.balance < price) {
      return;
    }

    accountContext.withdraw(price);
    setAssets(assets => {
      assets[assetName] = assets[assetName] || 0;
      assets[assetName] += amount;

      return assets;
    });
  }, [accountContext.withdraw, assetStore.save, setAssets, accountContext.balance]);
  const sell = useCallback((assetName: ASSET_NAME, amount: number) => {
    const asset = assetFor(assetName);

    if (!asset) {
      return;
    }

    const price = amount * asset.sellPrice;
    const currentBalance = assets[assetName] || 0;

    if (currentBalance < amount) {
      return;
    }

    accountContext.deposit(price);
    setAssets(assets => {
      assets[assetName] = assets[assetName] || 0;
      assets[assetName] -= amount;

      return assets;
    });
  }, [accountContext.deposit, assetStore.save, assets, setAssets]);

  const api = {
    assets,
    buy,
    sell,
  };

  return <PawnShopContext value={ api }>{ children }</PawnShopContext>;
}

export default { PawnShopContext, PawnShopProvider };