import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppRootState } from "../../redux/redux-store";
import {
  UserType,
  UsersActionsType,
  followAC,
  setUsersAC,
  unFollowAC,
} from "../../redux/users-reducer";
import Users from "./Users";

type MapStateProps = {
  users: UserType[];
};

type MapDispatchProps = {
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  setUsers: (users: UserType[]) => void;
};

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    users: state.usersPage.users,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<UsersActionsType>
): MapDispatchProps => {
  return {
    follow: (userId: number) => dispatch(followAC(userId)),
    unFollow: (userId: number) => dispatch(unFollowAC(userId)),
    setUsers: (users: UserType[]) => dispatch(setUsersAC(users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
