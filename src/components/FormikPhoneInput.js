import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { useField } from 'formik';
import PhoneInput from "react-native-phone-number-input";
import theme from "../theme";

const styles = StyleSheet.create({
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
  message: {

  },
  button: {
    backgroundColor: theme.backgroundColors.primary,
    padding: theme.padding.thick,
    borderRadius: 6,
    color: theme.colors.lightText,
    fontWeight: theme.fontWeights.bold,
    textAlign: "center",
  },
  input: {
    flexGrow: 1,
  },
  errorText: {
    marginBottom: theme.margin.medium,
    color: theme.colors.error,
  },
  wrapperError: {
    borderColor: theme.colors.error
  }
})

const FormikPhoneInput = ({name, ...props}) => {

  const [field, meta, helpers] = useField(name);

  const showError = meta.touched && meta.error;

  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef();
  return (
    <>
      <View>
        <SafeAreaView>
          {showMessage && (
            <View style={styles.message}>
              <Text>Value : {value}</Text>
              <Text>Formatted Value : {formattedValue}</Text>
              <Text>Valid : {valid ? "true" : "false"}</Text>
            </View>
          )}
          <PhoneInput
            style={styles.input}
            ref={phoneInput}
            defaultValue={value}
            defaultCode="FI"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            containerStyle={styles.wrapper}
            textContainerStyle={styles.input}
            withDarkTheme
            //withShadow
            //autoFocus
          />
          <TouchableOpacity
            onPress={() => {
              const checkValid = phoneInput.current?.isValidNumber(value);
              setShowMessage(true);
              setValid(checkValid ? checkValid : false);
            }}
          >
            <Text style={theme.button}>Check</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </>
  );
};

export default FormikPhoneInput;