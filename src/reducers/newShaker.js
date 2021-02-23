/*
 * Reducer for newShaker: Boolean, to trigger TRUE if new shaker without valid user is scanned
*/

// Action Type
const SET_NEWSHAKER = "SET_NEWSHAKER";

// Action 
const action = (actionType, value) => {
  return {
    type: actionType,
    value: value,
  };
}

// Setting newShaker: value Boolean
export const setNewShaker = (value) => {
  console.log("Reducer New Shaker? ", value)
  return async (dispatch) => {
    dispatch(action(SET_NEWSHAKER, value));
  };
}

// newShaker Reducer 
const newShakerReducer = (state = false, action ) => {
  switch (action.type) {
    case SET_NEWSHAKER:
      return action.value;
    default: 
      return state;
  }
}

export default newShakerReducer;