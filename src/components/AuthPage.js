import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";

import {fetchUser} from "../reducers/user"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1, 
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    padding: theme.padding.medium,
  },
  textArea: {
    flexGrow: 1,
    padding: theme.padding.medium,
    borderRadius: 6,
    
    marginVertical: theme.margin.thin
  },
  cardButton: {
    padding: theme.padding.medium,
    backgroundColor: theme.backgroundColors.primary,
    color: theme.colors.lightText,
    fontWeight: "bold",
    borderRadius: 4,
    textAlign: "center",
  },
  graphicsArea: {
    flexGrow: 1,
    padding: theme.padding.medium,
    borderRadius: 6,
    borderWidth: theme.borders.medium,
    marginVertical: theme.margin.thin
  }
})

const AuthPage = () => {

  //const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  // Cards
  const cards = [
    {
      sno: "0102966538",
      hex: "0623250A"
    },
    {
      sno: "0123",
      hex: "ABCD"
    }
  ]

  // Function to Scan the Shaker through RFID Reader
  const scan = () => {
    dispatch(fetchUser(cards[0]));
  }

  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        <Text fontSize="subheading" fontWeight="bold" color="textSecondary">
          Scan Your Shaker
        </Text>
        <Pressable onPress={scan}>
          <Text style={styles.cardButton} fontWeight="bold">
            Scan
          </Text>
        </Pressable>
      </View>
      <View style={styles.graphicsArea}>
        
      </View>
    </View>  
  );
}

export default AuthPage;