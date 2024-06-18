import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ProfileModel } from "../../api/api";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  getUserProfileTC,
  getUserStatusTC,
  updateStatusTC,
} from "../../redux/profile-reducer";
import { AppRootState } from "../../redux/redux-store";
import Profile from "./Profile";
import { compose } from "redux";

type MapStateProps = {
  profile: ProfileModel;
  status: string;
  // isAuth: boolean;
};

type PathParamsType = {
  userId: string;
};

type ProfileContainerProps = RouteComponentProps<PathParamsType> & {
  profile: ProfileModel;
  isAuth: boolean;
  status: string;
  getUserProfileTC: (id: string) => void;
  getUserStatusTC: (id: string) => void;
  updateStatusTC: (status: string) => void;
};
class ProfileContainer extends React.Component<ProfileContainerProps> {
  componentDidMount() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      userId = "31109";
    }

    this.props.getUserProfileTC(userId);
    this.props.getUserStatusTC(userId);
  }

  render() {
    // if (!this.props.isAuth) {
    //   return <Redirect to="/login" />;
    // }

    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatusTC}
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
  }),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
