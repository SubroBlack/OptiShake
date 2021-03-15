import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import thunk from "redux-thunk";
import commandReducer from "./reducers/command";
import drinkReducer from "./reducers/drink";
import gymReducer from "./reducers/gym";
import keyReducer from "./reducers/key";
import newShakerReducer from "./reducers/newShaker";

import portReducer from "./reducers/port";
import responseReducer from "./reducers/response";
import userReducer from "./reducers/user";

const reducer = combineReducers({
  port: portReducer,
  response: responseReducer,
  command: commandReducer,
  key: keyReducer,
  drink: drinkReducer,
  user: userReducer,
  newShaker: newShakerReducer,
  gym: gymReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;