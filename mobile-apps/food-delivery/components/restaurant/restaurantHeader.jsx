import { View, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../constants/styles";

export const RestaurantHeader = ({ restaurant }) => {
  if (!restaurant) return null;

  return (
    <View className="bg-white p-4">
      <View className="border-b gap-3 border-b-gray-100">
        {/* Restaurant Name & Ratings */}
        <View className="flex-row justify-between">
          <Text className="text-gray-900 text-2xl font-semibold">
            {restaurant.name}
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center bg-green-600 px-2 py-1 rounded-2xl">
              <Text className="text-white text-sm font-medium">
                ★ {restaurant.rating}
              </Text>
            </View>
            <Text className="text-xs text-gray-600 leading-4">
              {restaurant.totalRatings} ratings
            </Text>
          </View>
        </View>

        {/* Restaurant Location & Delivery Time */}
        <View className="flex-col justify-between gap-2">
          <View className="flex-row gap-1">
            <MaterialIcons name="location-on" size={16} color="gray" />
            <Text className="text-gray-900">{restaurant.location}</Text>
          </View>
          <View className="flex-row gap-1">
            <MaterialIcons name="delivery-dining" size={16} color="gray" />
            <Text className="text-gray-900">{restaurant.deliveryTime}</Text>
          </View>
        </View>

        {/* Offer Badge */}
        {restaurant.offer && (
          <View
            className="px-2 py-1 mb-6 rounded-2xl self-start"
            style={{ backgroundColor: colors.tertiary }}
          >
            <Text className="text-gray-900 text-xs">{restaurant.offer}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
