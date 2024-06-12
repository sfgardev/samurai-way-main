import { ProfileModel } from "../../api/api";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfileProps = {
  profile: ProfileModel;
  isAuth: boolean;
};

const Profile = (props: ProfileProps) => {
  return (
    <div>
      <ProfileInfo profile={props.profile} isAuth={props.isAuth} />
      <MyPostsContainer />
    </div>
  );
};
export default Profile;
