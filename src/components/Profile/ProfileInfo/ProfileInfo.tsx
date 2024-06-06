import { ProfileType } from "../../../redux/profile-reducer";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";

type ProfileInfoProps = {
  profile: ProfileType;
};

const ProfileInfo = (props: ProfileInfoProps) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        <img
          src="https://cc-prod.scene7.com/is/image/CCProdAuthor/t-03-4?$pjpeg$&jpegSize=200&wid=720"
          alt=""
        />
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.small} alt={props.profile.fullName} />
        ava + desc
      </div>
    </div>
  );
};
export default ProfileInfo;
