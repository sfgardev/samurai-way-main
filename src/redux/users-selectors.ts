import { AppRootState } from "./redux-store";

export const getUsers = (state: AppRootState) => state.usersPage.users;
export const getPageSize = (state: AppRootState) => state.usersPage.pageSize;
export const getTotalUsersCount = (state: AppRootState) =>
  state.usersPage.totalUsersCount;
export const getCurrentPage = (state: AppRootState) =>
  state.usersPage.currentPage;
export const getIsFetching = (state: AppRootState) =>
  state.usersPage.isFetching;
export const getFollowingInProgress = (state: AppRootState) =>
  state.usersPage.followingInProgress;
