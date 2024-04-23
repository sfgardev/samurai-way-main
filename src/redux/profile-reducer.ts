import { ActionsType, PostType, ProfilePageType } from "./state";

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

export const profileReducer = (state: ProfilePageType, action: ActionsType) => {
  switch (action.type) {
    case ADD_POST:
      const newPost: PostType = {
        id: state.posts.length + 1,
        message: state.newPostText,
        likesCount: 0,
      };
      state.posts.push(newPost);
      state.newPostText = "";
      return state;
    case UPDATE_NEW_POST_TEXT:
      state.newPostText = action.newText;
      return state;
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
