import { FlatList, SafeAreaView, Text, View } from "react-native";
import SearchInput from "../../components/ui/searchInput";
import Chips from "../../components/ui/chips";
import { chipsData } from "../../assets/data/chipsData";
import { useState } from "react";

export default function FoodScreen() {
  const [selectedChipId, setSelectedChipId] = useState(null);

  const handleChip = (selectedItem) => {
    setSelectedChipId((prev) => {
      return prev === selectedItem.id ? null : selectedItem.id;
    });
  };

  const renderChip = ({ item }) => (
    <View className="mr-4 flex-row justify-center items-center">
      <Chips
        imageUri={item.imageUri}
        title={item.title}
        item={item}
        handlePress={handleChip}
        active={selectedChipId === item.id}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-white flex-1 p-4">
        <Text className="text-xl mb-4 text-gray-700">Good Afternoon! Name</Text>
        <View>
          <SearchInput />
          <View>
            <Text className="font-bold mb-4 text-gray-700">
              What's on your mind
            </Text>
            <FlatList
              data={chipsData}
              renderItem={renderChip}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
