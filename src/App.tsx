import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="app-wrapper">
      <header className="header">
        header
        <img
          src="https://1000logos.net/wp-content/uploads/2017/05/Pepsi-logo.png"
          alt=""
        />
      </header>
      <nav className="nav">
        <ul>
          <li>
            <a href="">Profile</a>
          </li>
          <li>
            <a href="">Messages</a>
          </li>
          <li>
            <a href="">News</a>
          </li>
          <li>
            <a href="">Music</a>
          </li>
          <li>
            <a href="">Settings</a>
          </li>
        </ul>
      </nav>
      <main className="content">
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
        <div>
          <div>Post1</div>
          <div>Post2</div>
        </div>
      </main>
    </div>
  );
};

export default App;
