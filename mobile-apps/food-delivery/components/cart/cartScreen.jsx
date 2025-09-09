// components/cart/CartScreen.js
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useCart } from "../../context/cartContext";
import { CartItem } from "./cartItem";
import { colors } from "../../constants/styles";
import { useRouter } from "expo-router";

export const CartScreen = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: clearCart },
      ]
    );
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      Alert.alert(
        "Empty Cart",
        "Please add items to your cart before checkout."
      );
      return;
    }

    // Implement your checkout logic here
    Alert.alert(
      "Checkout",
      `Total: $${cart.total.toFixed(2)}\nItems: ${cart.itemCount}\n\nProceed to payment?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Proceed",
          onPress: () => router.push("/orderSuccess"),
        },
      ]
    );
  };

  if (cart.items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-lg mt-4">Your cart is empty</Text>
          <Text className="text-center text-gray-600 mt-1">
            Add some delicious items from your favorite restaurant!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-800">
          {cart.restaurantName}
        </Text>
        <Text className="text-gray-600">
          {cart.itemCount} item{cart.itemCount !== 1 ? "s" : ""}
        </Text>
      </View>

      {/* Cart Items */}
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        className="flex-1"
        showsVerticalScrollIndicator={false}
      />

      {/* Footer */}
      <View className="px-4 py-4 border-t border-gray-200 bg-white">
        {/* Total */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg text-gray-600">Total</Text>
          <Text className="text-xl font-bold">${cart.total.toFixed(2)}</Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-4 justify-between items-center">
          <TouchableOpacity
            onPress={handleClearCart}
            className="flex-1 bg-red-100 p-2 rounded-2xl"
          >
            <Text className="text-red-600 font-semibold text-center">
              Clear Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCheckout}
            className="flex-1 p-2 rounded-2xl"
            style={{ backgroundColor: colors.primary }}
          >
            <Text className="text-white font-semibold text-center">
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
