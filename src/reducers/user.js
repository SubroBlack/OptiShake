/*
The Reducer to take the SNo of the Shaker RFID card and search the Owner user if registered
*/

import userService from "../services/user";

// Action Type
const SET_USER = "SET_USER";

// Action
const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: SET_USER,
      user: user,
    });
  }
}

// Find the User according to shaker number and put it as APP state
// Takes object with "sno": "Decimal number of Shaker", "hex": "Hexadecimal number of Shaker"
// Returns User Object
export const fetchUser = (shakerNumber) => {
  const res = userService.fetchByShaker(shakerNumber);
  return async dispatch => {
    dispatch({
      type: SET_USER,
      user: res
    });
  };
};

// Adding a new User
export const addUser = (name) => {
  return async (dispatch) => {
    const res = userService.addUser(name);
    dispatch(setUser(res));
  }
}

// Clear a user 
export const clearUser = () => {
  return async dispatch => {
    dispatch({
      type: SET_USER,
      user: null
    })
  }
}

// Subscribe
export const subscribe = (shakerId) => {
  return async dispatch => {
    const res = userService.subscribe(shakerId);
    dispatch(setUser(res));
  }
}

// User Reducer 
const userReducer = (state = null, action ) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default: 
      return state;
  }
}

export default userReducer;