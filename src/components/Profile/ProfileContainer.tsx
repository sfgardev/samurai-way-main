import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import axios from "axios";
import { ProfileType, setUserProfile } from "../../redux/profile-reducer";
import { AppRootState } from "../../redux/redux-store";
import { RouteComponentProps, withRouter } from "react-router-dom";

type MapStateProps = {
  profile: ProfileType;
};

type PathParamsType = {
  userId: string;
};

type ProfileContainerProps = RouteComponentProps<PathParamsType> & {
  profile: ProfileType;
  setUserProfile: (profile: ProfileType) => void;
};
class ProfileContainer extends React.Component<ProfileContainerProps> {
  componentDidMount() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      userId = "2";
    }

    axios
      .get<ProfileType>(
        `https://social-network.samuraijs.com/api/1.0/profile/${userId}`
      )
      .then((res) => {
        this.props.setUserProfile(res.data);
      });
  }

  render() {
    console.log(this.props);
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    profile: state.profilePage.profile,
  };
};

const WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(
  WithUrlDataContainerComponent
);
