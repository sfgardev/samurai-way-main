import { createRef } from "react";
// import { PostType } from "../../../redux/store";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { PostType } from "../../../redux/profile-reducer";

type MyPostsProps = {
  posts: PostType[];
  addPost: () => void;
  updateNewPostText: (text: string) => void;
  newPostText: string;
};

const MyPosts = (props: MyPostsProps) => {
  let postsElements = props.posts.map((post) => (
    <Post key={post.id} message={post.message} likesCount={post.likesCount} />
  ));

  const newPostElement = createRef<HTMLTextAreaElement>();

  const addPost = () => {
    // props.dispatch(addPostAC());
    props.addPost();
  };

  const onPostChange = () => {
    if (newPostElement.current) {
      props.updateNewPostText(newPostElement.current.value);
      // props.dispatch(updateNewPostTextAC(newPostElement.current.value));
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
