// import { RootStateType } from "./redux/store";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import store from "./redux/redux-store";

// const rerenderEntireTree = (state: RootStateType) => {
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById("root")
);
// };

// rerenderEntireTree(store.getState());
// store.subscribe(() => {
//   rerenderEntireTree(store.getState());
// });
