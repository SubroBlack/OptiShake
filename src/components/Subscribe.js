/*
  Page to add a monthly subscription
*/
import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import {Formik} from "formik";
import theme from "../theme";

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

// Initial Value
const initial = {
  name: ""
}

// Subscribe Form to be rendered through Formik
const SubscribeForm = ({onSubmit}) => {
  return (
    <View>
      <FormikTextInput name="name" placeholder="Full Name"  />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button}>Buy Shaker</Text>
      </Pressable>
    </View>
  )
}


