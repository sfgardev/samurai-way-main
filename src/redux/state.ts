let rerenderEntireTree = (state: RootStateType) => {
  console.log("state changed");
};

export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

export type DialogsType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  message: string;
};

export type ProfilePageType = {
  posts: PostType[];
  newPostText: string;
};

export type MessagesPageType = {
  dialogs: DialogsType[];
  messages: MessageType[];
  newMessageText: string;
};

export type RootStateType = {
  profilePage: ProfilePageType;
  dialogsPage: MessagesPageType;
};

export const state: RootStateType = {
  profilePage: {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 12 },
      { id: 2, message: "It's my first post", likesCount: 11 },
      { id: 3, message: "Blabla", likesCount: 11 },
      { id: 4, message: "Dada", likesCount: 11 },
    ],
    newPostText: "it-kamasutra",
  },
  dialogsPage: {
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
  },
};

export const subscribe = (observer: (state: RootStateType) => void) => {
  rerenderEntireTree = observer;
};

export const addPost = () => {
  const newPost: PostType = {
    id: state.profilePage.posts.length + 1,
    message: state.profilePage.newPostText,
    likesCount: 0,
  };
  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = "";
  rerenderEntireTree(state);
};

export const addMessage = () => {
  const newMessage: MessageType = {
    id: state.dialogsPage.messages.length + 1,
    message: state.dialogsPage.newMessageText,
  };
  state.dialogsPage.messages.push(newMessage);
  state.dialogsPage.newMessageText = "";
  rerenderEntireTree(state);
};

export const updateNewPostText = (newText: string) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
};

export const updateNewMessage = (newMessage: string) => {
  state.dialogsPage.newMessageText = newMessage;
  rerenderEntireTree(state);
};

export default state;
