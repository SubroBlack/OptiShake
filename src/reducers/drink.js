// ACTION TYPES
const SET_DRINK = "SET_DRINK";


/*
* Store the Drink in the app state so when a valid user is present, the command for the DRINK can be run.
*/

// Add Drink to App State
export const setDrink = (drink) => {
  return async dispatch => {
    dispatch({
      type: SET_DRINK,
      drink: drink,
    });
  }
}

// Clear Drink 
export const clearDrink = () => {
  return async dispatch => {
    dispatch ({
      type: SET_DRINK,
      drink: null
    });
  }
}

// Drink Reducer
const drinkReducer = (state = null, action ) => {
  switch (action.type) {
    case SET_DRINK:
      return action.drink;
    default: 
      return state;
  }
}

export default drinkReducer;