import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { ProfileModel } from "../../api/api";
import {
  getUserProfileTC,
  getUserStatusTC,
  savePhotoTC,
  updateStatusTC,
} from "../../redux/profile-reducer";
import { AppRootState } from "../../redux/redux-store";
import Profile from "./Profile";

type MapStateProps = {
  profile: ProfileModel;
  status: string;
  authorizedUserId: number | null;
  isAuth: boolean;
};

type PathParamsType = {
  userId: string;
};

type ProfileContainerProps = RouteComponentProps<PathParamsType> & {
  profile: ProfileModel;
  status: string;
  isAuth: boolean;
  authorizedUserId: number | null;
  getUserProfileTC: (id: string) => void;
  getUserStatusTC: (id: string) => void;
  updateStatusTC: (status: string) => void;
  savePhotoTC: (photo: File) => void;
};
class ProfileContainer extends React.Component<ProfileContainerProps> {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = String(this.props.authorizedUserId);
      if (!userId) {
        this.props.history.push("/login");
      }
    }

    this.props.getUserProfileTC(userId);
    this.props.getUserStatusTC(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(
    prevProps: Readonly<ProfileContainerProps>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    // if (!this.props.isAuth) {
    //   return <Redirect to="/login" />;
    // }

    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatusTC}
        savePhoto={this.props.savePhotoTC}
      />
    );
  }
}

// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);
// (props: any) => {
//   if (!props.isAuth) {
//     return <Redirect to="/login" />;
//   }

//   return <ProfileContainer {...props}/>
// }

// const mapStateToPropsForRedirect = (state: AppRootState) => {
//   return {
//     isAuth: state.auth.isAuth,
//   };
// };

// // @ts-ignore
// AuthRedirectComponent = connect(mapStateToPropsForRedirect)(AuthRedirectComponent)

const mapStateToProps = (state: AppRootState): MapStateProps => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.isAuth,
  };
};

// const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, { getUserProfileTC })(
//   WithUrlDataContainerComponent
// );

export default compose<ComponentType>(
  connect(mapStateToProps, {
    getUserProfileTC,
    getUserStatusTC,
    updateStatusTC,
    savePhotoTC,
  }),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
