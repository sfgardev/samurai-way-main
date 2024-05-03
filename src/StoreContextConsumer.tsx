import StoreContext from "./StoreContext";
import { AppRootStore } from "./redux/redux-store";

export const StoreContextConsumer = ({
  children,
}: {
  children: (store: AppRootStore) => React.ReactNode;
}) => {
  return (
    <StoreContext.Consumer>
      {(store) => {
        if (!store) throw new Error("Store is not defined");

        return children(store);
      }}
    </StoreContext.Consumer>
  );
};
