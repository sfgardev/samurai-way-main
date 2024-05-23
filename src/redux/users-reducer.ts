type PhotoType = {
  small: string;
  large: string;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: PhotoType;
  followed: boolean;
  uniqueUrlName: string;
};

export type UsersPageType = {
  users: UserType[];
};

export type UsersActionsType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unFollowAC>
  | ReturnType<typeof setUsersAC>;

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";

const initialState: UsersPageType = {
  users: [],
};

export const usersReducer = (
  state = initialState,
  action: UsersActionsType
): UsersPageType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.userId ? { ...user, followed: true } : user
        ),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.userId ? { ...user, followed: false } : user
        ),
      };
    case "SET_USERS":
      return { ...state, users: [...state.users, ...action.users] };
    default:
      return state;
  }
};

export const followAC = (userId: number) => ({ type: FOLLOW, userId } as const);
export const unFollowAC = (userId: number) =>
  ({ type: UNFOLLOW, userId } as const);
export const setUsersAC = (users: UserType[]) =>
  ({ type: SET_USERS, users } as const);
