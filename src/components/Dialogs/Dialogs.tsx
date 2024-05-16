import { createRef } from "react";
// import { ActionsType } from "../../redux/store";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import {
  MessagesPageType,
  sendMessageAC,
  updateNewMessageAC,
} from "../../redux/dialogs-reducer";

type DialogsProps = {
  dialogsPage: MessagesPageType;
  sendMessage: () => void;
  changeMessage: (text: string) => void;
  // dispatch: (action: ActionsType) => void;
};

const Dialogs = (props: DialogsProps) => {
  let dialogsElements = props.dialogsPage.dialogs.map((dialog) => (
    <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
  ));

  let messagesElements = props.dialogsPage.messages.map((message) => (
    <Message key={message.id} message={message.message} />
  ));

  const newMessageElement = createRef<HTMLTextAreaElement>();

  const sendMessage = () => {
    // if (newMessageElement.current) {
    //   props.dispatch(sendMessageAC());
    // }
    props.sendMessage();
  };

  const handleChangeMessage = () => {
    if (newMessageElement.current) {
      // props.dispatch(updateNewMessageAC(newMessageElement.current.value));
      props.changeMessage(newMessageElement.current.value);
    }
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <div>
          <div>
            <textarea
              ref={newMessageElement}
              value={props.dialogsPage.newMessageText}
              placeholder="Enter your message"
              onChange={handleChangeMessage}
            />
          </div>
          <div>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
      {/* <div>
        <textarea
          ref={newMessageElement}
          value={props.state.newMessageText}
          onChange={handleChangeMessage}
        />
        <button onClick={addMessage}>Add</button>
      </div> */}
    </div>
  );
};
export default Dialogs;
