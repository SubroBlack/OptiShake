import gymLoginService from "../services/gymLogin";

//Action Types
const SET_LOGGED_GYM = "SET_LOGGED_GYM";

// setting a logged gym in the store Action Creator
const setLogged = (gym) => {
  return {
    type: SET_LOGGED_GYM,
    gym: gym,
  };
};

// Setting a gym when signing in
export const signIn = (email, password) => {
  console.log("Login Reducer signin: ", email, password);
  return async (dispatch) => {
    try {
      // Get loggedGym token from Server
      const loggedGym = await gymLoginService.login({email, password});
      
      if(loggedGym.token){
      // Save GYM in the localStorage
      console.log("Login SUCCESS: Reducer");
      } else {
      console.log("Login Failed: Reducer");
      }
      await dispatch(setLogged(loggedGym));
    } catch (exception) {
      console.log("Login Failed, reducer: ", exception);
    }
  };
};

// Gym Logging Out
export const logOut = () => {
  // Remove Token from LocalStorage and then clear the app state
  return async (dispatch) => {    
    await dispatch(setLogged(null));
  };
};

// Checking if the GYM is loggedIn during reloads
export const setLoggedGym = () => {
  return async (dispatch) => {
    const loggedGym = helper.checkLogged();
    await dispatch(setLogged(loggedGym));
  };
};

// GYM Login Reducer
const gymLoginReducer = (state = null, action) => {
  switch (action.type) {
    case SET_LOGGED_GYM:
      return action.gym;
    default:
      return state;
  }
};

export default gymLoginReducer;