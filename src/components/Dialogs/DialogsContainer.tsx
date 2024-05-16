import { connect } from "react-redux";
// import { StoreContextConsumer } from "../../StoreContextConsumer";
import {
  DialogsActionsType,
  MessagesPageType,
  sendMessageAC,
  updateNewMessageAC,
} from "../../redux/dialogs-reducer";
import { AppRootState, AppRootStore } from "../../redux/redux-store";
// import { ActionsType } from "../../redux/store";
import Dialogs from "./Dialogs";
import { Dispatch } from "redux";

type DialogsContainerProps = {};

type MapStateProps = {
  dialogsPage: MessagesPageType;
};

type MapDispatchProps = {
  changeMessage: (text: string) => void;
  sendMessage: () => void;
};

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
const mapDispatchToProps = (
  dispatch: Dispatch<DialogsActionsType>
): MapDispatchProps => {
  return {
    changeMessage: (text: string) => dispatch(updateNewMessageAC(text)),
    sendMessage: () => dispatch(sendMessageAC()),
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
