// import { RootStateType } from "./redux/store";

import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import store from "./redux/redux-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// const rerenderEntireTree = (state: RootStateType) => {
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
// };

// rerenderEntireTree(store.getState());
// store.subscribe(() => {
//   rerenderEntireTree(store.getState());
// });
