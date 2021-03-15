import React, { useEffect } from 'react';
import {TouchableWithoutFeedback, View, StyleSheet} from "react-native";
import {Formik} from "formik";
import * as yup from "yup";
import Text from './Text';
import theme from '../theme';
import FormikTextInput from "./FormikTextInput";
import {useHistory} from "react-router-native";
import { signGym, signIn } from '../reducers/gym';
import { useSelector } from 'react-redux';


const styles = StyleSheet.create({
  container: {
    padding: theme.padding.medium
  }
});

// Form Validation with YUP
const validationSchema = yup.object().shape({
  gym: yup.string().required("Gym Name is Required"),
});

const initialCredentials = {
  gym: "",
  
};

// SignIn Form
const SignInForm = ({onSubmit}) => {

  return (
  <View>
    <FormikTextInput name="gym" placeholder="Gym" />
    <TouchableWithoutFeedback onPress={onSubmit}>
      <Text style={theme.button}>Sign In</Text>
    </TouchableWithoutFeedback>
  </View>
    );
};

const SignIn = () => {
  
  const history = useHistory();
  const gym = useSelector(state => state.gym);

  // Send to Home Page if Gym is not NUll
  useEffect(() => {
    if(gym !== null){
      console.log("Gym: ", gym, " Goto Home");
      history.push("/");
    }
  });

  const onSubmit = async (values) => {
    const {gymName} = values;
    try {
      const {data} = await signGym(gymName);
      console.log("SignIn Form: ", gymName);
      history.push("/");
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={theme.subHeaderText}>
        Add Name of your Gym
      </Text>
      <Formik initialValues={initialCredentials} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
    </View>
  );
};

export default SignIn;