import { PropsWithChildren, createContext } from "react";
import { AppRootStore } from "./redux/redux-store";

type Props = {
  store: AppRootStore;
};

const StoreContext = createContext<AppRootStore | null>(null);

export const Provider = ({ store, children }: PropsWithChildren<Props>) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreContext;
