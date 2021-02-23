
// ACTION TYPES
const SET_KEY = "SET_KEY";

//Action Creator
const action = (actionType, data) => {
  return {
    type: actionType,
    data: data,
  };
};

// Setting a KEY
export const setKey = (key) => {
  return async (dispatch) => {
    dispatch(action(SET_KEY, key));
  }
}

// Clearing a key
export const clearKey = () => {
  return async (dispatch) => {
    dispatch(action(SET_KEY, null));
  }
}

// Key Reducer
const keyReducer = (state = null, action ) => {
  switch (action.type) {
    case SET_KEY:
      return action.data;
    default: 
      return state;
  }
}

export default keyReducer;