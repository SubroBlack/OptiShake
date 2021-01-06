/*
The module to manage the customer data from the database
*/

import Users from "../users.json";

// The user object 
const userObj = {
  fullName: "",
  homeGym: "",
  shaker: [],
  subscription: [],
  drinks: [],
}

// Function to Find a user by Name instead of Shakers when necessary for particular actions
const searchByName = (name) => {
  const res = Users.filter((user) => user.fullName === name);
  if (res.length === 1) {
    return res[0];
  } else {
    return null;
  }
}

// Function to fetch the User according to Shaker Number sno
// Takes object with "CardNum": "Decimal number of Shaker", "cardNumHex": "Hexadecimal number of Shaker"
// Returns User
const fetchByShaker = (id) => {
  const res = Users.filter((user) => user.shaker.filter(card => card.cardNum === id.cardNum && card.cardNumHex === id.cardNumHex).length > 0);
  if (res.length === 1) {
    return res[0];
  } else {
    return null;
  }
}

// Function to Add User/ (need to edit it to make it capable of checking user with same name and add the shaker for the profile)
const addUser = (name) => {
  console.log("Add the User in Users.json", name);
  const res = userObj; 
  res.fullName= name;
  Users.concat(res);
  return res;
}

// Function to add the Subscription for a User according to the Shaker
// First make sure the user does not have active subscription before confirming the subscription
const subscribe = (shakerId) => {
  const res = fetchByShaker(shakerId);
  const date = new Date();
  const date_end = date.setDate(date.getDate() + 30);
  const newSub = {
    active: "true",
    start: new Date(),
    end: new Date(date_end)
  }
  const subs = res.subscription.concat(newSub);
  res.subscription = subs;
  return res;
}

export default {fetchByShaker, searchByName, addUser, subscribe};