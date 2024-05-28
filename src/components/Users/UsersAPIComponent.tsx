import axios from "axios";
import React from "react";
import { UserType } from "../../redux/users-reducer";
import Users from "./Users";

type UsersAPIProps = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  setUsers: (users: UserType[]) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (usersCount: number) => void;
};

type GetUsersResponse = {
  items: UserType[];
  totalCount: number;
  error: string;
};

class UsersAPIComponent extends React.Component<UsersAPIProps> {
  componentDidMount() {
    axios
      .get<GetUsersResponse>(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${this.props.currentPage}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  handleChangePage = (page: number) => {
    this.props.setCurrentPage(page);

    axios
      .get<GetUsersResponse>(
        `https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${page}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    return (
      <Users
        users={this.props.users}
        totalUsersCount={this.props.totalUsersCount}
        currentPage={this.props.currentPage}
        pageSize={this.props.pageSize}
        follow={this.props.follow}
        unFollow={this.props.unFollow}
        onChangePage={this.handleChangePage}
      />
    );
  }
}
export default UsersAPIComponent;
