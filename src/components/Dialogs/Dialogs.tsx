// import { ActionsType } from "../../redux/store";
import { MessagesPageType } from "../../redux/dialogs-reducer";
import AddMessageForm, { FormDataType } from "./AddMessageForm/AddMessageForm";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

type DialogsProps = {
  dialogsPage: MessagesPageType;
  isAuth: boolean;
  sendMessage: (newMessageBody: string) => void;
  // changeMessage: (text: string) => void;
  // dispatch: (action: ActionsType) => void;
};

// type FormDataType = {
//   newMessageBody: string;
// };

const Dialogs = (props: DialogsProps) => {
  let dialogsElements = props.dialogsPage.dialogs.map((dialog) => (
    <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />
  ));

  let messagesElements = props.dialogsPage.messages.map((message) => (
    <Message key={message.id} message={message.message} />
  ));

  // const newMessageElement = createRef<HTMLTextAreaElement>();

  // const sendMessage = () => {
  //   // if (newMessageElement.current) {
  //   //   props.dispatch(sendMessageAC());
  //   // }
  //   props.sendMessage();
  // };

  // if (!props.isAuth) {
  //   return <Redirect to="/login" />;
  // }

  // const handleChangeMessage = () => {
  //   if (newMessageElement.current) {
  //     // props.dispatch(updateNewMessageAC(newMessageElement.current.value));
  //     props.changeMessage(newMessageElement.current.value);
  //   }
  // };

  const addNewMessage = (values: FormDataType) => {
    // alert(values.newMessageBody);
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

export default Dialogs;
