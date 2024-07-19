import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input } from "../common/FormControls/FormControl";
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
  captcha: string | null;
};

const LoginForm = (props: InjectedFormProps<FormDataType>) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {createField("email", Input, [required], "text", "Email")}
        {/* <Field
          name="email"
          component={Input}
          placeholder="Email"
          validate={[required]}
        /> */}
      </div>
      <div>
        {createField("password", Input, [required], "password", "Password")}
        {/* <Field
          name="password"
          component={Input}
          type="password"
          placeholder="Password"
          validate={[required]}
        /> */}
      </div>
      <div>
        <Field name="rememberMe" component={Input} type="checkbox" />
        remember me
        {/* {createField("rememberMe", Input, [], "checkbox")} */}
      </div>
      {/* @ts-ignore */}
      {props.captchaUrl && <img src={props.captchaUrl} alt="" />}
      {/* @ts-ignore */}
      {props.captchaUrl &&
        createField("captcha", Input, [required], "text", "")}
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
  captchaUrl: string | null;
  loginTC: (arg: LoginRequestArgs) => void;
};

type MapStateProps = {
  isAuth: boolean;
  captchaUrl: string | null;
};

const Login = (props: LoginProps) => {
  const onSubmit = (formData: FormDataType) => {
    const { email, password, rememberMe, captcha } = formData;
    props.loginTC({ email, password, rememberMe, captcha: captcha! });
  };

  if (props.isAuth) return <Redirect to="/profile" />;

  return (
    <div>
      <h1>Login</h1>
      {/* @ts-ignore */}
      <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
  };
};

export default connect(mapStateToProps, { loginTC })(Login);
