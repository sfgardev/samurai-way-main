import { connect } from "react-redux";
import {
  DialogsActionsType,
  MessagesPageType,
  sendMessageAC,
  updateNewMessageAC,
} from "../../redux/dialogs-reducer";
import { AppRootState } from "../../redux/redux-store";
import { Dispatch } from "redux";
import Dialogs from "./Dialogs";

type DialogsContainerProps = {};

type MapStateProps = {
  dialogsPage: MessagesPageType;
  isAuth: boolean;
};

type MapDispatchProps = {
  changeMessage: (text: string) => void;
  sendMessage: () => void;
};

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth,
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
