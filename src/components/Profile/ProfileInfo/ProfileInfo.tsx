import { ProfileModel } from "../../../api/api";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userImage from "../../../assets/images/image.jpeg";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

type ProfileInfoProps = {
  profile: ProfileModel;
  isAuth: boolean;
  status: string;
  updateStatus: (status: string) => void;
};

const ProfileInfo = (props: ProfileInfoProps) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      {/* <div>
        <img
          src="https://cc-prod.scene7.com/is/image/CCProdAuthor/t-03-4?$pjpeg$&jpegSize=200&wid=720"
          alt=""
        />
      </div> */}
      <div className={s.descriptionBlock}>
        <img
          width={100}
          src={
            props.profile.photos.small || props.profile.photos.large
              ? props.profile.photos.small || props.profile.photos.large
              : userImage
          }
          alt={props.profile.fullName}
        />
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};
export default ProfileInfo;
