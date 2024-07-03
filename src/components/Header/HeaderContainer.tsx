import React from "react";
import { connect } from "react-redux";
import { getUserDataTC, logoutTC } from "../../redux/auth-reducer";
import { AppRootState } from "../../redux/redux-store";
import Header from "./Header";

type HeaderContainerProps = {
  isAuth: boolean;
  login: string | null;
  getUserDataTC: () => void;
  logoutTC: () => void;
};

class HeaderContainer extends React.Component<HeaderContainerProps> {
  componentDidMount() {
    this.props.getUserDataTC();
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppRootState) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, { getUserDataTC, logoutTC })(
  HeaderContainer
);
