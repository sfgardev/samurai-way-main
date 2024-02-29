import MyPosts from "./MyPosts/MyPosts";
import s from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={s.content}>
      <div>
        <img
          src="https://cc-prod.scene7.com/is/image/CCProdAuthor/t-03-4?$pjpeg$&jpegSize=200&wid=720"
          alt=""
        />
      </div>
      <div>ava + desc</div>
      <MyPosts />
    </div>
  );
};
export default Profile;
