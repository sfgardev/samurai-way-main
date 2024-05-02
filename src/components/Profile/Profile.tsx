import { ActionsType, ProfilePageType } from "../../redux/store";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfileProps = {
  profilePage: ProfilePageType;
  dispatch: (action: ActionsType) => void;
  // addPost: () => void;
  // updateNewPostText: (newText: string) => void;
};

const Profile = (props: ProfileProps) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts
        posts={props.profilePage.posts}
        newPostText={props.profilePage.newPostText}
        dispatch={props.dispatch}
        // addPost={props.addPost}
        // updateNewPostText={props.updateNewPostText}
      />
    </div>
  );
};
export default Profile;
