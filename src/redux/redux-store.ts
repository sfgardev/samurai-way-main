import { usersReducer } from "./users-reducer";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { authReducer } from "./auth-reducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { appReducer } from "./app-reducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});
// @ts-ignore

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStore = typeof store;
export type AppRootState = ReturnType<typeof rootReducer>;

export default store;
