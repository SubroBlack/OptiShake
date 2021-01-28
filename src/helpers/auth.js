// Checking the Logged in Gym by scanning token in local storage
// Provides the token to send with the requests when needed

import AsyncStorage from '@react-native-community/async-storage';

const checkLogged = async () => {
  try {
    const loggedGym = await AsyncStorage.getItem("OptiShakeGym");
    console.log("Helper found loggedGym: ", loggedGym);
    return JSON.parse(loggedGym);
  } catch (e) {
    console.log("Helper Error fetching Logged Gym from LocalStorage: ", e);
  }
}

// Token of the LoggedIn
const loggedGymToken = () => {
  const gym = checkLogged();

  return `bearer ${gym}`;
};

const loggedGymConfig = () => {
  const token = loggedGymToken();
  if (token === null) {
    return null;
  }
  const config = {
    headers: { auth: token },
  };
  return config;
};

export default {checkLogged, loggedGymToken};