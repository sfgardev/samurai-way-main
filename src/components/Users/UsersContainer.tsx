import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AppRootState } from "../../redux/redux-store";
import {
  UserType,
  followTC,
  getUsersTC,
  unFollowTC,
} from "../../redux/users-reducer";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../redux/users-selectors";
import Preloader from "../common/Preloader/Preloader";
import Users from "./Users";

type UsersContainerProps = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
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
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose<ComponentType>(
  connect(mapStateToProps, { getUsersTC, followTC, unFollowTC })
)(UsersContainer);
