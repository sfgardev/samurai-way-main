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

export const rerenderEntireTree = (state: RootStateType) => {
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
