import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import { ActionsType, RootStateType } from "./redux/state";

type AppProps = {
  state: RootStateType;
  dispatch: (action: ActionsType) => void;
  // addPost: () => void;
  // updateNewPostText: (newText: string) => void;
  // addMessage: () => void;
  // updateNewMessage: (newMessage: string) => void;
};

const App = (props: AppProps) => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Route
            path="/dialogs"
            render={() => (
              <Dialogs
                state={props.state.dialogsPage}
                dispatch={props.dispatch}
                // addMessage={props.addMessage}
                // updateNewMessage={props.updateNewMessage}
              />
            )}
          />
          <Route
            path="/profile"
            render={() => (
              <Profile
                profilePage={props.state.profilePage}
                dispatch={props.dispatch}
                // addPost={props.addPost}
                // updateNewPostText={props.updateNewPostText}
              />
            )}
          />
          <Route path="/news" component={News} />
          <Route path="/music" component={Music} />
          <Route path="/settings" component={Settings} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
