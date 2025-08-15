import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../constants/styles";

const DetailedCardPage = () => {
  const { query } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  let selectedItem = {};
  try {
    selectedItem = JSON.parse(query);
  } catch (error) {
    console.log("Error parsing query:", error);
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <MaterialIcons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 bg-white p-4">
        {/* Restaurant Name & Ratings */}
        <View className="border-b gap-3 border-b-gray-100">
          <View className="flex-row justify-between">
            <Text className="text-gray-900 text-2xl font-semibold">
              {selectedItem.name}
            </Text>
            <View className="flex-row items-center gap-2">
              <View className="flex-row items-center bg-green-600 px-2 py-1 rounded-2xl">
                <Text className="text-white text-sm font-medium">
                  ★ {selectedItem.rating}
                </Text>
              </View>
              <Text className="text-xs text-gray-600 leading-4">
                {selectedItem.totalRatings} ratings
              </Text>
            </View>
          </View>

          {/* Restaurant Location & Delivery Time */}
          <View className="flex-col justify-between gap-2">
            <View className="flex-row gap-1">
              <MaterialIcons name="location-on" size={16} color="gray" />
              <Text className="text-gray-900">{selectedItem.location}</Text>
            </View>

            <View className="flex-row gap-1">
              <MaterialIcons name="delivery-dining" size={16} color="gray" />
              <Text className="text-gray-900">{selectedItem.deliveryTime}</Text>
            </View>
          </View>
          {/* Offer Badge */}
          {selectedItem.offer && (
            <View
              className="px-2 py-1 mb-6 rounded-2xl self-start"
              style={{ backgroundColor: colors.tertiary }}
            >
              <Text className="text-gray-900 text-xs font-bold">
                {selectedItem.offer}
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailedCardPage;
