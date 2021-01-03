/*
  Checks if the Current User is valid User and if they have active subscription,
  Sends to Subscription Page/Registration Page accordingly if needed 
  else Serves the Drink
*/

import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";

import {fetchUser} from "../reducers/user"
import { useHistory } from "react-router-dom";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    alignItems: "stretch",
    padding: theme.padding.medium,
  },
  cardButton: {
    padding: theme.padding.medium,
    backgroundColor: theme.backgroundColors.primary,
    color: theme.colors.lightText,
    fontWeight: "bold",
    borderRadius: 4,
    textAlign: "center",
  }
})

const AuthPage = () => {

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  // Creating ALERT message
  const warnRegister = () =>
    Alert.alert(
      "New Shaker",
      "The shaker is not registered yet. Do you want to purchase the Shaker?",
      [
        {
          text: "Cancel",
          onPress: () => history.push("/"),
          style: "cancel"
        },
        { text: "Purchase", onPress: () => history.push("/register")}
      ],
      { cancelable: false }
    );


  // Check if the valid user is present and redirect to Register Page if not
  if (user === null){
    console.log("Auth Page user: ", user);
    warnRegister();
    return null;
  };

  // Add Monthly Subscription Button
  const subscribe = () => {
    // function to add subscription for 30days starting from current date
    const sub = user.subscription.filter(s => s.active);
    console.log("User's Subs: ", sub);
    if (sub.active === false){
      return (
        <View>
          <Pressable onPress={() => history.push("/subscribe")}>
            <Text style={styles.cardButton} fontWeight="bold">
              Add Monthly Subscription
            </Text>
          </Pressable>
        </View>
      )
    } else {
      return null;
    }
  }

  // Function to serve the Drink
  // create an alert fisrt to warn the placement of the shaker under the nozzle
  const serve = () => {
    console.log("Serve the Drink now");
  }

  return (
    <View style={styles.container}>
      {subscribe()}
      <Pressable onPress={serve}>
        <Text style={styles.cardButton} fontWeight="bold">
          Serve the Drink
        </Text>
      </Pressable>
    </View>  
  );
}

export default AuthPage;

/*
  Can display basic stats for user like Subscription date or last subscription or total drinks taken
  in current subscription etc
*/