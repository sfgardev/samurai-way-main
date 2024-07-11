import { NavLink } from "react-router-dom";
import { UserType } from "../../redux/users-reducer";
import userImage from "../../assets/images/image.jpeg";
import styles from "./Users.module.css";

type UserProps = {
  user: UserType;
  followingInProgress: number[];
  followTC: (userId: number) => void;
  unFollowTC: (userId: number) => void;
};

const User = ({
  user,
  followingInProgress,
  followTC,
  unFollowTC,
}: UserProps) => {
  return (
    <div>
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
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => unFollowTC(user.id)}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => followTC(user.id)}
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
  );
};
export default User;
