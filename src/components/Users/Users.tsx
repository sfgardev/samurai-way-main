import { UserType } from "../../redux/users-reducer";
import styles from "./Users.module.css";

type UsersProps = {
  users: UserType[];
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  setUsers: (users: UserType[]) => void;
};

const Users = (props: UsersProps) => {
  if (props.users.length === 0) {
    props.setUsers([
      {
        id: 1,
        photoUrl:
          "https://ps.w.org/one-user-avatar/assets/icon-256x256.png?rev=2536829",
        followed: false,
        fullName: "Dmitry",
        status: "I am a boss",
        location: {
          city: "Minsk",
          country: "Belarus",
        },
      },
      {
        id: 2,
        photoUrl:
          "https://ps.w.org/one-user-avatar/assets/icon-256x256.png?rev=2536829",
        followed: true,
        fullName: "Sasha",
        status: "I am a boss too",
        location: {
          city: "Moscow",
          country: "Russia",
        },
      },
      {
        id: 3,
        photoUrl:
          "https://ps.w.org/one-user-avatar/assets/icon-256x256.png?rev=2536829",
        followed: false,
        fullName: "Andrew",
        status: "I am a boss too",
        location: {
          city: "Ukraine",
          country: "Kiev",
        },
      },
    ]);
  }

  return (
    <div>
      {props.users.map((user) => (
        <div key={user.id}>
          <span>
            <div>
              <img
                src={user.photoUrl}
                alt="Avatar"
                className={styles.userPhoto}
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
              <div>{user.fullName}</div>
              <div>{user.status}</div>
            </span>
            <span>
              <div>{user.location.country}</div>
              <div>{user.location.city}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
export default Users;
