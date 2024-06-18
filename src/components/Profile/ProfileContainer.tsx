import React, { ComponentType } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ProfileModel } from "../../api/api";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { getUserProfileTC } from "../../redux/profile-reducer";
import { AppRootState } from "../../redux/redux-store";
import Profile from "./Profile";
import { compose } from "redux";

type MapStateProps = {
  profile: ProfileModel;
  // isAuth: boolean;
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
    // if (!this.props.isAuth) {
    //   return <Redirect to="/login" />;
    // }

    return <Profile {...this.props} profile={this.props.profile} />;
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
  };
};

// const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, { getUserProfileTC })(
//   WithUrlDataContainerComponent
// );

export default compose<ComponentType>(
  connect(mapStateToProps, { getUserProfileTC }),
  withRouter
  // withAuthRedirect
)(ProfileContainer);
