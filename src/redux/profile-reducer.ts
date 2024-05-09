import { ActionsType, PostType, ProfilePageType } from "./store";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dada", likesCount: 11 },
  ],
  newPostText: "it-kamasutra",
};

export const profileReducer = (
  state: ProfilePageType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ADD_POST: {
      const newPost: PostType = {
        id: state.posts.length + 1,
        message: state.newPostText,
        likesCount: 0,
      };

      return { ...state, newPostText: "", posts: [...state.posts, newPost] };
      // const stateCopy = { ...state };
      // stateCopy.posts = [...state.posts];
      // stateCopy.posts.push(newPost);
      // stateCopy.newPostText = "";
      // return stateCopy;
      // state.posts.push(newPost);
      // state.newPostText = "";
      // return state;
    }
    case UPDATE_NEW_POST_TEXT: {
      return { ...state, newPostText: action.newText };
      // const stateCopy = { ...state };
      // stateCopy.newPostText = action.newText;
      // return stateCopy;
    }
    default:
      return state;
  }
};

export const addPostAC = () => ({ type: ADD_POST } as const);

export const updateNewPostTextAC = (newText: string) =>
  ({
    type: UPDATE_NEW_POST_TEXT,
    newText,
  } as const);
