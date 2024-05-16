// import { ActionsType } from "./store";

export type DialogsType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  message: string;
};

export type MessagesPageType = {
  dialogs: DialogsType[];
  messages: MessageType[];
  newMessageText: string;
};

const SEND_MESSAGE = "SEND-MESSAGE";
const UPDATE_NEW_MESSAGE = "UPDATE-NEW-MESSAGE";

const initialState: MessagesPageType = {
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your it-kamasutra?" },
    { id: 3, message: "Yo!" },
    { id: 4, message: "Yo!" },
    { id: 5, message: "Yo!" },
  ],
  dialogs: [
    { id: 1, name: "Dimych" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Viktor" },
    { id: 6, name: "Valera" },
  ],
  newMessageText: "it-kamasutra",
};

export type DialogsActionsType =
  | ReturnType<typeof sendMessageAC>
  | ReturnType<typeof updateNewMessageAC>;

export const dialogsReducer = (
  state = initialState,
  action: DialogsActionsType
): MessagesPageType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      const newMessage: MessageType = {
        id: state.messages.length + 1,
        message: state.newMessageText,
      };
      return {
        ...state,
        newMessageText: "",
        messages: [...state.messages, newMessage],
      };
      // const stateCopy = { ...state };
      // stateCopy.messages = [...state.messages];
      // stateCopy.messages.push(newMessage);
      // stateCopy.newMessageText = "";
      // return stateCopy;
      // state.messages.push(newMessage);
      // state.newMessageText = "";
      // return state;
    }
    case UPDATE_NEW_MESSAGE: {
      return { ...state, newMessageText: action.newMessage };
      // const stateCopy = { ...state };
      // stateCopy.newMessageText = action.newMessage;
      // return stateCopy;
      // state.newMessageText = action.newMessage;
      // return state;
    }
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
