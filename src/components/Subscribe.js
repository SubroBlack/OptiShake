/*
  Page to add a monthly subscription
*/
import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { subscribe } from "../reducers/user";
import { useHistory } from "react-router-dom";

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

  // Add Monthly Subscription Button
  const Subscribe = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user);
    const sub = user.subscription.filter(s => s.active);
    
    if (sub.length > 0 ){
      console.log("User's Subs: ", sub);
      history.push("/auth")
      return null;
    }

    return (
      <View>
          <Pressable onPress={() => {dispatch(subscribe(user.shaker[0])); history.push("/auth")}}>
            <Text style={styles.button} fontWeight="bold">
              Add Monthly Subscription
            </Text>
          </Pressable>
        </View>
    )
  }

  export default Subscribe;