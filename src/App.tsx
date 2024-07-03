import { Component, ComponentType } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Music from "./components/Music/Music";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import { initializeApp } from "./redux/app-reducer";
import { AppRootState } from "./redux/redux-store";
import Preloader from "./components/common/Preloader/Preloader";

type AppProps = {
  isInitialized: boolean;
  initializeApp: () => void;
};

type MapStateProps = {
  isInitialized: boolean;
};

class App extends Component<AppProps> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    console.log(this.props.isInitialized)
    if (!this.props.isInitialized) return <Preloader />;

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={() => <DialogsContainer />} />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/users" render={() => <UsersContainer />} />
          <Route path="/login" render={() => <Login />} />

          <Route path="/news" component={News} />
          <Route path="/music" component={Music} />
          <Route path="/settings" component={Settings} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    isInitialized: state.app.isInitialized,
  };
};

export default compose<ComponentType>(
  connect(mapStateToProps, { initializeApp }),
  withRouter
)(App);
