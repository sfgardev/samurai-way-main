import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <ul>
        <li className={`${s.item} ${s.active}`}>
          <NavLink to="/profile" activeClassName={s.active}>
            Profile
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/messages" activeClassName={s.active}>
            Messages
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/news" activeClassName={s.active}>
            News
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/music" activeClassName={s.active}>
            Music
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink to="/settings" activeClassName={s.active}>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
