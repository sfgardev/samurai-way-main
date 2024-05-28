import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppRootState } from "../../redux/redux-store";
import {
  UserType,
  UsersActionsType,
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  unFollowAC,
} from "../../redux/users-reducer";
import Users from "./Users";

type MapStateProps = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
};

type MapDispatchProps = {
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  setUsers: (users: UserType[]) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (usersCount: number) => void;
};

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<UsersActionsType>
): MapDispatchProps => {
  return {
    follow: (userId: number) => dispatch(followAC(userId)),
    unFollow: (userId: number) => dispatch(unFollowAC(userId)),
    setUsers: (users: UserType[]) => dispatch(setUsersAC(users)),
    setCurrentPage: (currentPage: number) =>
      dispatch(setCurrentPageAC(currentPage)),
    setTotalUsersCount: (usersCount: number) =>
      dispatch(setTotalUsersCountAC(usersCount)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
