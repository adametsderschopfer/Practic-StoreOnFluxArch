import {
  createStore,
  combineReducers,
  createStoreWithMiddleware,
  middlewares,
} from "./store/Store";

function reducer_1(state = { count1: 1 }, action) {
  switch (action.type) {
    case "Add1": {
      return { ...state, count1: state.count1 + 1 };
    }
    default: {
      return state;
    }
  }
}
function reducer_2(state = { count2: 1 }, action) {
  switch (action.type) {
    case "Add2": {
      return { ...state, count2: state.count2 + 1 };
    }
    default: {
      return state;
    }
  }
}

const rootReducer = combineReducers({ count1: reducer_1, count2: reducer_2 });
const store = createStoreWithMiddleware(createStore, middlewares.thunk)(rootReducer)

store.subscribe((state) => {
  console.log(state);
});

store.dispatch((dispatch) => {
  dispatch({ type: "Add2" })
});
