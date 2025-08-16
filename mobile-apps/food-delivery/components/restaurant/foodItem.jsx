// components/restaurant/FoodItem.js (Enhanced version)
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useCart } from "../../context/cartContext";

export const FoodItem = ({ item, onAddItem }) => {
  const { isItemInCart, getItemQuantity } = useCart();

  const isInCart = isItemInCart(item.name, item.price);
  const quantity = getItemQuantity(item.name, item.price);

  const handleAddPress = () => {
    onAddItem(item);
  };

  return (
    <View className="flex-row p-4 bg-white border-b border-gray-100">
      {/* Item Image */}
      {item.image && (
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20 rounded-lg mr-4"
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

        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-green-600">
            ${item.price.toFixed(2)}
          </Text>

          {/* Add to Cart Button */}
          <TouchableOpacity
            onPress={handleAddPress}
            className={`px-4 py-2 rounded-2xl ${
              isInCart ? "bg-green-100 border border-green-500" : "bg-[#FF9B00]"
            }`}
          >
            <Text className={`${isInCart ? "text-green-700" : "text-white"}`}>
              {isInCart ? `In Cart (${quantity})` : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
