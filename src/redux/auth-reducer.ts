import { AnyAction, Dispatch } from "redux";
import { LoginRequestArgs, UserModel, authAPI, securityAPI } from "../api/api";
import { ThunkDispatch } from "redux-thunk";
import { AppRootState, AppRootStore } from "./redux-store";
import { stopSubmit } from "redux-form";

export type AuthType = UserModel & {
  isAuth: boolean;
  isFetching: boolean;
  captchaUrl: string | null;
};

type AuthActionsType =
  | ReturnType<typeof setUserData>
  | ReturnType<typeof getCaptchaUrlSuccessAC>;

const initialState: AuthType = {
  id: null,
  email: "",
  login: "",
  isAuth: false,
  isFetching: false,
  captchaUrl: null,
};

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

export const authReducer = (
  state = initialState,
  action: AuthActionsType
): AuthType => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload, id: action.payload.userId };
    case GET_CAPTCHA_URL_SUCCESS:
      return { ...state, captchaUrl: action.payload.captchaUrl };
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

export const getCaptchaUrlSuccessAC = (captchaUrl: string | null) =>
  ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } } as const);

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
      if (response.data.resultCode === 10) {
        dispatch(getCaptchaUrlTC());
      }

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

export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captcha = response.data.url;
  dispatch(getCaptchaUrlSuccessAC(captcha));
};
