import { rerenderEntireTree } from "../render";

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
  },
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

export const updateNewPostText = (newText: string) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
};

export default state;
