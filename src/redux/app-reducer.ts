import { AnyAction, Dispatch } from "redux";
import { getUserDataTC } from "./auth-reducer";
import { ThunkDispatch } from "redux-thunk";
import { AppRootState } from "./redux-store";

type AppInitialState = {
  isInitialized: boolean;
};

type AppActionsType = ReturnType<typeof initializedSuccessAC>;

const initialState: AppInitialState = {
  isInitialized: false,
};

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export const appReducer = (
  state = initialState,
  action: AppActionsType
): AppInitialState => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return { ...state, isInitialized: true };
    default:
      return state;
  }
};

// actions
export const initializedSuccessAC = () => ({ type: INITIALIZED_SUCCESS });

// thunks
export const initializeApp =
  () => (dispatch: ThunkDispatch<AppRootState, unknown, AnyAction>) => {
    dispatch(getUserDataTC()).finally(() => {
      dispatch(initializedSuccessAC());
    });
  };
