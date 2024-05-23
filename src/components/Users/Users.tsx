import axios from "axios";
import { UserType } from "../../redux/users-reducer";
import styles from "./Users.module.css";
import userImage from "../../assets/images/image.jpeg";
import React, { useEffect } from "react";

type UsersProps = {
  users: UserType[];
  follow: (userId: number) => void;
  unFollow: (userId: number) => void;
  setUsers: (users: UserType[]) => void;
};

type GetUsersResponse = {
  items: UserType[];
  totalCount: number;
  error: string;
};

// const Users = (props: UsersProps) => {
//   if (props.users.length === 0) {
//     axios
//       .get<GetUsersResponse>(
//         "https://social-network.samuraijs.com/api/1.0/users"
//       )
//       .then((response) => {
//         props.setUsers(response.data.items);
//       });
//   }

//   // useEffect(() => {
//   //   const promise = fetch("https://jsonplaceholder.typicode.com/posts/1000");

//   //   promise
//   //     .then((data) => {
//   //       console.log(data);
//   //       console.log("пользователь нашелся");
//   //     })
//   //     .catch((error) => {
//   //       console.log(error.message);
//   //       console.log("пользователь не нашелся");
//   //     })
//   //     .finally(() => console.log("запрос произведен"));
//   // }, []);

//   return (
//     <div>
//       {props.users.map((user) => (
//         <div key={user.id}>
//           <span>
//             <div>
//               <img
//                 src={user.photos.small ? user.photos.small : userImage}
//                 alt="Avatar"
//                 className={styles.userPhoto}
//                 height={100}
//               />
//             </div>
//             <div>
//               {user.followed ? (
//                 <button onClick={() => props.unFollow(user.id)}>
//                   Unfollow
//                 </button>
//               ) : (
//                 <button onClick={() => props.follow(user.id)}>Follow</button>
//               )}
//             </div>
//           </span>
//           <span>
//             <span>
//               <div>{user.name}</div>
//               <div>{user.status}</div>
//             </span>
//             <span>
//               <div>{"user.location.country"}</div>
//               <div>{"user.location.city"}</div>
//             </span>
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

class Users extends React.Component<UsersProps> {
  constructor(props: UsersProps) {
    super(props);

    alert(123);

    axios
      .get<GetUsersResponse>(
        "https://social-network.samuraijs.com/api/1.0/users"
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  }

  // getUsers() {
  //   if (this.props.users.length === 0) {
  //     axios
  //       .get<GetUsersResponse>(
  //         "https://social-network.samuraijs.com/api/1.0/users"
  //       )
  //       .then((response) => {
  //         this.props.setUsers(response.data.items);
  //       });
  //   }
  // }

  render() {
    return (
      <div>
        {/* <button onClick={this.getUsers}>Get users</button> */}
        {this.props.users.map((user) => (
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
                  <button onClick={() => this.props.unFollow(user.id)}>
                    Unfollow
                  </button>
                ) : (
                  <button onClick={() => this.props.follow(user.id)}>
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
  }
}
export default Users;
