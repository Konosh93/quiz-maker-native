import * as types from '../constants';

const initState = { isAuthenticating: false };

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case types.AUTHENTICATE:
      if (action.payload.errors) {
        return { errors: action.payload.errors, isAuthenticating: false };
      }
      return { user: action.payload.user, isAuthenticating: false};
    case types.BEGIN_AUTH:
      return { isAuthenticating: true }
    case types.LOGOUT:
      return { isAuthenticating: false }
    default:
      return state;
  }
};

export default userReducer;
