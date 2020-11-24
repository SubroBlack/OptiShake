import machine from "../services/machine";

// ACTION TYPES
const SET_COMMAND = "SET_COMMAND";


/*
After Reading the response codes, compare response with needed code and set status to running/success/error
*/

// Command to a port
export const command = (port, code) => {
  const response = machine.command(port, code);
  return async dispatch => {
    dispatch({
      type: SET_COMMAND,
      data: {
        code: code,
        status: response
      }
    });
  
  }
}

// COMMAND Reducer
const commandReducer = (state = null, action ) => {
  switch (action.type) {
    case SET_COMMAND:
      return action.data;
    default: 
      return state;
  }
}

export default commandReducer;