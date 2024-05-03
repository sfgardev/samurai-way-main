import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addPostAC, updateNewPostTextAC } from "../../../redux/profile-reducer";
import { AppRootState } from "../../../redux/redux-store";
import { ActionsType, PostType } from "../../../redux/store";
import MyPosts from "./MyPosts";

type MyPostsContainerProps = {};

type MapStateProps = {
  posts: PostType[];
  newPostText: string;
};

type MapDispatchProps = {
  addPost: () => void;
  updateNewPostText: (text: string) => void;
};

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ActionsType>
): MapDispatchProps => {
  return {
    addPost: () => dispatch(addPostAC()),
    updateNewPostText: (text: string) => dispatch(updateNewPostTextAC(text)),
  };
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
