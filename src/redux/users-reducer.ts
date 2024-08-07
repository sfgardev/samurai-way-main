import { Dispatch } from "redux";
import { ResponseType, usersAPI } from "../api/api";
import { updateObjecInArray } from "../utils/helpers/object-helpers";

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
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
};

export type UsersActionsType =
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof unFollowSuccess>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof toggleFollowing>;

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS";

const initialState: UsersPageType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

export const usersReducer = (
  state = initialState,
  action: UsersActionsType
): UsersPageType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjecInArray(state.users, action.userId, "id", {
          followed: true,
        }),
        // users: state.users.map((user) =>
        //   user.id === action.userId ? { ...user, followed: true } : user
        // ),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjecInArray(state.users, action.userId, "id", {
          followed: false,
        }),
        // users: state.users.map((user) =>
        //   user.id === action.userId ? { ...user, followed: false } : user
        // ),
      };
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.usersCount };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isInProgress
          ? [...state.followingInProgress, action.id]
          : state.followingInProgress.filter((id) => id !== action.id),
      };
    default:
      return state;
  }
};

const followUnfollow = async (
  dispatch: Dispatch,
  id: number,
  apiMethod: (id: number) => Promise<ResponseType>,
  actionCreator: (id: number) => UsersActionsType
) => {
  dispatch(toggleFollowing(id, true));

  const data = await apiMethod(id);

  if (data.resultCode === 0) {
    dispatch(actionCreator(id));
  }
  dispatch(toggleFollowing(id, false));
};

// actions
export const followSuccess = (userId: number) =>
  ({ type: FOLLOW, userId } as const);
export const unFollowSuccess = (userId: number) =>
  ({ type: UNFOLLOW, userId } as const);
export const setUsers = (users: UserType[]) =>
  ({ type: SET_USERS, users } as const);
export const setCurrentPage = (currentPage: number) =>
  ({ type: SET_CURRENT_PAGE, currentPage } as const);
export const setTotalUsersCount = (usersCount: number) =>
  ({ type: SET_TOTAL_USERS_COUNT, usersCount } as const);
export const toggleIsFetching = (isFetching: boolean) =>
  ({ type: TOGGLE_IS_FETCHING, isFetching } as const);
export const toggleFollowing = (id: number, isInProgress: boolean) =>
  ({ type: TOGGLE_FOLLOWING_IN_PROGRESS, id, isInProgress } as const);

// thunks
export const getUsersTC =
  (pageSize: number, currentPage: number) => async (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));

    const data = await usersAPI.getUsers(pageSize, currentPage);

    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));

    // usersAPI.getUsers(pageSize, currentPage).then((data) => {
    //   dispatch(setCurrentPage(currentPage));
    //   dispatch(toggleIsFetching(false));
    //   dispatch(setUsers(data.items));
    //   dispatch(setTotalUsersCount(data.totalCount));
    // });
  };

export const followTC = (id: number) => async (dispatch: Dispatch) => {
  const apiMethod = usersAPI.followUser.bind(usersAPI);
  const actionCreator = followSuccess;

  followUnfollow(dispatch, id, apiMethod, actionCreator);

  // dispatch(toggleFollowing(id, true));

  // const data = await apiMethod(id);

  // if (data.resultCode === 0) {
  //   dispatch(actionCreator(id));
  // }
  // dispatch(toggleFollowing(id, false));

  // usersAPI.followUser(id).then((data) => {
  //   if (data.resultCode === 0) {
  //     dispatch(followSuccess(id));
  //   }
  //   dispatch(toggleFollowing(id, false));
  // });
};

export const unFollowTC = (id: number) => async (dispatch: Dispatch) => {
  const apiMethod = usersAPI.unFollowUser.bind(usersAPI);
  const actionCreator = unFollowSuccess;

  followUnfollow(dispatch, id, apiMethod, actionCreator);

  // dispatch(toggleFollowing(id, true));

  // const data = await apiMethod(id);

  // if (data.resultCode === 0) {
  //   dispatch(actionCreator(id));
  // }
  // dispatch(toggleFollowing(id, false));

  // usersAPI.unFollowUser(id).then((data) => {
  //   if (data.resultCode === 0) {
  //     dispatch(unFollowSuccess(id));
  //   }
  //   dispatch(toggleFollowing(id, false));
  // });
};
