import { createRef } from "react";
import {
  ActionsType,
  MessagesPageType,
  addMessageAC,
  updateNewMessageAC,
} from "../../redux/state";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

type DialogsProps = {
  state: MessagesPageType;
  dispatch: (action: ActionsType) => void;
};

const Dialogs = (props: DialogsProps) => {
  let dialogsElements = props.state.dialogs.map((dialog) => (
    <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
  ));

  let messagesElements = props.state.messages.map((message) => (
    <Message key={message.id} message={message.message} />
  ));

  const newMessageElement = createRef<HTMLTextAreaElement>();

  const addMessage = () => {
    if (newMessageElement.current) {
      props.dispatch(addMessageAC());
    }
  };

  const handleChangeMessage = () => {
    if (newMessageElement.current) {
      props.dispatch(updateNewMessageAC(newMessageElement.current.value));
    }
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <div>
        <textarea
          ref={newMessageElement}
          value={props.state.newMessageText}
          onChange={handleChangeMessage}
        />
        <button onClick={addMessage}>Add</button>
      </div>
    </div>
  );
};
export default Dialogs;
