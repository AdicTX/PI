import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import reducerDogs from "../reducers/reducerDogs";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    reducerDogs,
  }),
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
