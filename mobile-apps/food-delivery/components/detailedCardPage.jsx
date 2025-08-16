// pages/DetailedCardPage.js
import React from "react";
import { SafeAreaView, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { NavigationHeader } from "../components/restaurant/navigationHeader";
import { MenuList } from "../components/restaurant/menuList";
import { useCart } from "../context/cartContext";

const DetailedCardPage = () => {
  const { query } = useLocalSearchParams();
  const { addItem, cart } = useCart();

  let selectedItem = {};
  try {
    selectedItem = JSON.parse(query);
  } catch (error) {
    console.log("Error parsing query:", error);
  }

  const handleAddItem = useCallback(
    (item) => {
      // Check if this is a different restaurant
      if (
        cart.restaurantId &&
        cart.restaurantId !== selectedItem.id &&
        cart.items.length > 0
      ) {
        Alert.alert(
          "Different Restaurant",
          `You have items from ${cart.restaurantName} in your cart. Adding items from ${selectedItem.name} will clear your current cart. Continue?`,
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Continue",
              onPress: () => {
                addItem(item, selectedItem.id, selectedItem.name);
              },
            },
          ]
        );
      } else {
        addItem(item, selectedItem.id, selectedItem.name);

        // Optional: Show success feedback
        Alert.alert(
          "Added to Cart",
          `${item.name} has been added to your cart!`,
          [{ text: "OK" }],
          { duration: 2000 }
        );
      }
    },
    [
      addItem,
      cart.restaurantId,
      cart.restaurantName,
      cart.items.length,
      selectedItem.id,
      selectedItem.name,
    ]
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavigationHeader />
      <MenuList restaurant={selectedItem} onAddItem={handleAddItem} />
    </SafeAreaView>
  );
};

export default DetailedCardPage;
