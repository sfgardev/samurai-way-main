import React from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { ProfileModel } from "../../api/api";
import { getUserProfileTC } from "../../redux/profile-reducer";
import { AppRootState } from "../../redux/redux-store";
import Profile from "./Profile";

type MapStateProps = {
  profile: ProfileModel;
  isAuth: boolean;
};

type PathParamsType = {
  userId: string;
};

type ProfileContainerProps = RouteComponentProps<PathParamsType> & {
  profile: ProfileModel;
  isAuth: boolean;
  getUserProfileTC: (id: string) => void;
};
class ProfileContainer extends React.Component<ProfileContainerProps> {
  componentDidMount() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      userId = "2";
    }

    this.props.getUserProfileTC(userId);
  }

  render() {
    if (!this.props.isAuth) {
      return <Redirect to="/login" />;
    }

    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
  };
};

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getUserProfileTC })(
  WithUrlDataContainerComponent
);
