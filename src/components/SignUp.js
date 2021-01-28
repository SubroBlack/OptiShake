import React, { useState } from 'react';
import {View, StyleSheet, Pressable} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import Text from './Text';
import theme from '../theme';
import FormikTextInput from "./FormikTextInput";
import {useHistory} from "react-router-native";

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.medium
  },
  button: {
    backgroundColor: theme.backgroundColors.primary,
    padding: theme.padding.thick,
    borderRadius: 6,
    color: theme.colors.lightText,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
  },
  columnsDisplay: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    padding: theme.padding.medium,
    marginBottom: theme.margin.medium,
  }
});

// Form Validation with YUP
const validationSchema = yup.object().shape({
  gymName: yup.string().required("Gym Name is Required"),
  email: yup.string().email().required("Email is Required"),
  password: yup.string().required("Password is Required"),
  contact: yup.string().required("Contact Number is Required"),
  ytn: yup.string().required("Gym Registration Number is Required")
});

const initialCredentials = {
  gymName: "",
  email: "",
  password: "",
  contact: "",
  ytn: "",
};

// SignIn Form
const SignUpForm = ({onSubmit}) => {
  return (
  <View>

    <FormikTextInput name="gymName" placeholder="Name of the Gym" />
    <FormikTextInput name="ytn" placeholder="Company Registration Number" keyboardType="numeric" />
    <FormikTextInput name="email" placeholder="Email" keyboardType="email-address" />
    <FormikTextInput password={true} name="password" placeholder="Password" />
    <FormikTextInput name="contact" placeholder="Contact Number" keyboardType="phone-pad" />

    <Pressable onPress={onSubmit}>
      <Text style={styles.button}>Sign Up</Text>
    </Pressable>

  </View>
    );
};

const SignUp = () => {
  
  const history = useHistory();

  const onSubmit = async (values) => {
    const {gymName, ytn, email, password, contact} = values;
    try {
      //const {data} = await signIn({email, password});
      console.log("SignUp Form: ", gymName, ytn, email, password, contact );
      history.push("/");
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={initialCredentials} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
    </View>
  );
};

export default SignUp;