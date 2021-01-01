/*
The Reducer to take the SNo of the Shaker RFID card and search the Owner user if registered
*/

import userService from "../services/user";

// Action Type
const SET_USER = "SET_USER";

// Find the User according to shaker number and put it as APP state
// Takes object with "sno": "Decimal number of Shaker", "hex": "Hexadecimal number of Shaker"
// Returns User Object
export const fetchUser = (shakerNumber) => {
  const res = userService.fetch(shakerNumber);
  console.log("User reducer found: ", res);
  if (res.length === 1){
    return async dispatch => {
      dispatch({
        type: SET_USER,
        user: res[0]
      })
    }
  } else {
    return async dispatch => {
      dispatch({
        type: SET_USER,
        user: null
      })
    }
  }
};

// Clear a user 
export const clearUser = () => {
  return async dispatch => {
    dispatch({
      type: SET_USER,
      user: null
    })
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