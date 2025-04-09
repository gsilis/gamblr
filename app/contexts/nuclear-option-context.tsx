import { createContext, use, useCallback } from "react";
import { StorageContext } from "./storage-context";
import Keys from '~/constants/storage';

export type NuclearOptionContext = {
  eraseEverything: () => void,
};

const NuclearOptionContext = createContext<NuclearOptionContext>({
  eraseEverything: () => {}
});

const NuclearOptionProvider = ({ children }: { children: any }) => {
  const storageContext = use(StorageContext);

  const eraseEverything = useCallback(() => {
    Keys.forEach(key => {
      storageContext.remove(key);
    });

    setTimeout(() => {
      // @ts-ignore
      window.location = '/';
    });
  }, [Keys, storageContext.remove]);

  const api = {
    eraseEverything,
  };

  return <NuclearOptionContext value={ api }>{ children }</NuclearOptionContext>
};

export { NuclearOptionContext, NuclearOptionProvider };