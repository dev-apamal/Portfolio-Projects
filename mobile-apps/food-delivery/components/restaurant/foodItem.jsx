import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../../constants/styles";

export const FoodItem = ({ item, onAddItem }) => {
  return (
    <View className="px-4 py-4 flex-row justify-between items-center bg-white border-b gap-1 border-gray-100">
      <View className="flex-col gap-1">
        <Text className="font-medium">{item.name}</Text>
        <Text className="text-sm text-gray-600">₹{item.price}</Text>
        <Text className="text-xs text-gray-600">
          ★ {item.rating} •{" "}
          {item.isVeg ? (
            <Text className="text-xs text-green-800">VEG</Text>
          ) : (
            <Text className="text-xs text-red-800">NON-VEG</Text>
          )}
        </Text>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: colors.tertiary }}
        className="rounded-2xl px-3 py-2"
        onPress={() => onAddItem?.(item)}
      >
        <Text className="text-xs font-medium">ADD +</Text>
      </TouchableOpacity>
    </View>
  );
};
