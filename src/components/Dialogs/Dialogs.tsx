import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

type DialogItemProps = {
  name: string;
  id: number;
};

type MessageProps = {
  message: string;
};

const DialogItem = (props: DialogItemProps) => {
  const path = `/dialogs/${props.id}`;

  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

const Message = (props: MessageProps) => {
  return <div className={s.message}>{props.message}</div>;
};

const Dialogs = () => {
  let dialogs = [
    { id: 1, name: "Dimych" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Viktor" },
    { id: 6, name: "Valera" },
  ];

  let dialogsElements = dialogs.map((dialog) => (
    <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
  ));

  let messages = [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your it-kamasutra?" },
    { id: 3, message: "Yo!" },
    { id: 4, message: "Yo!" },
    { id: 5, message: "Yo!" },
  ];

  let messagesElements = messages.map((message) => (
    <Message key={message.id} message={message.message} />
  ));

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
    </div>
  );
};
export default Dialogs;
