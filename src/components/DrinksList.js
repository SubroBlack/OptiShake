import React from "react";
import { FlatList, View, StyleSheet, SafeAreaView, Text, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { command } from "../reducers/command";
import machine from "../services/machine";
import theme from "../theme";
import drinks from "../drinks.json";

import DrinkItem from "./DrinkItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drinkList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: theme.justifyContent.spaced,
    alignItems: "center"
  },
  separator: {
    height: theme.margin.medium,
  },

});

const ItemSeparator = () => <View style={styles.separator} />;

const DrinksList = () => {

  // Getting the port 
  const port = useSelector(state => state.port);
  const dispatch = useDispatch();

  // Order a drink
  const order = (code) => {
    dispatch(command(port, code.recipe));
    dispatch(command(port, code.order));
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      horizontal={true}
      ListHeaderComponent={<></>}
      data={drinks}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DrinkItem item={item} order={order} />}
      ListFooterComponent={<></>}
      // other props
      contentContainerStyle={styles.drinkList}
      />
    </SafeAreaView>
  );
};

export default DrinksList;
