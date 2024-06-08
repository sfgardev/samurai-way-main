import React from "react";
import { connect } from "react-redux";
import { usersAPI } from "../../api/api";
import { setUserData } from "../../redux/auth-reducer";
import { AppRootState } from "../../redux/redux-store";
import Header from "./Header";

type HeaderContainerProps = {
  isAuth: boolean;
  login: string | null;
  setUserData: (userId: number, email: string, login: string) => void;
};

class HeaderContainer extends React.Component<HeaderContainerProps> {
  componentDidMount() {
    usersAPI.getAuthData().then((data) => {
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        this.props.setUserData(id, email, login);
      }
    });
  }

  render() {
    console.log(this.props);
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppRootState) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
  };
};

export default connect(mapStateToProps, { setUserData })(HeaderContainer);
