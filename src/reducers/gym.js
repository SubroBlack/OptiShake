import gymLoginService from "../services/gym";
import auth from "../helpers/auth"
import AsyncStorage from '@react-native-community/async-storage';

//Action Types
const SET_GYM = "SET_GYM";

// setting a logged gym in the store Action Creator
const setLogged = (gym) => {
  return {
    type: SET_GYM,
    gym: gym,
  };
};

// Setting a gym when signing in
export const signGym = (gymName) => {
  console.log("Gym Reducer Setting Gym: ", gymName);
  return async (dispatch) => {
    try {
      await AsyncStorage.setItem("OptiShakeGym", JSON.stringify(gymName));
      await dispatch(setLogged(gymName));
    } catch (e) {
      console.log("Error setting Logged Gym in LocalStorage: ", e);
    }
  };
};

// Gym Logging Out
export const logOut = () => {
  // Remove Token from LocalStorage and then clear the app state
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem("OptiShakeGym", JSON.stringify(gymName));
      await dispatch(setLogged(null));
    } catch (e) {
      console.log("Error setting Logged Gym in LocalStorage: ", e);
    }  
  };
};

// Checking if the GYM is loggedIn during reloads
export const setLoggedGym = () => {
  return async (dispatch) => {
    const loggedGym = await auth.checkGym();
    await dispatch(setLogged(loggedGym));
  };
};

// GYM Login Reducer
const gymReducer = (state = null, action) => {
  switch (action.type) {
    case SET_GYM:
      return action.gym;
    default:
      return state;
  }
};

export default gymReducer;