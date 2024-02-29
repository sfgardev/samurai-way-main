import s from "./Post.module.css";

const Post = () => {
  return (
    <div className={s.item}>
      <img
        src="https://upload.wikimedia.org/wikipedia/ru/c/ce/Aang.png"
        alt=""
      />
      post 1
      <div>
        <span>like</span>
      </div>
    </div>
  );
};
export default Post;
