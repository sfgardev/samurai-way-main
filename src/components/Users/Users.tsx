import axios from "axios";
import React from "react";
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
  setUsers: (users: UserType[]) => void;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (usersCount: number) => void;
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
  // eslint-disable-next-line
  // constructor(props: UsersProps) {
  //   super(props);
  //   axios
  //     .get<GetUsersResponse>(
  //       "https://social-network.samuraijs.com/api/1.0/users"
  //     )
  //     .then((response) => {
  //       console.log(response.data)
  //       this.props.setUsers(response.data.items);
  //     });
  // }

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
    console.log(this.props.users);
    console.log(this.props.totalUsersCount);
    console.log(this.props.pageSize);
    console.log(this.props.currentPage);
    const pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize
    );

    // const pagesArr = Array.from(
    //   { length: pagesCount },
    //   (_, index) => index + 1
    // );

    // const arr = [];
    // for (let index = 1; index <= pagesCount; index++) {
    //   arr.push(index);
    // }
    // console.log(arr);

    return (
      <div>
        {/* <button onClick={this.getUsers}>Get users</button> */}
        <div>
          {/* {pagesArr.map((num) => (
            <span key={num}>{num}</span>
          ))} */}
          {Array.from({ length: pagesCount }, (_, index) => (
            <span
              key={index}
              className={
                this.props.currentPage === index + 1 ? styles.selectedPage : ""
              }
              onClick={() => this.handleChangePage(index + 1)}
            >
              {index + 1}
            </span>
          ))}

          {/* <span className={styles.selectedPage}>2</span>
          <span>3</span>
          <span>4</span>
          <span>15</span> */}
        </div>
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
