import React from "react";
import { FlatList, View, StyleSheet, SafeAreaView, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { command } from "../reducers/command";
import machine from "../services/machine";
import theme from "../theme";

import DrinkItem from "./DrinkItem";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: theme.margin.medium,
  },
});

const drinks = [
  {
    id: "Chocolate Drink",
    fullName: "Chocolate Drink",
    description: "Best Recovery Drink after workout",
    price: "1 Euro",
    machineCodes: {
      order: 'AA550401110116',
      recipe: "AA551F151100C8015E0000000000000000000000000000000000000000000000006B",
      success: "",
    },
    calories: 1589,
    unitsSold: 21553,
    ratingAverage: 4.7,
    reviewCount: 1294,
    drinkImgUrl: "https://cdn.verk.net/images/5/2_364772-1222x1593.jpg",
  },
  {
    id: "Overnight Protein",
    fullName: "Overnight Protein",
    description: "Best protein in the market",
    price: "2 Euro",
    machineCodes: {
      order: 'AA550401120117',
      recipe: "AA551F15120000000000C8015E00000000000000000000000000000000000000006C",
      success: "",
    },
    calories: 18349,
    unitsSold: 45377,
    ratingAverage: 4.3,
    reviewCount: 780,
    drinkImgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTmfhXwlPH3sTdz87JwdUc3wwnY0gfAcpQSA&usqp=CAU",
  },
  {
    id: "ultimate",
    fullName: "ultimate",
    description: "The Ulimate Recovery Drink",
    price: "3 Euros",
    machineCodes: {
      order: 'AA550401130118',
      recipe: "AA551F151300000000000000000032006400000000000000000000000000000000DC",
      success: "",
    },
    calories: 21015,
    unitsSold: 48496,
    ratingAverage: 3.7,
    reviewCount: 512,
    drinkImgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQG_AiRVIgu8sYxfQksBssow4ZsEUok6ownihuAdcLjtqZ7HqinBi_7I4aY5X_qoXTONxwlyQs&usqp=CAc",
  },
  {
    id: "Full Vegan Meal",
    fullName: "Full Vegan Meal",
    description: "Fully Nutritious Vegan Meal Drink",
    price: "4 Euros",
    machineCodes: {
      order: 'AA550401140119',
      recipe: "AA551F151400000000000000000000000000320064000000000000000000000000DD",
      success: "",
    },
    calories: 13902,
    unitsSold: 52869,
    ratingAverage: 2.7,
    reviewCount: 40,
    drinkImgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTG8gkwheKFiG8qOcwd9L-SKoWFwpAlymCq_hBAFnvrhvemIy0t1NJ61_pZkOijz_PQDjxJR_8&usqp=CAc",
  },
  {
    id: "Penny Shake",
    fullName: "Penny Shake",
    description: "Fully Nutritious Vegan Meal Drink",
    price: "5 Euros",
    machineCodes: {
      order: 'AA55040115011A',
      recipe: "AA551F151500000000000000000000000000000000003200640000000000000000DE",
      success: "",
    },
    calories: 13902,
    unitsSold: 52869,
    ratingAverage: 2.7,
    reviewCount: 40,
    drinkImgUrl: "https://cdn.shopify.com/s/files/1/0004/9630/4187/products/PlennyShakev3.0Artboard1.jpg?v=1604936454"
  }
];

const ItemSeparator = () => <View style={styles.separator} />;

const DrinksList = () => {

  // Getting the port 
  const port = useSelector(state => state.port);
  const dispatch = useDispatch();

  // Order a drink
  const order = (code) => {
    console.log("Order to Be Placed: ", code);
    dispatch(command(port, code.recipe));
    dispatch(command(port, code.order));
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
      ListHeaderComponent={<></>}
      data={drinks}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DrinkItem item={item} order={order} />}
      ListFooterComponent={<></>}
      // other props
      />
    </SafeAreaView>
  );
};

export default DrinksList;
