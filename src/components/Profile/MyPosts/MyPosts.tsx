import { createRef } from "react";
import { ActionsType, PostType } from "../../../redux/state";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

type MyPostsProps = {
  posts: PostType[];
  newPostText: string;
  dispatch: (action: ActionsType) => void;
  // addPost: () => void;
  // updateNewPostText: (newText: string) => void;
};

const MyPosts = (props: MyPostsProps) => {
  let postsElements = props.posts.map((post) => (
    <Post key={post.id} message={post.message} likesCount={post.likesCount} />
  ));

  const newPostElement = createRef<HTMLTextAreaElement>();

  const addPost = () => {
    props.dispatch({ type: "ADD-POST" });
    // props.addPost();
  };

  const onPostChange = () => {
    if (newPostElement.current) {
      props.dispatch({
        type: "UPDATE-NEW-POST-TEXT",
        newText: newPostElement.current.value,
      });
    }
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea
            ref={newPostElement}
            value={props.newPostText}
            onChange={onPostChange}
          />
        </div>
        <div>
          <button onClick={addPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};
export default MyPosts;
