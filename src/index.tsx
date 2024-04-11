import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import state, { addPost } from "./redux/state";

ReactDOM.render(
  <App state={state} addPost={addPost} />,
  document.getElementById("root")
);
