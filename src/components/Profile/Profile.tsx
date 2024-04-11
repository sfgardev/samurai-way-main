import { ProfilePageType } from "../../redux/state";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfileProps = {
  state: ProfilePageType;
  addPost: (postMessage: string) => void;
};

const Profile = (props: ProfileProps) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.state.posts} addPost={props.addPost} />
    </div>
  );
};
export default Profile;
