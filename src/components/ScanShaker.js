/*
Uses Reader Module to Scan the Shaker RFID using RFID reader and then send the retrieved
 Card numbers to Database for Owner Identification
*/

import React from "react";
import {useDispatch} from "react-redux";
import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";

import {fetchUser} from "../reducers/user"
import { useHistory } from "react-router-dom";

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
  button: {
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

const ScanShaker = () => {
  const history = useHistory();
  const dispatch = useDispatch();


  /*
  Use Scan function to get the shaker info, set it on component state with useState,
  use useEffect hook to call fetchUser from reducer and put state.shaker as dependency 
  so the useEffect hook gets called when shaker's info is changed
  */

  // Cards
  const cards = [
    {
      sno: "0102966538",
      hex: "0623250A"
    },
    {
      sno: "0123",
      hex: "ABCD"
    },
    {
      sno: "01sdf23",
      hex: "ABCasdD"
    }
  ]

  // Function to Scan the Shaker through RFID Reader
  const scan = () => {
    dispatch(fetchUser(cards[2]));
    history.push("/auth");
  }

  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        <Text fontSize="subheading" fontWeight="bold" color="textSecondary">
          Scan Your Shaker
        </Text>
        <Pressable onPress={scan}>
          <Text style={styles.button} fontWeight="bold">
            Scan
          </Text>
        </Pressable>
      </View>
      <View style={styles.graphicsArea}>
        
      </View>
    </View>  
  );
}

export default ScanShaker;