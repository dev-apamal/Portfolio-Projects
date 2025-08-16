import { View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const NavigationHeader = () => {
  return (
    <View className="flex-row items-center p-4 bg-white">
      <TouchableOpacity onPress={() => router.back()} className="mr-3">
        <MaterialIcons name="arrow-back" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};
