import axios from "axios";
//import helper from "../helpers/auth";
const baseUrl = "/api/login";

// POST req to login
// Sends the credentials {email, password} to the URL
// Receives token of GymObject signed with jwt and a secret 
const login = async (credentials) => {
  console.log("Gym Login Service login: ", credentials);
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

export default {login};