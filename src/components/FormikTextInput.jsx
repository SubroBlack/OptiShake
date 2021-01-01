import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from "../theme";

const styles = StyleSheet.create({
  errorText: {
    marginBottom: theme.margin.medium,
    color: theme.colors.error,
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
  inputError: {
    borderColor: theme.colors.error
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        //style={styles.input}
        style={ showError ? [styles.input, styles.inputError] : styles.input }
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;