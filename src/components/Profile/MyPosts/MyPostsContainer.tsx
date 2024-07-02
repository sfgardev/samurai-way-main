import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  PostType,
  ProfileActionsType,
  addPostAC,
  // updateNewPostTextAC,
} from "../../../redux/profile-reducer";
import { AppRootState } from "../../../redux/redux-store";
// import { ActionsType } from "../../../redux/store";
import MyPosts from "./MyPosts";

type MyPostsContainerProps = {};

type MapStateProps = {
  posts: PostType[];
  // newPostText: string;
};

type MapDispatchProps = {
  addPost: (newPostBody: string) => void;
  // updateNewPostText: (text: string) => void;
};

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    posts: state.profilePage.posts,
    // newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ProfileActionsType>
): MapDispatchProps => {
  return {
    addPost: (newPostBody: string) => dispatch(addPostAC(newPostBody)),
    // updateNewPostText: (text: string) => dispatch(updateNewPostTextAC(text)),
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
