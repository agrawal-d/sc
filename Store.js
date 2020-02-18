import { applyMiddleware, createStore, compose } from "redux";
import appReducer from "./reducers/rootReducer";
import thunkMiddleware from "redux-thunk";

// Middlewares.
const logger = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};

const round = number => Math.round(number * 100) / 100;
const monitorReducerEnhancer = createStore => (
  reducer,
  initialState,
  enhancer
) => {
  const monitoredReducer = (state, action) => {
    const start = Date.now();
    const newState = reducer(state, action);
    const end = Date.now();
    const diff = round(end - start);
    console.log("reducer process time:", diff);
    return newState;
  };
  return createStore(monitoredReducer, initialState, enhancer);
};

const middlewareEnhancer = applyMiddleware(logger, thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer, monitorReducerEnhancer);
// End Middlewares.

const initialState = {};

const store = createStore(appReducer, initialState, composedEnhancers);

export default store;
