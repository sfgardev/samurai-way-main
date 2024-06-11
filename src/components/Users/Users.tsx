import { NavLink } from "react-router-dom";
import { usersAPI } from "../../api/api";
import userImage from "../../assets/images/image.jpeg";
import { UserType } from "../../redux/users-reducer";
import styles from "./Users.module.css";

type UsersProps = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  followingInProgress: number[];
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  onChangePage: (usersCount: number) => void;
  toggleFollowing: (id: number, isInProgress: boolean) => void;
};

const Users = (props: UsersProps) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  return (
    <div>
      <div>
        {Array.from({ length: pagesCount }, (_, index) => (
          <span
            key={index}
            className={
              props.currentPage === index + 1 ? styles.selectedPage : ""
            }
            onClick={() => props.onChangePage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
      </div>
      {props.users.map((user) => (
        <div key={user.id}>
          <span>
            <div>
              <NavLink to={`/profile/${user.id}`}>
                <img
                  src={user.photos.small ? user.photos.small : userImage}
                  alt="Avatar"
                  className={styles.userPhoto}
                  height={100}
                />
              </NavLink>
            </div>
            <div>
              {user.followed ? (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.toggleFollowing(user.id, true);
                    usersAPI.unFollowUser(user.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.unFollow(user.id);
                      }
                      props.toggleFollowing(user.id, false);
                    });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === user.id
                  )}
                  onClick={() => {
                    props.toggleFollowing(user.id, true);
                    usersAPI.followUser(user.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.follow(user.id);
                      }
                      props.toggleFollowing(user.id, false);
                    });
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{user.name}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{"user.location.country"}</div>
              <div>{"user.location.city"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
export default Users;
