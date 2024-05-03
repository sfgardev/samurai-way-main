import { RootStateType } from "./redux/store";

import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import store from "./redux/redux-store";
import { Provider } from "./StoreContext";

const rerenderEntireTree = (state: RootStateType) => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

rerenderEntireTree(store.getState());
store.subscribe(() => {
  rerenderEntireTree(store.getState());
});
