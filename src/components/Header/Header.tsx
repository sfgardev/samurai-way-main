import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

type HeaderProps = {
  isAuth: boolean;
  login: string | null;
};

const Header = (props: HeaderProps) => {
  return (
    <header className={s.header}>
      header
      <img
        src="https://1000logos.net/wp-content/uploads/2017/05/Pepsi-logo.png"
        alt=""
      />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          props.login
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;
