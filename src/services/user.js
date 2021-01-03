/*
The module to manage the customer data from the database
*/

import Users from "../users.json";

// Function to fetch the User according to Shaker Number sno
// Takes object with "sno": "Decimal number of Shaker", "hex": "Hexadecimal number of Shaker"
// Returns User
const fetch = (id) => {
  const res = Users.filter((user) => user.shaker.filter(card => card.cardNum === id.cardNum && card.cardNumHex === id.cardNumHex).length > 0);
  return res;
}

export default {fetch};