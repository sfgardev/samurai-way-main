import { ProfilePageType } from "../../redux/state";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfileProps = {
  profilePage: ProfilePageType;
  addPost: () => void;
  updateNewPostText: (newText: string) => void;
};

const Profile = (props: ProfileProps) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts
        posts={props.profilePage.posts}
        newPostText={props.profilePage.newPostText}
        addPost={props.addPost}
        updateNewPostText={props.updateNewPostText}
      />
    </div>
  );
};
export default Profile;
