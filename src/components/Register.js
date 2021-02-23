/*
  Page to Show the Register New Shaker and register it in your name
  Redirects to Authentication Page on Success
*/

import React, { useState, useRef } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { View, StyleSheet, Pressable, Alert, TouchableOpacity } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import {Formik, useField} from "formik";
import theme from "../theme";
import { addUser } from "../reducers/user";


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexGrow: 1,
    padding: theme.padding.big,
  },
  wrapper: {
    width: "100%",
    padding: theme.padding.medium,
    marginBottom: theme.margin.medium,
    backgroundColor: theme.backgroundColors.light,
    borderStyle: "solid",
    borderWidth: theme.borders.thin,
    borderColor: theme.backgroundColors.dark,
    borderRadius: 5
  },
  wrapperError: {
    borderColor: theme.colors.error
  },
  phoneInput: {
    flexGrow: 1,
  },
  message: {

  },
  input: {
    padding: theme.padding.medium,
    marginBottom: theme.margin.medium,
    backgroundColor: theme.backgroundColors.light,
    borderStyle: "solid",
    borderWidth: theme.borders.thin,
    borderColor: theme.backgroundColors.dark,
    borderRadius: 5
  },
  errorText: {
    marginBottom: theme.margin.medium,
    color: theme.colors.error,
  }
})

// Initial Value
const initial = {
  name: "",
  email: "",
  phone: "",
}

// Form Validation with YUP
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup.string().email().required("Email is Required"),
  phone: yup.string().required("Phone Number is Required")
});

// Register Form to be rendered through Formik
const RegisterForm = ({onSubmit}) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState("");

  // Formik Field for Phone input 
  const [field, meta, helpers] = useField("phone");
  const showError = meta.touched && meta.error;

  const phoneInput = useRef();

  // Validating The Input prop
  const inputProps = {
    onEndEditing : () => {
      const checkValid = phoneInput.current?.isValidNumber(value);
      //setValid(checkValid);
      if(checkValid === false) {
        //setShowMessage(meta.error);
        setShowMessage("Invalid Phone Number");
      } else {
        setShowMessage(null);
      }
      //console.log("Phone Validation: ", checkValid, formattedValue, value);
    }
  }

  // Validate Input
  const validate = () => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    //setValid(checkValid);
    if(checkValid === true) {
      setShowMessage(null);
      //setShowMessage(meta.error);
      //setShowMessage("Invalid Phone Number");
    };
  }

  // Check Form function to check all and call submit function
  const checkForm = () => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    checkValid ? onSubmit() : console.log("Form not Filled Correctly");
  }

  return (
    <View>
      <FormikTextInput name="name" placeholder="Full Name"  />
      <FormikTextInput name="email" placeholder="Email" keyboardType="email-address" />
      <PhoneInput
            ref={phoneInput}
            //defaultValue={field.value}
            value={field.value}
            defaultCode="FI"
            layout="first"
            onChangeText={(text) => {
              helpers.setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setValue(text);
              setFormattedValue(text);
              validate();
            }}
            containerStyle={ showError ? [styles.wrapper, styles.wrapperError] : styles.wrapper }
            textContainerStyle= {styles.phoneInput}
            textInputProps={inputProps}
            withDarkTheme
            //withShadow
            //autoFocus
          />
          {/* showError && <Text style={styles.errorText}>{meta.error}</Text> */}
          <Text style={showMessage ? styles.errorText : theme.invisible }>{showMessage}</Text>
      <Pressable onPress={checkForm}>
        <Text style={theme.button}>Buy Shaker</Text>
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
    try {
      console.log("Register component: ", data);
      dispatch(addUser(data));
      history.push("/auth");
    } catch (e) {
      console.log("Register Event Error: ", e);
    } 
  }

  return (
    <View style={styles.container}>
      <Text style={theme.subHeaderText}>
        Purchase the Shaker
      </Text>
      <Formik initialValues={initial} onSubmit={warnRegister} validationSchema={validationSchema}>
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