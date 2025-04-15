import { createContext, useCallback, useMemo } from "react";
import Storage from "../adapters/storage";
import type { RawStorage } from "~/interfaces/raw-storage";
import NullStorage from "~/adapters/null-storage";

export type StorageContextType = {
  storage: RawStorage,
};

const StorageContext = createContext<StorageContextType>({
  storage: new NullStorage(),
});

const StorageProvider = ({ children }: { children: any }) => {
  const storage = useMemo<Storage>(() => {
    return new Storage();
  }, []);
  
  const api = { storage };

  return <StorageContext value={ api }>{ children }</StorageContext>;
};

export { StorageContext, StorageProvider };