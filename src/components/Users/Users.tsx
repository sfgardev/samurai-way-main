import { NavLink } from "react-router-dom";

import { followTC, UserType } from "../../redux/users-reducer";

import Paginator from "../common/Paginator/Paginator";
import User from "./User";

type UsersProps = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  followingInProgress: number[];
  followTC: (userId: number) => void;
  unFollowTC: (userId: number) => void;
  onChangePage: (usersCount: number) => void;
  // toggleFollowing: (id: number, isInProgress: boolean) => void;
};

const Users = (props: UsersProps) => {
  return (
    <div>
      <Paginator
        currentPage={props.currentPage}
        pageSize={props.pageSize}
        totalItemsCount={props.totalUsersCount}
        onChangePage={props.onChangePage}
      />
      {props.users.map((user) => (
        <User
          key={user.id}
          user={user}
          followingInProgress={props.followingInProgress}
          followTC={props.followTC}
          unFollowTC={props.unFollowTC}
        />
      ))}
    </div>
  );
};
export default Users;
