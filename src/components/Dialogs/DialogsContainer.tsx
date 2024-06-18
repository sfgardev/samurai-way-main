import { connect } from "react-redux";
import { Dispatch, compose } from "redux";
import {
  DialogsActionsType,
  MessagesPageType,
  sendMessageAC,
  updateNewMessageAC,
} from "../../redux/dialogs-reducer";
import { AppRootState } from "../../redux/redux-store";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { ComponentType } from "react";

type DialogsContainerProps = {};

type MapStateProps = {
  dialogsPage: MessagesPageType;
  // isAuth: boolean;
};

type MapDispatchProps = {
  changeMessage: (text: string) => void;
  sendMessage: () => void;
};

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    dialogsPage: state.dialogsPage,
    // isAuth: state.auth.isAuth,
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

// let AuthRedirectComponent = withAuthRedirect(Dialogs);
//  (props: any) => {
//   if (!props.isAuth) {
//     return <Redirect to="/login" />;
//   }

//   return <Dialogs {...props}/>
// }

// const DialogsContainer = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(AuthRedirectComponent);

export default compose<ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
