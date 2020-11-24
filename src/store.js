import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import thunk from "redux-thunk";
import commandReducer from "./reducers/command";

import portReducer from "./reducers/port";
import responseReducer from "./reducers/response";

const reducer = combineReducers({
  port: portReducer,
  response: responseReducer,
  command: commandReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;