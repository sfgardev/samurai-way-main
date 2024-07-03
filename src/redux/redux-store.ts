import { usersReducer } from "./users-reducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { authReducer } from "./auth-reducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { appReducer } from "./app-reducer";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
// console.log(store.getState())

export type AppRootStore = typeof store;
export type AppRootState = ReturnType<typeof rootReducer>;

export default store;
