import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableWithoutFeedback, Pressable } from "react-native";
import theme from "../theme";

import Text from "./Text";

const styles = StyleSheet.create({
  card: theme.card,
  cardSection: {
    display: theme.display.flexContainer,
    flexDirection: "row",
  },
  cardImage: {
    height: theme.imageSize.large,
    width: theme.imageSize.large,
    marginRight: theme.margin.medium,
    borderRadius: 6,
    margin: theme.margin.thick
  },
  info: {
    padding: theme.padding.thin,
    flexShrink: 1,
  },
  cardButton: {
    padding: theme.padding.medium,
    marginHorizontal: theme.margin.medium,
    backgroundColor: theme.backgroundColors.primary,
    color: theme.colors.lightText,
    fontWeight: "bold",
    borderRadius: 4,
    textAlign: "center",
  },
  cardBar: {
    flexDirection: "row",
  },
  infoBar: {
    flexDirection: "row",
    justifyContent: theme.justifyContent.spaced,
  },
  hide: {
    display: "none"
  }
});

const DrinkItem = (props) => {
  const [detailed, setDetailed] = useState(false);
  const { item, order } = props;

  // Number Formatter
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  //Info Section
  /*
    <View style={styles.infoBar}>
        <View style={styles.info}>
          <Text fontWeight="bold">{kFormatter(item.unitsSold)}</Text>
          <Text>Units Sold</Text>
        </View>
        <View style={styles.info}>
          <Text fontWeight="bold">{kFormatter(item.calories)}</Text>
          <Text>Calories</Text>
        </View>
        <View style={styles.info}>
          <Text fontWeight="bold">{kFormatter(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.info}>
          <Text fontWeight="bold">{kFormatter(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
  */

  return (
    <View style={styles.card}>
      
      <View style={styles.cardSection}>
        <Pressable onPress={() => setDetailed(!detailed)}>
          <Image style={styles.cardImage} source={{ uri: item.drinkImgUrl }} />
        </Pressable>
      </View>

      <View style={detailed? styles.info : styles.hide}>
        <Text fontWeight="bold">{item.fullName}</Text>  
        <Text>{item.description}</Text>
        <Text fontWeight="bold">{item.price}</Text>

        <Pressable onPress={() => order(item)}>
          <Text style={styles.cardButton} fontWeight="bold">
            BUY
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DrinkItem;
