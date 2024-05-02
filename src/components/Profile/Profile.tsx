import { ActionsType, ProfilePageType } from "../../redux/store";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
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
      <MyPostsContainer
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
