/*
  Page to Show the Register New Shaker and register it in your name
  Redirects to Authentication Page on Success
*/

import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { View, StyleSheet, Pressable, Alert } from "react-native";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import {Formik} from "formik";
import theme from "../theme";
import { addUser } from "../reducers/user";


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

// Register Form to be rendered through Formik
const RegisterForm = ({onSubmit}) => {
  return (
    <View>
      <FormikTextInput name="name" placeholder="Full Name"  />
      <Pressable onPress={onSubmit}>
        <Text style={styles.button}>Buy Shaker</Text>
      </Pressable>
    </View>
  )
}

// Register Component
const Register = () => {

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  // Creating ALERT message
  const warnRegister = (data) =>
  Alert.alert(
    "New Shaker",
    "The shaker is not registered yet. Do you want to purchase the Shaker?",
    [
      {
        text: "Cancel",
        onPress: () => history.push("/"),
        style: "cancel"
      },
      { text: "Purchase", onPress: () => onSubmit(data)}
    ],
    { cancelable: false }
);

  // onSubmit Function to Register new Shaker for a User
  const onSubmit = async (data) => {
    const {name} = data;
    try {
      console.log("Register component: ", name);
      dispatch(addUser(name));
      history.push("/auth");
    } catch (e) {
      console.log("Register Event Error: ", e);
    } 
  }

  return (
    <View style={styles.container}>
      <Text fontSize="subheading" fontWeight="bold" color="textSecondary">
        Purchase the Shaker
      </Text>
      <Formik initialValues={initial} onSubmit={warnRegister}>
        {({ handleSubmit }) => <RegisterForm onSubmit={handleSubmit} />}
      </Formik>
    </View>  
  );
}

export default Register;

/*
  Can display basic stats for user like Subscription date or last subscription or total drinks taken
  in current subscription etc
*/