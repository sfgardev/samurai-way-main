import React from "react";
import { connect } from "react-redux";
import { usersAPI } from "../../api/api";
import { AppRootState } from "../../redux/redux-store";
import {
  UserType,
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  unFollow,
} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import Users from "./Users";

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

    usersAPI
      .getUsers(this.props.pageSize, this.props.currentPage)
      .then((data) => {
        this.props.toggleIsFetching(false);
        this.props.setUsers(data.items);
        this.props.setTotalUsersCount(data.totalCount);
      });
  }

  handleChangePage = (page: number) => {
    this.props.setCurrentPage(page);
    this.props.toggleIsFetching(true);

    usersAPI.getUsers(this.props.pageSize, page).then((data) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
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
