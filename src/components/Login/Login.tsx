import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../common/FormControls/FormControl";
import { required } from "../../utils/validators";
import { connect } from "react-redux";
import { loginTC } from "../../redux/auth-reducer";
import { LoginRequestArgs } from "../../api/api";
import { Redirect } from "react-router-dom";
import { AppRootState } from "../../redux/redux-store";
import styles from "../common/FormControls/FormControls.module.css";

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm = (props: InjectedFormProps<FormDataType>) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name="email"
          component={Input}
          placeholder="Email"
          validate={[required]}
        />
      </div>
      <div>
        <Field
          name="password"
          component={Input}
          type="password"
          placeholder="Password"
          validate={[required]}
        />
      </div>
      <div>
        <Field name="rememberMe" component={Input} type="checkbox" /> remember
        me
      </div>
      {props.error && (
        <div className={styles.formSummaryError}>{props.error}</div>
      )}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<FormDataType>({
  form: "login",
})(LoginForm);

type LoginProps = {
  isAuth: boolean;
  loginTC: (arg: LoginRequestArgs) => void;
};

type MapStateProps = {
  isAuth: boolean;
};

const Login = (props: LoginProps) => {
  const onSubmit = (formData: FormDataType) => {
    const { email, password, rememberMe } = formData;
    props.loginTC({ email, password, rememberMe });
  };

  if (props.isAuth) return <Redirect to="/profile" />;

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export default connect(mapStateToProps, { loginTC })(Login);
