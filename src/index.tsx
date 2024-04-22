import store, { RootStateType } from "./redux/state";

import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const rerenderEntireTree = (state: RootStateType) => {
  ReactDOM.render(
    <App
      state={store.getState()}
      dispatch={store.dispatch.bind(store)}
      // updateNewPostText={store.updateNewPostText.bind(store)}
      // addMessage={store.addMessage.bind(store)}
      // updateNewMessage={store.updateNewMessage.bind(store)}
    />,
    document.getElementById("root")
  );
};

rerenderEntireTree(store.getState());
store.subscribe(rerenderEntireTree);
