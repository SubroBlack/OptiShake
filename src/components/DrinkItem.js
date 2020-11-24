import React from "react";
import { View, StyleSheet, Image, TouchableWithoutFeedback } from "react-native";
import theme from "../theme";

import Text from "./Text";

const styles = StyleSheet.create({
  card: theme.card,
  cardSection: {
    display: theme.display.flexContainer,
    flexDirection: "row",
  },
  cardImage: {
    height: theme.imageSize.small,
    width: theme.imageSize.small,
    marginRight: theme.margin.medium,
    borderRadius: 6,
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
  },
  cardBar: {
    flexDirection: "row",
  },
  infoBar: {
    flexDirection: "row",
    justifyContent: theme.justifyContent.spaced,
  },
});

const DrinkItem = (props) => {
  const { item, order } = props;

  // Number Formatter
  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardSection}>
        <Image style={styles.cardImage} source={{ uri: item.drinkImgUrl }} />

        <View style={styles.info}>
          <Text fontWeight="bold">{item.fullName}</Text>
          <Text>{item.description}</Text>

          <View style={styles.cardBar}>
            <Text style={styles.cardButton} fontWeight="bold">
              {item.price}
            </Text>
            <TouchableWithoutFeedback onPress={() => order(item.machineCodes)}>
              <Text style={styles.cardButton} fontWeight="bold">
                Purchase
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>

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

    </View>
  );
};

export default DrinkItem;
