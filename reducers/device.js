import * as types from '../constants';
const initState = null;

const deviceReducer = (state=initState, action) => {
  switch (action.type) {
    case types.RESIZE:
      return action.payload;
    default:
      return state;
  }
};

export default deviceReducer;
