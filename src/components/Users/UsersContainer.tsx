import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { AppRootState } from "../../redux/redux-store";
import {
  UserType,
  followTC,
  getUsersTC,
  unFollowTC,
} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
import Users from "./Users";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

type UsersContainerProps = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
  // followSuccess: (userId: number) => void;
  // unFollowSuccess: (userId: number) => void;
  // setUsers: (users: UserType[]) => void;
  // setCurrentPage: (currentPage: number) => void;
  // setTotalUsersCount: (usersCount: number) => void;
  // toggleIsFetching: (isFetching: boolean) => void;
  // toggleFollowing: (id: number, isInProgress: boolean) => void;
  getUsersTC: (pageSize: number, currentPage: number) => void;
  followTC: (id: number) => void;
  unFollowTC: (id: number) => void;
};

type MapStateProps = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
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
    this.props.getUsersTC(this.props.pageSize, this.props.currentPage);
  }

  handleChangePage = (page: number) => {
    this.props.getUsersTC(this.props.pageSize, page);
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
          followingInProgress={this.props.followingInProgress}
          followTC={this.props.followTC}
          unFollowTC={this.props.unFollowTC}
          onChangePage={this.handleChangePage}
          // toggleFollowing={this.props.toggleFollowing}
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
    followingInProgress: state.usersPage.followingInProgress,
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

// export default connect(mapStateToProps, {
//   // followSuccess,
//   // unFollowSuccess,
//   // setUsers,
//   // setCurrentPage,
//   // setTotalUsersCount,
//   // toggleIsFetching,
//   // toggleFollowing,
//   getUsersTC,
//   followTC,
//   unFollowTC,
// })(UsersContainer);

export default compose<ComponentType>(
  connect(mapStateToProps, { getUsersTC, followTC, unFollowTC }),
  withAuthRedirect
)(UsersContainer);
