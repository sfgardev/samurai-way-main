import { StoreContextConsumer } from "../../StoreContextConsumer";
import { sendMessageAC, updateNewMessageAC } from "../../redux/dialogs-reducer";
import { AppRootStore } from "../../redux/redux-store";
import { ActionsType, MessagesPageType } from "../../redux/store";
import Dialogs from "./Dialogs";

// type DialogsContainerProps = {
//   store: AppRootStore;
//   state: MessagesPageType;
//   dispatch: (action: ActionsType) => void;
// };

const DialogsContainer = () => {
  return (
    <StoreContextConsumer>
      {(store) => {
        const state = store.getState().dialogsPage;

        const sendMessage = () => {
          store.dispatch(sendMessageAC());
        };

        const changeMessage = (text: string) => {
          store.dispatch(updateNewMessageAC(text));
        };

        return (
          <Dialogs
            state={state}
            sendMessage={sendMessage}
            changeMessage={changeMessage}
          />
        );
      }}
    </StoreContextConsumer>
  );
};
export default DialogsContainer;
