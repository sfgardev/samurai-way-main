import { combineReducers, createStore } from "redux";
import { profileReducer } from "./profile-reducer";
import { dialogsReducer } from "./dialogs-reducer";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
});

const store = createStore(rootReducer);

export type AppRootState = ReturnType<typeof rootReducer>;

export default store;
