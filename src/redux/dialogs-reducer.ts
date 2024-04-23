import { ActionsType, MessageType, MessagesPageType } from "./state";

const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE = "UPDATE-NEW-MESSAGE";

export const dialogsReducer = (
  state: MessagesPageType,
  action: ActionsType
) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const newMessage: MessageType = {
        id: state.messages.length + 1,
        message: state.newMessageText,
      };
      state.messages.push(newMessage);
      state.newMessageText = "";
      return state;
    case UPDATE_NEW_MESSAGE:
      state.newMessageText = action.newMessage;
      return state;
    default:
      return state;
  }
};

export const sendMessageAC = () => ({ type: SEND_MESSAGE } as const);

export const updateNewMessageAC = (newMessage: string) =>
  ({
    type: UPDATE_NEW_MESSAGE,
    newMessage,
  } as const);
