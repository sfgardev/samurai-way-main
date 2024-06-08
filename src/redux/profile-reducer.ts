import { ProfileModel } from "../api/api";

export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

export type ProfilePageType = {
  posts: PostType[];
  newPostText: string;
  profile: ProfileModel;
};

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

const initialState: ProfilePageType = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dada", likesCount: 11 },
  ],
  newPostText: "it-kamasutra",
  profile: {
    aboutMe: "",
    contacts: {
      facebook: "",
      github: "",
      instagram: "",
      mainLink: "",
      twitter: "",
      vk: "",
      website: "",
      youtube: "",
    },
    fullName: "",
    lookingForAJob: false,
    lookingForAJobDescription: "",
    photos: {
      small: "",
      large: "",
    },
    userId: 0,
  },
};

export type ProfileActionsType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostTextAC>
  | ReturnType<typeof setUserProfile>;

export const profileReducer = (
  state = initialState,
  action: ProfileActionsType
): ProfilePageType => {
  switch (action.type) {
    case ADD_POST: {
      const newPost: PostType = {
        id: state.posts.length + 1,
        message: state.newPostText,
        likesCount: 0,
      };
      return { ...state, newPostText: "", posts: [...state.posts, newPost] };
    }
    case UPDATE_NEW_POST_TEXT: {
      return { ...state, newPostText: action.newText };
    }
    case "SET_USER_PROFILE":
      return { ...state, profile: action.profile };
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

export const setUserProfile = (profile: any) =>
  ({
    type: SET_USER_PROFILE,
    profile,
  } as const);
