import { FlatList, SafeAreaView, Text, View } from "react-native";
import SearchInput from "../../components/ui/searchInput";
import Chips from "../../components/ui/chips";
import { chipsData } from "../../assets/data/chipsData";
import { useState } from "react";
import Cards from "../../components/ui/cards";
import { CardsData } from "../../assets/data/cardsData";

export default function FoodScreen() {
  const [selectedChipId, setSelectedChipId] = useState(null);
  const [filteredData, setFilteredData] = useState(CardsData);

  const handleChip = (selectedItem) => {
    const isCurrentlySelected = selectedChipId === selectedItem.id;
    const newSelectedId = isCurrentlySelected ? null : selectedItem.id;

    setSelectedChipId(newSelectedId);

    if (newSelectedId === null) {
      setFilteredData(CardsData);
    } else {
      const filter = selectedItem.title.toLowerCase();
      const filtered = CardsData.filter(
        (item) =>
          (item.name || "").toLowerCase().includes(filter) ||
          (item.title || "").toLowerCase().includes(filter) ||
          (item.description || "").toLowerCase().includes(filter) ||
          (item.category || "").toLowerCase().includes(filter)
      );
      setFilteredData(filtered);
    }
  };

  const handleCard = (selectedItem) => {
    console.log(selectedItem.id);
  };

  const renderCards = ({ item }) => (
    <View className="flex-col justify-center items-center">
      <Cards item={item} handlePress={handleCard} />
    </View>
  );

  const renderChip = ({ item }) => (
    <View className="mr-2 flex-row justify-center items-center">
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
        <View className="flex-1">
          <SearchInput />

          {/* Chips section */}
          <View className="mb-4">
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

          {/* Cards section */}
          <View className="flex-1">
            <Text className="font-bold mb-4 text-gray-700">
              Restaurants to explore
            </Text>
            {filteredData && filteredData.length > 0 ? (
              <FlatList
                data={filteredData}
                renderItem={renderCards}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                className="flex-1"
              />
            ) : (
              <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500">No restaurants found</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
