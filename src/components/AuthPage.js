/*
  Checks if the Current User is valid User and if they have active subscription,
  Route to Registration Page accordingly if needed
  Add Subscription Function
  else Serves the Drink with warning
*/

import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import {command} from "../reducers/command";
import {fetchUser, subscribe} from "../reducers/user"
import { useHistory } from "react-router-dom";
//import Subscribe from "./Subscribe";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    alignItems: "stretch",
    padding: theme.padding.medium,
  },
  button: {
    padding: theme.padding.medium,
    backgroundColor: theme.backgroundColors.primary,
    color: theme.colors.lightText,
    fontWeight: "bold",
    borderRadius: 4,
    textAlign: "center",
  }
})

const AuthPage = () => {  
  const dispatch = useDispatch();
  const history = useHistory();
  const port = useSelector(state => state.port);
  const drink = useSelector(state => state.drink);
  const user = useSelector(state => state.user);
  console.log("AuthPage User: ", user);

  // Check if the valid user is present and redirect to Register Page if not
  if (user === null){
    console.log("Auth Page user: ", user);
    history.push("/register");
    return null;
  };

  // Function to serve the Drink
  // create an alert fisrt to warn the placement of the shaker under the nozzle
  const serve = () => {
    console.log("Serve the Drink now: ", drink.fullName);
    dispatch(command(port, drink.machineCodes.order));
  }

  const sub = user.subscription ? user.subscription.filter(s => s.active): null;

  return (
    <View style={styles.container}>
      {user ? 
        <Text fontSize="subheading" fontWeight="bold" color="textSecondary">
          Welcome {user.fullName}
        </Text>
        : null
      }
      { sub.length !== 0 ? 
        <Text>
          You have an active subscription ending at {sub[0].end.toString()}
        </Text> :
        <Pressable onPress={() => history.push("/subscribe")}>
          <Text style={styles.button} fontWeight="bold">
            Get Subscription
          </Text>
        </Pressable>
      }

      <Pressable onPress={serve}>
        <Text style={styles.button} fontWeight="bold">
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