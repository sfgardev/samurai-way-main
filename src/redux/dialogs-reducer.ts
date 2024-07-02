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
};

const SEND_MESSAGE = "SEND-MESSAGE";

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
};

export type DialogsActionsType = ReturnType<typeof sendMessageAC>;

export const dialogsReducer = (
  state = initialState,
  action: DialogsActionsType
): MessagesPageType => {
  switch (action.type) {
    case SEND_MESSAGE: {
      const newMessage: MessageType = {
        id: state.messages.length + 1,
        message: action.newMessageBody,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    }

    default:
      return state;
  }
};

export const sendMessageAC = (newMessageBody: string) =>
  ({ type: SEND_MESSAGE, newMessageBody } as const);
