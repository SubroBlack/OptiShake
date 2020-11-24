import machine from "../services/machine";

// ACTION TYPES
const SET_RESPONSE = "SET_RESPONSE";


// Subscribe to a port
export const listenNew = (port) => {
  return async dispatch => {
    machine.listen(port, data => {
      dispatch({
        type: SET_RESPONSE,
        data
      });
    })
  }
}

/*
// Subscribe to a port
export const listenAc = data => {
  return async dispatch => {
    dispatch({
      type: SET_RESPONSE,
      data
    })
  }
}
*/

// Response Reducer
const responseReducer = (state = null, action ) => {
  switch (action.type) {
    case SET_RESPONSE:
      return action.data;
    default: 
      return state;
  }
}

export default responseReducer;