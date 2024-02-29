import s from "./Profile.module.css";

const Profile = () => {
  return (
    <main className={s.content}>
      <div>
        <img
          src="https://cc-prod.scene7.com/is/image/CCProdAuthor/t-03-4?$pjpeg$&jpegSize=200&wid=720"
          alt=""
        />
      </div>
      <div>ava + desc</div>
      <div>
        my posts
        <div>New post</div>
      </div>
      <div className={s.posts}>
        <div className={s.item}>Post1</div>
        <div className={s.item}>Post2</div>
      </div>
    </main>
  );
};
export default Profile;
