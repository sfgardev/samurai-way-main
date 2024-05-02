import { createRef } from "react";
import { ActionsType, MessagesPageType } from "../../redux/store";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import { sendMessageAC, updateNewMessageAC } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

type DialogsContainerProps = {
  state: MessagesPageType;
  dispatch: (action: ActionsType) => void;
};

const DialogsContainer = (props: DialogsContainerProps) => {
  const sendMessage = () => {
    props.dispatch(sendMessageAC());
  };

  const changeMessage = (text: string) => {
    props.dispatch(updateNewMessageAC(text));
  };

  return (
    <Dialogs
      state={props.state}
      sendMessage={sendMessage}
      changeMessage={changeMessage}
    />
  );
};
export default DialogsContainer;
