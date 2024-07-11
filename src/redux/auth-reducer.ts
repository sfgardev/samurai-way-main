import { AnyAction, Dispatch } from "redux";
import { LoginRequestArgs, UserModel, authAPI } from "../api/api";
import { ThunkDispatch } from "redux-thunk";
import { AppRootState, AppRootStore } from "./redux-store";
import { stopSubmit } from "redux-form";

export type AuthType = UserModel & {
  isAuth: boolean;
  isFetching: boolean;
};

type AuthActionsType = ReturnType<typeof setUserData>;

const initialState: AuthType = {
  id: null,
  email: "",
  login: "",
  isAuth: false,
  isFetching: false,
};

const SET_USER_DATA = "SET_USER_DATA";

export const authReducer = (state = initialState, action: AuthActionsType) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, ...action.payload, id: action.payload.userId };
    default:
      return state;
  }
};

// actions
export const setUserData = (
  userId: number | null,
  email: string,
  login: string,
  isAuth: boolean
) =>
  ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } } as const);

// thunks
export const getUserDataTC = () => async (dispatch: Dispatch) => {
  const data = await authAPI.getAuthData();

  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    dispatch(setUserData(id, email, login, true));
  }

  // return authAPI.getAuthData().then((data) => {
  //   if (data.resultCode === 0) {
  //     const { id, email, login } = data.data;
  //     dispatch(setUserData(id, email, login, true));
  //   }
  // });
};

export const loginTC =
  (arg: LoginRequestArgs) =>
  async (dispatch: ThunkDispatch<AppRootStore, unknown, AnyAction>) => {
    const response = await authAPI.login(arg);

    if (response.data.resultCode === 0) {
      dispatch(getUserDataTC());
    } else {
      const message =
        response.data.messages.length > 0
          ? response.data.messages[0]
          : "Some error";

      console.log(message);
      dispatch(stopSubmit("login", { _error: message }));
    }

    // authAPI.login(arg).then((response) => {
    //   if (response.data.resultCode === 0) {
    //     dispatch(getUserDataTC());
    //   } else {
    //     const message =
    //       response.data.messages.length > 0
    //         ? response.data.messages[0]
    //         : "Some error";

    //     console.log(message);
    //     dispatch(stopSubmit("login", { _error: message }));
    //   }
    // });
  };

export const logoutTC =
  () => async (dispatch: ThunkDispatch<AppRootStore, unknown, AnyAction>) => {
    const response = await authAPI.logout();

    if (response.data.resultCode === 0) {
      dispatch(setUserData(null, "", "", false));
    }

    // authAPI.logout().then((response) => {
    //   if (response.data.resultCode === 0) {
    //     dispatch(setUserData(null, "", "", false));
    //   }
    // });
  };
