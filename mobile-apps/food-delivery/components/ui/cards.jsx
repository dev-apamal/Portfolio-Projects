import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../constants/styles";

const Cards = ({ handlePress, item }) => {
  return (
    <TouchableOpacity
      className="bg-white rounded-2xl border border-gray-200 mb-4 w-full overflow-hidden"
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      {/* Restaurant Image */}
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          className="w-full h-40"
          resizeMode="cover"
        />
      ) : (
        <Image
          source={{
            uri: "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg",
          }}
          className="w-full h-40"
          resizeMode="cover"
        />
      )}

      {/* Offer Badge */}
      {item.offer && (
        <View
          className="absolute top-3 left-3 px-2 py-1 rounded-2xl"
          style={{ backgroundColor: colors.tertiary }}
        >
          <Text className="text-gray-900 text-xs font-bold">{item.offer}</Text>
        </View>
      )}

      {/* Restaurant Info */}
      <View className="p-4">
        {/* Name and Rating Row */}
        <View className="flex-row justify-between items-start mb-1">
          <Text
            className="text-gray-900 text-lg font-semibold flex-1 mr-2"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <View className="flex-row items-center bg-green-600 px-2 py-1 rounded-2xl">
            <Text className="text-white text-sm font-medium">
              ★ {item.rating}
            </Text>
          </View>
        </View>

        {/* Category */}
        <Text className="text-gray-500 text-sm mb-1" numberOfLines={1}>
          {item.category}
        </Text>

        {/* Delivery Info Row */}
        <View className="flex-row mt-1 justify-between items-center">
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="delivery-dining" size={20} color="gray" />
            <Text className="text-gray-600 text-sm">{item.deliveryTime}</Text>
          </View>
          <Text className="text-gray-600 text-sm">{item.priceRange}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Cards;
