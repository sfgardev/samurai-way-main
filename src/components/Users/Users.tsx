import userImage from "../../assets/images/image.jpeg";
import { UserType } from "../../redux/users-reducer";
import styles from "./Users.module.css";

type UsersProps = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  onChangePage: (usersCount: number) => void;
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
              <img
                src={user.photos.small ? user.photos.small : userImage}
                alt="Avatar"
                className={styles.userPhoto}
                height={100}
              />
            </div>
            <div>
              {user.followed ? (
                <button onClick={() => props.unFollow(user.id)}>
                  Unfollow
                </button>
              ) : (
                <button onClick={() => props.follow(user.id)}>Follow</button>
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
