import { createContext, useCallback, useMemo } from "react";
import Storage from "../adapters/storage";

export type StorageContextType = {
  save: (key: string, value: any) => void,
  load: (key: string, fallback: any) => any,
  remove: (key: string) => void, 
};

const StorageContext = createContext<StorageContextType>({
  save: (_key: string, _value: any) => {},
  load: (_key: string, _fallback: any) => null,
  remove: (_key: string) => {}
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
  const removeCallback = useCallback((key: string): void => {
    return storage.remove(key);
  }, [storage]);

  const api = { save: saveCallback, load: loadCallback, remove: removeCallback };

  return <StorageContext value={ api }>{ children }</StorageContext>;
};

export { StorageContext, StorageProvider };