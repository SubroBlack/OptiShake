import machine from "../services/machine";

// ACTION TYPES
const SET_PORT = "SET_PORT";

//Action Creator
const action = (actionType, data) => {
  return {
    type: actionType,
    data: data,
  };
};

// Setting a PORT
export const openPort = () => {
  return async (dispatch) => {
    const port = await machine.openPort('ttyS1');
    dispatch(action(SET_PORT, port));
  }
}

// Port Reducer
const portReducer = (state = null, action ) => {
  switch (action.type) {
    case SET_PORT:
      return action.data;
    default: 
      return state;
  }
}

export default portReducer;