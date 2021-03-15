import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Text from "./Text";
import {Link, useHistory} from "react-router-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.lightText,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginHorizontal: theme.margin.medium,
    paddingVertical: theme.padding.big,
  },
});

const AppBarTab = (props) => {

  const history = useHistory();

  const handler = () => {
    history.push(props.to)
  }

  return (
    
    <Pressable onPress={handler}>
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  
  );
};

export default AppBarTab;
