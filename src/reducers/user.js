/*
The Reducer to take the SNo of the Shaker RFID card and search the Owner user if registered
*/

import machineService from "../services/machine";
import userService from "../services/user";
import { setNewShaker } from "./newShaker";

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
// Returns User Object
export const fetchUser = (shakerNumber) => {
  
  return async dispatch => {
    const res = await userService.fetchByShaker(shakerNumber);

    dispatch({
      type: SET_USER,
      user: res
    });
    
    res ? dispatch(setNewShaker(false)) : dispatch(setNewShaker(true));
  };
};

// Adding a new User
export const addUser = (user) => {
  return async (dispatch) => {
    const res = userService.addUser(user);
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
// Takes in User Obj, Port and Drink and sends the signal to the Machine and updates Drink Count in User
export const orderDrink = (user, port, drink, gym) => {
  const res = machineService.command(port, drink.machineCodes.order);
  if(res.status === "failed"){
    console.log("User Reducer, drink order failed: ", res);
  } else {
    return async dispatch => {
      const served = {
        id: drink.id,
        name: drink.name,
        date: new Date(),
        gym: gym
      }
      const result = userService.drink(user, served);
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