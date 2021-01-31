/*
  Checks if the Current User is valid User and if they have active subscription,
  Route to Registration Page accordingly if needed
  Route to Subscription Page if Commanded by User without active subscription
  else Serves the Drink with warning
*/

import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import {orderDrink} from "../reducers/user"
import { useHistory } from "react-router-dom";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    alignItems: "stretch",
    padding: theme.padding.medium,
  },
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
  // -- create an alert first to warn the placement of the shaker under the nozzle
  const serve = () => {
    Alert.alert(
      "Place your Shaker",
      "Make Sure you place the Shaker under the nozzle and press Okay",
      [
        {
          text: "Cancel",
          onPress: () => history.push("/"),
          style: "cancel"
        },
        { text: "Okay", onPress: () => dispatch(orderDrink(user, port, drink.machineCodes.order))}
      ],
      { cancelable: false }
    )
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
          <Text style={theme.button} fontWeight="bold">
            Get Subscription
          </Text>
        </Pressable>
      }

      <Pressable onPress={serve}>
        <Text style={theme.button} fontWeight="bold">
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