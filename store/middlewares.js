const asyncMiddleware = store => next => action => {
  if (action.payload && typeof action.payload.then === 'function') {
    action.payload.then(data => {
      const newAction = { type: action.type, payload: data };
      store.dispatch(newAction);
      next(newAction);
    });
  }
  next(action);
};

export default {
  asyncMiddleware,
};
