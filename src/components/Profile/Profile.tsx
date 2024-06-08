import { ProfileModel } from "../../api/api";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfileProps = {
  profile: ProfileModel;
};

const Profile = (props: ProfileProps) => {
  return (
    <div>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer />
    </div>
  );
};
export default Profile;
