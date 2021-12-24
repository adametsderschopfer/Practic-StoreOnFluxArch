class AuxiliaryFunctionsForStore {
  static combineReducers(reducersMap) {
    return function combinationReducer(state, action) {
      const nextState = {};
      Object.entries(reducersMap).forEach(([key, reducer]) => {
        nextState[key] = reducer(state[key], action);
      });

      return nextState;
    };
  }

  static createStoreWithMiddleware(createStore, middleware) {
    return function (reducer, initialState) {
      const store = createStore(reducer, initialState);

      store.dispatch = (action) =>
          middleware(store)(store.dispatch)(action);
        

      return store;
    };
  }
  // return function createStoreWithMiddlewares(createStore) {
  //   return (reducer, initialState) => {
  //     const store = createStore(reducer, initialState);

  //     store.dispatch = (action) => {
  //       return middlewares.forEach((middleware) => {
  //         middleware(store.dispatch, action);
  //       });
  //     };

  //     return store;
  //   };
  // };

  static middlewares = {
    thunk: (store) => (dispatch) => (action) => {
      if (typeof action === "function") {
        return action(store.dispatch);
      }

      return dispatch(action);
    },
    logger: (store) => (dispatch) => (action) => {},
  };
}

export default { AuxiliaryFunctionsForStore };
