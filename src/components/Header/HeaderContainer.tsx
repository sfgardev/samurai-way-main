import React from "react";
import { connect } from "react-redux";
import { AppRootState } from "../../redux/redux-store";
import Header from "./Header";
import axios from "axios";
import { setUserData } from "../../redux/auth-reducer";

type HeaderContainerProps = {
  isAuth: boolean;
  login: string | null;
  setUserData: (userId: number, email: string, login: string) => void;
};

class HeaderContainer extends React.Component<HeaderContainerProps> {
  componentDidMount() {
    axios
      .get("https://social-network.samuraijs.com/api/1.0/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.resultCode === 0) {
          const { id, email, login } = res.data.data;
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
