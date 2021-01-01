import React from 'react';
import {TouchableWithoutFeedback, View, StyleSheet} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import Text from './Text';
import theme from '../theme';
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";
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
  }
});

// Form Validation with YUP
const validationSchema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  password: yup.string().required("Password is Required")
});

const initialCredentials = {
  username: "",
  password: ""
};

// SignIn Form
const SignInForm = ({onSubmit}) => {

  return (
  <View>
    <FormikTextInput name="username" placeholder="Username"  />
    <FormikTextInput password={true} name="password" placeholder="Password" />
    <TouchableWithoutFeedback onPress={onSubmit}>
      <Text style={styles.button}>Sign In</Text>
    </TouchableWithoutFeedback>
  </View>
    );
};

const SignIn = () => {

  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const {username, password} = values;
    try {
      const {data} = await signIn({username, password});
      console.log("SignIn Form result: ", data.authorize.accessToken);
      history.push("/");
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={initialCredentials} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
    </View>
  );
};

export default SignIn;