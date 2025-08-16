import { View, Text, FlatList } from "react-native";
import Chips from "../ui/chips";
import { SCREEN_TEXTS } from "../../constants/strings";

const ChipsSection = ({ data, onChipPress, selectedChipId }) => {
  const renderChip = ({ item }) => (
    <View className="mr-2 flex-row justify-center items-center">
      <Chips
        imageUri={item.imageUri}
        title={item.title}
        item={item}
        handlePress={onChipPress}
        active={selectedChipId === item.id}
      />
    </View>
  );

  return (
    <View className="mb-4">
      <Text className="font-bold mb-4 text-gray-700">
        {SCREEN_TEXTS.CHIPS_TITLE}
      </Text>
      <FlatList
        data={data}
        renderItem={renderChip}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      />
    </View>
  );
};

export default ChipsSection;
