import { createRef } from "react";
// import { PostType } from "../../../redux/store";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { PostType } from "../../../redux/profile-reducer";
import { Field, InjectedFormProps, reduxForm } from "redux-form";

type MyPostsProps = {
  posts: PostType[];
  addPost: (newPostBody: string) => void;
  // updateNewPostText: (text: string) => void;
  // newPostText: string;
};

type FormDataType = {
  newPostBody: string;
};

const MyPosts = (props: MyPostsProps) => {
  let postsElements = props.posts.map((post) => (
    <Post key={post.id} message={post.message} likesCount={post.likesCount} />
  ));

  // const newPostElement = createRef<HTMLTextAreaElement>();

  // const addPost = () => {
  //   // props.dispatch(addPostAC());
  //   props.addPost();
  // };

  // const onPostChange = () => {
  //   if (newPostElement.current) {
  //     props.updateNewPostText(newPostElement.current.value);
  //     // props.dispatch(updateNewPostTextAC(newPostElement.current.value));
  //   }
  // };

  const addNewPost = (values: FormDataType) => {
    // alert(values.newPostBody);
    props.addPost(values.newPostBody);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddPostFormRedux onSubmit={addNewPost} />

      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

const AddPostForm = (props: InjectedFormProps<FormDataType>) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component="textarea"
          name="newPostBody"
          placeholder="Add your post..."
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddPostFormRedux = reduxForm<FormDataType>({ form: "addPostForm" })(
  AddPostForm
);

export default MyPosts;
