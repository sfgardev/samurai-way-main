import { RootStateType } from "./redux/store";

import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import store from "./redux/redux-store";

const rerenderEntireTree = (state: RootStateType) => {
  ReactDOM.render(
    <App
      state={state}
      dispatch={store.dispatch.bind(store)}
      // updateNewPostText={store.updateNewPostText.bind(store)}
      // addMessage={store.addMessage.bind(store)}
      // updateNewMessage={store.updateNewMessage.bind(store)}
    />,
    document.getElementById("root")
  );
};

rerenderEntireTree(store.getState());
store.subscribe(() => {
  rerenderEntireTree(store.getState());
});
