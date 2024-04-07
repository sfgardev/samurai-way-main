import { NavLink } from "react-router-dom";
import s from "../Dialogs.module.css";

type DialogItemProps = {
  name: string;
  id: number;
};

const DialogItem = (props: DialogItemProps) => {
  const path = `/dialogs/${props.id}`;

  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};
export default DialogItem;
