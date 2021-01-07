/*
The Reducer to take the SNo of the Shaker RFID card and search the Owner user if registered
*/

import machineService from "../services/machine";
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

// Ordering a Drink
// Takes in User Obj, Port and Drink Command Code and sends the signal to the Machine and updates Drink Count in User
export const orderDrink = (user, port, orderCode) => {
  const res = machineService.command(port, orderCode);
  if(res.status === "failed"){
    console.log("User Reducer, drink order failed: ", res);
  } else {
    return async dispatch => {
      const result = userService.drink(user);
      // dispatch(setUser(result));
      dispatch(setUser(user));  // Temp Line until service works with backend
    }
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