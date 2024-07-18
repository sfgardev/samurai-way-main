import { ProfileModel } from "../../api/api";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type ProfileProps = {
  profile: ProfileModel;
  isAuth: boolean;
  status: string;
  isOwner: boolean;
  updateStatus: (status: string) => void;
  savePhoto: (photo: File) => void;
  saveProfile: (formData:any) => Promise<any>
};

const Profile = (props: ProfileProps) => {
  return (
    <div>
      <ProfileInfo
        profile={props.profile}
        isAuth={props.isAuth}
        status={props.status}
        isOwner={props.isOwner}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};
export default Profile;
