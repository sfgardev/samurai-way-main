import { addPostAC, updateNewPostTextAC } from "../../../redux/profile-reducer";
import { ActionsType, PostType } from "../../../redux/store";
import MyPosts from "./MyPosts";

type MyPostsContainerProps = {
  posts: PostType[];
  newPostText: string;
  dispatch: (action: ActionsType) => void;
};

const MyPostsContainer = (props: MyPostsContainerProps) => {
  const addPost = () => {
    props.dispatch(addPostAC());
  };

  const onPostChange = (text: string) => {
    props.dispatch(updateNewPostTextAC(text));
  };

  return (
    <MyPosts
      posts={props.posts}
      newPostText={props.newPostText}
      updateNewPostText={onPostChange}
      addPost={addPost}
    />
  );
};
export default MyPostsContainer;
