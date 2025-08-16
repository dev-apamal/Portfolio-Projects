// components/cart/CartItem.js
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useCart } from "../../context/cartContext";

export const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <View className="flex-row items-center p-4 border-b border-gray-100">
      {/* Item Image */}
      {item.image && (
        <Image
          source={{ uri: item.image }}
          className="w-16 h-16 rounded-lg mr-3"
          resizeMode="cover"
        />
      )}

      {/* Item Details */}
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-800 mb-1">
          {item.name}
        </Text>
        {item.description && (
          <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <Text className="text-lg font-bold text-green-600">
          ${item.price.toFixed(2)}
        </Text>
      </View>

      {/* Quantity Controls */}
      <View className="items-center ml-3 ">
        {/* Quantity Selector */}
        <View className="flex-row items-center bg-gray-100 rounded-2xl">
          <TouchableOpacity
            onPress={handleDecrement}
            className="w-8 h-8 justify-center items-center"
          >
            <Text className="text-lg font-bold text-gray-600">-</Text>
          </TouchableOpacity>

          <View className="w-12 h-8 justify-center items-center">
            <Text className="text-lg font-semibold text-gray-800">
              {item.quantity}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleIncrement}
            className="w-8 h-8 justify-center items-center"
          >
            <Text className="text-lg font-bold text-gray-600">+</Text>
          </TouchableOpacity>
        </View>

        {/* Item Total */}
        <Text className="text-sm text-gray-600 mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};
