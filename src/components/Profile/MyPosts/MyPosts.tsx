import { createRef } from "react";
import { PostType } from "../../../redux/state";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

type MyPostsProps = {
  posts: PostType[];
  addPost: (postMessage: string) => void;
};

const MyPosts = (props: MyPostsProps) => {
  let postsElements = props.posts.map((post) => (
    <Post key={post.id} message={post.message} likesCount={post.likesCount} />
  ));

  const newPostElement = createRef<HTMLTextAreaElement>();

  const addPost = () => {
    debugger;
    if (newPostElement.current) {
      props.addPost(newPostElement.current.value);
    }
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea ref={newPostElement}></textarea>
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
