import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useHistory } from "react-router";

import theme from "../theme";

import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.dark,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menu: {
    flexDirection: "row",
    paddingLeft: theme.padding.medium,
    paddingVertical: theme.padding.medium,
  },
  rightAlign: {
    flexShrink: 1,
    alignSelf: "flex-end",
    paddingRight: theme.padding.thick,
    paddingVertical: theme.padding.thick,
  },
  iconButton: {
    flexShrink: 1,
    color: theme.colors.lightText,
    fontSize: theme.fontSizes.subheading,
    marginHorizontal: theme.margin.thick,
    paddingVertical: theme.padding.big,
  }
});

const AppBar = () => {

  const history = useHistory();

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <AppBarTab text="OptiShake" to="/" /> 
      </View>
      <View style={styles.rightAlign}>
        <Icon
          name="cog"
          style={styles.iconButton}
          onPress={() => history.push("/signin")}>
        </Icon>
      </View>
    </View>
  );
};

export default AppBar;
