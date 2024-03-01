import s from "./Post.module.css";

type PostProps = {
  message: string;
  likesCount: number;
};

const Post = (props: PostProps) => {
  return (
    <div className={s.item}>
      <img
        src="https://upload.wikimedia.org/wikipedia/ru/c/ce/Aang.png"
        alt=""
      />
      {props.message}
      <div>
        <span>{props.likesCount} like</span>
      </div>
    </div>
  );
};
export default Post;
