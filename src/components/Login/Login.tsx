import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../common/FormControls/FormControl";
import { required } from "../../utils/validators";

type FormDataType = {
  login: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm = (props: InjectedFormProps<FormDataType>) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="login"
          component={Input}
          placeholder="Login"
          validate={[required]}
        />
      </div>
      <div>
        <Field
          name="password"
          component={Input}
          placeholder="Password"
          validate={[required]}
        />
      </div>
      <div>
        <Field name="rememberMe" component={Input} type="checkbox" /> remember
        me
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<FormDataType>({
  form: "login",
})(LoginForm);

const Login = () => {
  const onSubmit = (formData: FormDataType) => {
    console.log(formData);
  };
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default Login;
