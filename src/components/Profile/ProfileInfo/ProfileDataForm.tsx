import { InjectedFormProps, reduxForm } from "redux-form";
import { ProfileModel } from "../../../api/api";
import { required } from "../../../utils/validators";
import { createField, Input, Textarea } from "../../common/FormControls/FormControl";

type ProfileDataFormProps = {
  profile: ProfileModel;
};

const ProfileDataForm = (props: InjectedFormProps<ProfileDataFormProps>) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <button >Save</button>
      </div>

      <div>
        <b>Full name</b>:{" "}
        {createField("fullName", Input, [required], "text", "Full name")}
      </div>
      <div>
        <b>Lokking for job</b>:{" "}
        {createField("lookingForAJob", Input, [], "checkbox", "")}
      </div>
    
        <div>
          <b>My professional skills</b>:{" "}
          {createField("lookingForAJobDescription", Textarea, [required], "", "Skills")}
        </div>
    
      <div>
        <b>About me</b>:
        {createField("aboutMe", Textarea, [], "", "About me")}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {/* {Object.entries(props.profile.contacts).map(([key, value]) => (
      <Contact key={key} contactTitle={key} contactValue={value} />
    ))} */}
        {/* {Object.keys(props.profile.contacts).map((key) => (
          <Contact
            key={key}
            contactTitle={key}
            contactValue={props.profile.contacts[key as keyof ContactsModel]}
          />
        ))} */}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileDataFormProps>({
  form: "profile",
})(ProfileDataForm);

export default ProfileDataFormReduxForm;
