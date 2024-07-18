import { ContactsModel, ProfileModel } from "../../../api/api";
import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userImage from "../../../assets/images/image.jpeg";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import { ChangeEvent, useState } from "react";
import ProfileDataForm from "./ProfileDataForm";

type ProfileInfoProps = {
  profile: ProfileModel;
  isAuth: boolean;
  status: string;
  isOwner: boolean;
  updateStatus: (status: string) => void;
  savePhoto: (photo: File) => void;
  saveProfile: (formData: any) => Promise<any>;
};

const ProfileInfo = (props: ProfileInfoProps) => {
  const [editMode, setEditMode] = useState(false);

  const handleSelectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: any) => {
    props.saveProfile(formData).finally(() => setEditMode(false));
  };

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
        {props.isOwner && <input type="file" onChange={handleSelectPhoto} />}

        {editMode ? (
          // @ts-ignore
          <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} />
        ) : (
          <ProfileData
            profile={props.profile}
            isOwner={props.isOwner}
            goToEditMode={() => setEditMode(true)}
          />
        )}

        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

type ProfileDataProps = {
  profile: ProfileModel;
  isOwner: boolean;
  goToEditMode: () => void;
};

const ProfileData = (props: ProfileDataProps) => {
  return (
    <div>
      {props.isOwner && (
        <div>
          <button onClick={props.goToEditMode}>Edit</button>
        </div>
      )}
      <div>
        <b>Full name</b>: {props.profile.fullName}
      </div>
      <div>
        <b>Lokking for job</b>: {props.profile.lookingForAJob ? "yes" : "no"}
      </div>
      {props.profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>:{" "}
          {props.profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>About me</b>: {props.profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {/* {Object.entries(props.profile.contacts).map(([key, value]) => (
      <Contact key={key} contactTitle={key} contactValue={value} />
    ))} */}
        {Object.keys(props.profile.contacts).map((key) => (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={props.profile.contacts[key as keyof ContactsModel]}
          />
        ))}
      </div>
    </div>
  );
};

type ContactProps = {
  contactTitle: string;
  contactValue: string;
};

const Contact = (props: ContactProps) => {
  return (
    <div>
      <b>{props.contactTitle}</b>: {props.contactValue}
    </div>
  );
};

// type ProfileDataFormProps = {
//   profile: ProfileModel;
// };

// const ProfileDataForm = (props: ProfileDataFormProps) => {
//   return <div>
//     <form action="">form</form>
//   </div>;
// };

export default ProfileInfo;
