import { usersReducer } from "./users-reducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";
import { authReducer } from "./auth-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
// console.log(store.getState())

export type AppRootStore = typeof store;
export type AppRootState = ReturnType<typeof rootReducer>;

export default store;
