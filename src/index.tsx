import state, { subscribe } from "./redux/state";

import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import {
  RootStateType,
  addMessage,
  addPost,
  updateNewMessage,
  updateNewPostText,
} from "./redux/state";

const rerenderEntireTree = (state: RootStateType) => {
  ReactDOM.render(
    <App
      state={state}
      addPost={addPost}
      updateNewPostText={updateNewPostText}
      addMessage={addMessage}
      updateNewMessage={updateNewMessage}
    />,
    document.getElementById("root")
  );
};

rerenderEntireTree(state);
subscribe(rerenderEntireTree);
