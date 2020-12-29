import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import theme from "../theme";

import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.dark,
    flexDirection: "row",
    paddingLeft: theme.padding.medium,
    paddingVertical: theme.padding.medium,
  },
});


const AppBar = () => {

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab text="Drinks" to="/" />
        <AppBarTab text="BastenGao" to="/bastengao" />
        <AppBarTab text="Settings" to="/settings" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
