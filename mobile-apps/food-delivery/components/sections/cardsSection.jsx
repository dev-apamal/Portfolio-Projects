import { View, Text, FlatList } from "react-native";
import Cards from "../ui/cards";
import { SCREEN_TEXTS } from "../../constants/strings";

const CardsSection = ({ data, onCardPress }) => {
  const renderCards = ({ item }) => (
    <View className="flex-col justify-center items-center">
      <Cards item={item} handlePress={onCardPress} />
    </View>
  );

  const EmptyState = () => (
    <View className="flex-1 justify-center items-center">
      <Text className="text-gray-500">{SCREEN_TEXTS.NO_RESTAURANTS}</Text>
    </View>
  );

  return (
    <View className="flex-1">
      <Text className="font-bold mb-4 text-gray-700">
        {SCREEN_TEXTS.CARDS_TITLE}
      </Text>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderCards}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          className="flex-1"
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
};

export default CardsSection;
