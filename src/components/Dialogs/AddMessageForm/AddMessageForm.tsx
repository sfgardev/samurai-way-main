import { InjectedFormProps, Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators";
import { Textarea } from "../../common/FormControls/FormControl";

export type FormDataType = {
  newMessageBody: string;
};

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props: InjectedFormProps<FormDataType>) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="newMessageBody"
          placeholder="Enter your message..."
          validate={[required, maxLength50]}
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

export default reduxForm<FormDataType>({
  form: "dialogAddMessageForm",
})(AddMessageForm);
