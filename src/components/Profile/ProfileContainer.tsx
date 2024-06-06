import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import axios from "axios";
import { ProfileType, setUserProfile } from "../../redux/profile-reducer";
import { AppRootState } from "../../redux/redux-store";

type MapStateProps = {
  profile: ProfileType;
};

type ProfileContainerProps = {
  profile: ProfileType;
  setUserProfile: (profile: ProfileType) => void;
};

class ProfileContainer extends React.Component<ProfileContainerProps> {
  componentDidMount() {
    axios
      .get<ProfileType>(
        `https://social-network.samuraijs.com/api/1.0/profile/2`
      )
      .then((res) => {
        this.props.setUserProfile(res.data);
      });
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    profile: state.profilePage.profile,
  };
};

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
