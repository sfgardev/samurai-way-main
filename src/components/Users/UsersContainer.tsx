import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppRootState } from "../../redux/redux-store";
import {
  UserType,
  UsersActionsType,
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  unFollow,
} from "../../redux/users-reducer";
import axios from "axios";
import React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
// import UsersAPIComponent from "./UsersAPIComponent";

type UsersContainerProps = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  setUsers: (users: UserType[]) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (usersCount: number) => void;
  toggleIsFetching: (isFetching: boolean) => void;
};

type GetUsersResponse = {
  items: UserType[];
  totalCount: number;
  error: string;
};

type MapStateProps = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
};

// type MapDispatchProps = {
//   follow: (userId: number) => void;
//   unFollow: (userId: number) => void;
//   setUsers: (users: UserType[]) => void;
//   setCurrentPage: (currentPage: number) => void;
//   setTotalUsersCount: (usersCount: number) => void;
//   toggleIsFetching: (isFetching: boolean) => void;
// };

class UsersContainer extends React.Component<UsersContainerProps> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    axios
      .get<GetUsersResponse>(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  handleChangePage = (page: number) => {
    this.props.setCurrentPage(page);
    this.props.toggleIsFetching(true);
    axios
      .get<GetUsersResponse>(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${page}`
      )
      .then((response) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          users={this.props.users}
          totalUsersCount={this.props.totalUsersCount}
          currentPage={this.props.currentPage}
          pageSize={this.props.pageSize}
          follow={this.props.follow}
          unFollow={this.props.unFollow}
          onChangePage={this.handleChangePage}
        />
      </>
    );
  }
}

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
  };
};

// const mapDispatchToProps = (
//   dispatch: Dispatch<UsersActionsType>
// ): MapDispatchProps => {
//   return {
//     follow: (userId: number) => dispatch(followAC(userId)),
//     unFollow: (userId: number) => dispatch(unFollowAC(userId)),
//     setUsers: (users: UserType[]) => dispatch(setUsersAC(users)),
//     setCurrentPage: (currentPage: number) =>
//       dispatch(setCurrentPageAC(currentPage)),
//     setTotalUsersCount: (usersCount: number) =>
//       dispatch(setTotalUsersCountAC(usersCount)),
//     toggleIsFetching: (isFetching: boolean) =>
//       dispatch(toggleIsFetchingAC(isFetching)),
//   };
// };

export default connect(mapStateToProps, {
  follow,
  unFollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
})(UsersContainer);
