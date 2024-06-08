import { UserModel } from "../api/api";

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

export const setUserData = (userId: number, email: string, login: string) =>
  ({ type: SET_USER_DATA, data: { userId, email, login } } as const);
