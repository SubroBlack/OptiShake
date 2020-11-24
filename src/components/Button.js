import React from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import Text from "./Text";
import {Link} from "react-router-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.lightText,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginHorizontal: theme.margin.medium,
    paddingVertical: theme.padding.thick
  },
  button: {
    padding: theme.padding.medium,
    backgroundColor: theme.backgroundColors.primary,
    color: theme.colors.lightText,
    fontWeight: "bold",
    borderRadius: 4,
  }
});


const Button = (props) => {
  const {label, handler } = props;
  return (
    <TouchableWithoutFeedback onPress={handler}>
        <Text style={styles.button}>{label}</Text>
    </TouchableWithoutFeedback>
  )
} 

export default Button;