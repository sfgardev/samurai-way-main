import { StoreContextConsumer } from "../../../StoreContextConsumer";
import { addPostAC, updateNewPostTextAC } from "../../../redux/profile-reducer";
import { ActionsType, PostType } from "../../../redux/store";
import MyPosts from "./MyPosts";

type MyPostsContainerProps = {
  // posts: PostType[];
  // newPostText: string;
  // dispatch: (action: ActionsType) => void;
};

const MyPostsContainer = (props: MyPostsContainerProps) => {
  return (
    <StoreContextConsumer>
      {(store) => {
        const state = store.getState();

        const addPost = () => {
          store.dispatch(addPostAC());
        };

        const onPostChange = (text: string) => {
          store.dispatch(updateNewPostTextAC(text));
        };
        return (
          <MyPosts
            posts={state.profilePage.posts}
            newPostText={state.profilePage.newPostText}
            updateNewPostText={onPostChange}
            addPost={addPost}
          />
        );
      }}
    </StoreContextConsumer>
  );
};
export default MyPostsContainer;
