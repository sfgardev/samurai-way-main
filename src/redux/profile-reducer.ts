import { AnyAction, Dispatch } from "redux";
import { ProfileModel, profileAPI } from "../api/api";
import { AppRootState } from "./redux-store";
import { ThunkDispatch } from "redux-thunk";

export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

export type ProfilePageType = {
  posts: PostType[];
  profile: ProfileModel;
  status: string;
};

const ADD_POST = "ADD-POST";
// const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

const initialState: ProfilePageType = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dada", likesCount: 11 },
  ],
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
  status: "",
};

export type ProfileActionsType =
  | ReturnType<typeof addPostAC>
  // | ReturnType<typeof updateNewPostTextAC>
  | ReturnType<typeof setUserProfileAC>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof deletePostAC>
  | ReturnType<typeof savePhotoSuccessAC>;

export const profileReducer = (
  state = initialState,
  action: ProfileActionsType
): ProfilePageType => {
  switch (action.type) {
    case ADD_POST: {
      const newPost: PostType = {
        id: state.posts.length + 1,
        message: action.newPostBody,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost] };
    }
    // case UPDATE_NEW_POST_TEXT: {
    //   return { ...state, newPostText: action.newText };
    // }
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };
    case SAVE_PHOTO_SUCCESS:
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    default:
      return state;
  }
};

// actions
export const addPostAC = (newPostBody: string) =>
  ({ type: ADD_POST, newPostBody } as const);

export const setUserProfileAC = (profile: any) =>
  ({
    type: SET_USER_PROFILE,
    profile,
  } as const);

export const setStatusAC = (status: string) =>
  ({ type: SET_STATUS, status } as const);

export const deletePostAC = (postId: number) =>
  ({ type: DELETE_POST, postId } as const);

export const savePhotoSuccessAC = (photos: ProfileModel["photos"]) =>
  ({ type: SAVE_PHOTO_SUCCESS, photos } as const);

// thunks
export const getUserProfileTC =
  (userId: number) => async (dispatch: Dispatch) => {
    // let userId = this.props.match.params.userId;

    //   if (!userId) {
    //     userId = "2";
    //   }

    const data = await profileAPI.getUserProfile(userId);
    dispatch(setUserProfileAC(data));

    // profileAPI.getUserProfile(userId).then((data) => {
    //   dispatch(setUserProfileAC(data));
    // });
  };

export const getUserStatusTC =
  (userId: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.getStatus(userId);

    dispatch(setStatusAC(response.data));

    // profileAPI.getStatus(userId).then((response) => {
    //   dispatch(setStatusAC(response.data));
    // });
  };

export const updateStatusTC =
  (status: string) => async (dispatch: Dispatch) => {
    const response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
      dispatch(setStatusAC(status));
    }

    // profileAPI.updateStatus(status).then((response) => {
    //   if (response.data.resultCode === 0) {
    //     dispatch(setStatusAC(status));
    //   }
    // });
  };

export const savePhotoTC = (file: File) => async (dispatch: Dispatch) => {
  const response = await profileAPI.savePhoto(file);

  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccessAC(response.data.data.photos));
  }
};

export const saveProfileTC =
  (profile: any) =>
  async (
    dispatch: ThunkDispatch<AppRootState, unknown, AnyAction>,
    getState: () => AppRootState
  ) => {
    const id = getState().auth.id;

    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
      if (id) dispatch(getUserProfileTC(id));
    }
  };
