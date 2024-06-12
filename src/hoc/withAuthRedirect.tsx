import { Redirect } from "react-router-dom";
import { AppRootState } from "../redux/redux-store";
import { connect } from "react-redux";
import { ComponentType } from "react";

type MapStatePropsType = {
  isAuth: boolean;
};

const mapStateToProps = (state: AppRootState): MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export const withAuthRedirect = <T,>(Component: ComponentType<T>) => {
  const RedirectComponent = (props: MapStatePropsType) => {
    let { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to="/login" />;

    return <Component {...(restProps as T & {})} />;
  };

  let ConnectedAuthRedirectComponent =
    connect(mapStateToProps)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
};
