import { Dispatch } from "redux";
import { UserModel, authApi } from "../api/api";

export type AuthType = UserModel & {
  isAuth: boolean;
  isFetching: boolean;
};

type AuthActionsType = ReturnType<typeof setUserData>;

const initialState: AuthType = {
  id: -1,
  email: "",
  login: "",
  isAuth: false,
  isFetching: false,
};

const SET_USER_DATA = "SET_USER_DATA";

export const authReducer = (state = initialState, action: AuthActionsType) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, ...action.data, isAuth: true };
    default:
      return state;
  }
};

// actions
export const setUserData = (userId: number, email: string, login: string) =>
  ({ type: SET_USER_DATA, data: { userId, email, login } } as const);

// thunks
export const getUserDataTC = () => (dispatch: Dispatch) => {
  authApi.getAuthData().then((data) => {
    console.log(data);
    if (data.resultCode === 0) {
      const { id, email, login } = data.data;
      dispatch(setUserData(id, email, login));
    }
  });

  // usersAPI.getAuthData().then((data) => {
  //   if (data.resultCode === 0) {
  //     const { id, email, login } = data.data;
  //     this.props.setUserData(id, email, login);
  //   }
  // });
};
