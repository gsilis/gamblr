import { createContext, useCallback, useMemo } from "react";
import Storage from "./adapters/storage";

export type StorageContextType = {
  save: (key: string, value: any) => void,
  load: (key: string, fallback: any) => any,
};

const StorageContext = createContext<StorageContextType>({
  save: (_key: string, _value: any) => {},
  load: (_key: string, _fallback: any) => null,
});

const StorageProvider = ({ children }: { children: any }) => {
  const storage = useMemo<Storage>(() => {
    return new Storage();
  }, []);
  const saveCallback = useCallback((key: string, data: any) => {
    return storage.save(key, data);
  }, [storage]);
  const loadCallback = useCallback((key: string, fallback: any): any => {
    return storage.retrieve(key, fallback);
  }, [storage]);

  const api = { save: saveCallback, load: loadCallback };

  return <StorageContext value={ api }>{ children }</StorageContext>;
};

export { StorageContext, StorageProvider };