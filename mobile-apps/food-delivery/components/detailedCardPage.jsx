import { SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { NavigationHeader } from "../components/restaurant/navigationHeader";
import { MenuList } from "../components/restaurant/menuList";

const DetailedCardPage = () => {
  const { query } = useLocalSearchParams();
  let selectedItem = {};

  try {
    selectedItem = JSON.parse(query);
  } catch (error) {
    console.log("Error parsing query:", error);
  }

  const handleAddItem = useCallback((item) => {
    console.log("Adding item:", item);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <NavigationHeader />
      <MenuList restaurant={selectedItem} onAddItem={handleAddItem} />
    </SafeAreaView>
  );
};

export default DetailedCardPage;
