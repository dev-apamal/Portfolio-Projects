import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  SectionList,
} from "react-native";
import { useState, useCallback, useMemo } from "react";
import { router, useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../constants/styles";
import { CardsData } from "../assets/data/cardsData";
import Chips from "./ui/chips";

const DetailedCardPage = () => {
  const { query } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  let selectedItem = {};
  try {
    selectedItem = JSON.parse(query);
  } catch (error) {
    console.log("Error parsing query:", error);
  }

  // Memoize section data to prevent unnecessary recalculations
  const sectionData = useMemo(
    () =>
      selectedItem.menu?.map((category) => ({
        title: category.category,
        data: category.items,
      })) || [],
    [selectedItem.menu]
  );

  // Memoized render functions for better performance
  const renderSectionHeader = useCallback(
    ({ section: { title } }) => (
      <Text className="text-base font-bold text-gray-700 p-4 bg-gray-50 ">
        {title}
      </Text>
    ),
    []
  );

  const renderFoodItem = useCallback(
    ({ item }) => (
      <View className="p-4 bg-white border-b border-gray-100">
        <Text className="font-medium">{item.name}</Text>
        <Text className="text-green-600 font-bold">₹{item.price}</Text>
        <Text className="text-xs text-gray-600">
          ★ {item.rating} • {item.isVeg ? "VEG" : "NON-VEG"}
        </Text>
      </View>
    ),
    []
  );

  // Memoized key extractor
  const keyExtractor = useCallback(
    (item, index) => `${item.name}-${item.price}-${index}`,
    []
  );

  // Memoized restaurant header component with original styling
  const RestaurantHeader = useCallback(
    () => (
      <View className="bg-white p-4">
        <View className="border-b gap-3 border-b-gray-100">
          {/* Restaurant Name & Ratings */}
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
    ),
    [
      selectedItem.name,
      selectedItem.rating,
      selectedItem.totalRatings,
      selectedItem.location,
      selectedItem.deliveryTime,
      selectedItem.offer,
    ]
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <MaterialIcons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <SectionList
        sections={sectionData}
        keyExtractor={keyExtractor}
        renderItem={renderFoodItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={RestaurantHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        initialNumToRender={8}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        getItemLayout={null}
        disableVirtualization={false}
      />
    </SafeAreaView>
  );
};

export default DetailedCardPage;
