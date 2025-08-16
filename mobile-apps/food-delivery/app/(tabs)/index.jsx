import { SafeAreaView, Text, View } from "react-native";
import SearchInput from "../../components/ui/searchInput";
import ChipsSection from "../../components/sections/chipsSection";
import CardsSection from "../../components/sections/cardsSection";
import { chipsData } from "../../assets/data/chipsData";
import { useFoodFilter } from "../../hooks/useFoodFilter";
import { useCardNavigation } from "../../hooks/useNavigation";
import { SCREEN_TEXTS } from "../../constants/strings";

export default function FoodScreen() {
  const { selectedChipId, filteredData, handleChipSelection } = useFoodFilter();
  const { navigateToDetail } = useCardNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-white flex-1 p-4">
        <Text className="text-xl mb-4 text-gray-700">
          {SCREEN_TEXTS.GREETING}
        </Text>

        <View className="flex-1">
          <SearchInput />

          <ChipsSection
            data={chipsData}
            onChipPress={handleChipSelection}
            selectedChipId={selectedChipId}
          />

          <CardsSection data={filteredData} onCardPress={navigateToDetail} />
        </View>
      </View>
    </SafeAreaView>
  );
}
