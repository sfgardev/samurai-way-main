import { ProfileModel } from "../../api/api";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfileProps = {
  profile: ProfileModel;
  isAuth: boolean;
  status: string;
  updateStatus: (status: string) => void;
};

const Profile = (props: ProfileProps) => {
  return (
    <div>
      <ProfileInfo
        profile={props.profile}
        isAuth={props.isAuth}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer />
    </div>
  );
};
export default Profile;
