import { usersReducer } from "./users-reducer";
import { combineReducers, createStore } from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
});

const store = createStore(rootReducer);
// console.log(store.getState())

export type AppRootStore = typeof store;
export type AppRootState = ReturnType<typeof rootReducer>;

export default store;
