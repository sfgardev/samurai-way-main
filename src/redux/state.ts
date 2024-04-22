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

export type StoreType = {
  _state: RootStateType;
  _callSubscriber: (state: RootStateType) => void;
  getState: () => RootStateType;
  subscribe: (observer: (state: RootStateType) => void) => void;
  dispatch: (action: ActionsType) => void;
  // addPost: () => void;
  // updateNewPostText: (newText: string) => void;
  // addMessage: () => void;
  // updateNewMessage: (newMessage: string) => void;
};

type AddPostActionType = {
  type: "ADD-POST";
};

type UpdateNewPostTextActionType = {
  type: "UPDATE-NEW-POST-TEXT";
  newText: string;
};

type AddMessageActionType = {
  type: "ADD-MESSAGE";
};

type UpdateNewMessageActionType = {
  type: "UPDATE-NEW-MESSAGE";
  newMessage: string;
};

export type ActionsType =
  | AddPostActionType
  | UpdateNewPostTextActionType
  | AddMessageActionType
  | UpdateNewMessageActionType;

const store: StoreType = {
  _state: {
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
  },
  _callSubscriber() {
    console.log("state changed");
  },
  getState() {
    return this._state;
  },
  subscribe(observer: (state: RootStateType) => void) {
    this._callSubscriber = observer;
  },
  dispatch(action: any) {
    if (action.type === "ADD-POST") {
      const newPost: PostType = {
        id: this._state.profilePage.posts.length + 1,
        message: this._state.profilePage.newPostText,
        likesCount: 0,
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === "UPDATE-NEW-POST-TEXT") {
      this._state.profilePage.newPostText = action.newText;
      this._callSubscriber(this._state);
    } else if (action.type === "ADD-MESSAGE") {
      const newMessage: MessageType = {
        id: this._state.dialogsPage.messages.length + 1,
        message: this._state.dialogsPage.newMessageText,
      };
      this._state.dialogsPage.messages.push(newMessage);
      this._state.dialogsPage.newMessageText = "";
      this._callSubscriber(this._state);
    } else if (action.type === "UPDATE-NEW-MESSAGE") {
      this._state.dialogsPage.newMessageText = action.newMessage;
      this._callSubscriber(this._state);
    }
  },

  // addPost() {
  //   const newPost: PostType = {
  //     id: this._state.profilePage.posts.length + 1,
  //     message: this._state.profilePage.newPostText,
  //     likesCount: 0,
  //   };
  //   this._state.profilePage.posts.push(newPost);
  //   this._state.profilePage.newPostText = "";
  //   this._callSubscriber(this._state);
  // },
  // updateNewPostText(newText: string) {
  //   this._state.profilePage.newPostText = newText;
  //   this._callSubscriber(this._state);
  // },
  // addMessage() {
  //   const newMessage: MessageType = {
  //     id: this._state.dialogsPage.messages.length + 1,
  //     message: this._state.dialogsPage.newMessageText,
  //   };
  //   this._state.dialogsPage.messages.push(newMessage);
  //   this._state.dialogsPage.newMessageText = "";
  //   this._callSubscriber(this._state);
  // },
  // updateNewMessage(newMessage: string) {
  //   this._state.dialogsPage.newMessageText = newMessage;
  //   this._callSubscriber(this._state);
  // },
};

// let rerenderEntireTree = (state: RootStateType) => {
//   console.log("state changed");
// };

// export const state: RootStateType = {
//   profilePage: {
//     posts: [
//       { id: 1, message: "Hi, how are you?", likesCount: 12 },
//       { id: 2, message: "It's my first post", likesCount: 11 },
//       { id: 3, message: "Blabla", likesCount: 11 },
//       { id: 4, message: "Dada", likesCount: 11 },
//     ],
//     newPostText: "it-kamasutra",
//   },
//   dialogsPage: {
//     messages: [
//       { id: 1, message: "Hi" },
//       { id: 2, message: "How is your it-kamasutra?" },
//       { id: 3, message: "Yo!" },
//       { id: 4, message: "Yo!" },
//       { id: 5, message: "Yo!" },
//     ],
//     dialogs: [
//       { id: 1, name: "Dimych" },
//       { id: 2, name: "Andrey" },
//       { id: 3, name: "Sveta" },
//       { id: 4, name: "Sasha" },
//       { id: 5, name: "Viktor" },
//       { id: 6, name: "Valera" },
//     ],
//     newMessageText: "it-kamasutra",
//   },
// };

// export const subscribe = (observer: (state: RootStateType) => void) => {
//   rerenderEntireTree = observer;
// };

// export const addPost = () => {
//   const newPost: PostType = {
//     id: state.profilePage.posts.length + 1,
//     message: state.profilePage.newPostText,
//     likesCount: 0,
//   };
//   state.profilePage.posts.push(newPost);
//   state.profilePage.newPostText = "";
//   rerenderEntireTree(state);
// };

// export const addMessage = () => {
//   const newMessage: MessageType = {
//     id: state.dialogsPage.messages.length + 1,
//     message: state.dialogsPage.newMessageText,
//   };
//   state.dialogsPage.messages.push(newMessage);
//   state.dialogsPage.newMessageText = "";
//   rerenderEntireTree(state);
// };

// export const updateNewPostText = (newText: string) => {
//   state.profilePage.newPostText = newText;
//   rerenderEntireTree(state);
// };

// export const updateNewMessage = (newMessage: string) => {
//   state.dialogsPage.newMessageText = newMessage;
//   rerenderEntireTree(state);
// };

export default store;
