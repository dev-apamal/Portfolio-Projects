import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../../contexts/CartContext";

export const CartBadge = () => {
  const { cart } = useCart();
  const router = useRouter();

  const handlePress = () => {
    router.push("/cart");
  };

  if (cart.itemCount === 0) {
    return (
      <TouchableOpacity onPress={handlePress} className="p-2">
        <View className="w-6 h-6 justify-center items-center">
          <Text className="text-lg">🛒</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={handlePress} className="p-2 relative">
      <View className="w-6 h-6 justify-center items-center">
        <Text className="text-lg">🛒</Text>
      </View>

      {/* Badge */}
      <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-5 h-5 justify-center items-center px-1">
        <Text className="text-white text-xs font-bold">
          {cart.itemCount > 99 ? "99+" : cart.itemCount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
