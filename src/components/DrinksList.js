import React, { useEffect } from "react";
import { FlatList, View, StyleSheet, SafeAreaView, Text, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import { command } from "../reducers/command";
import {setDrink} from "../reducers/drink";
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
    backgroundColor: theme.backgroundColors.baseColor,
    alignItems: theme.alignItems.center,
    justifyContent: theme.justifyContent.spaced,
  },
  separator: {
    height: theme.margin.medium,
    backgroundColor: theme.backgroundColors.baseColor,
  },
  buttonContainer: {
    flexShrink: 1,
    alignSelf: "flex-end",
  },
  joinButton: {
    flexShrink: 1,
    color: theme.colors.lightText,
    fontSize: theme.fontSizes.subheading,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const DrinksList = () => {

  // Getting the port 
  const port = useSelector(state => state.port);
  const user = useSelector(state => state.user);
  const key = useSelector(state => state.key);
  const newShaker = useSelector(state => state.newShaker);
  const dispatch = useDispatch();
  const history = useHistory();

    // Send to Registration Page if User is null after the Shaker is scanned
    useEffect(() => {
      if(newShaker && user===null && key !== null){
        console.log("Main User: ", user, " Key: ", key, " Goto REGISTRATION");
        history.push("/register");
      }
    }, [newShaker, user]);

  // Order a drink
  /*
    This function runs the command to set the recipe for selected drink and 
    saves the command for ordering drink on the app state to be run when user is authenticated
  */
  const order = (drink) => {
    dispatch(command(port, drink.machineCodes.recipe));
    dispatch(setDrink(drink));
    history.push("/scan");
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
      <Text style={styles.buttonContainer}>
        <Icon
          name="plus-circle"
          style={styles.joinButton}
          onPress={() => history.push("/register")}>
          {" "}Join OptiShake
        </Icon>
      </Text>
    </SafeAreaView>
  );
};

export default DrinksList;
